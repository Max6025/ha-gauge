import { LitElement, html, svg, css, PropertyValues, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  hasAction,
  handleAction,
} from 'custom-card-helpers';
import { HaGaugeCardConfig, GaugeSegment } from './types';
import { DEFAULT_CONFIG, CARD_VERSION } from './const';
import { describeArc, valueToAngle, valueToPercent, colorForValue, animateValue, sweepStartAngle } from './utils';
import './editor';

/* eslint-disable no-console */
console.info(
  `%c HA-GAUGE-CARD %c v${CARD_VERSION} `,
  'color: #fff; background: #039be5; font-weight: 700; border-radius: 3px 0 0 3px; padding: 2px 0 2px 6px;',
  'color: #039be5; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0; padding: 2px 6px 2px 0;'
);

const CX = 100;
const CY = 110;
const R = 78;
const STROKE = 16;

@customElement('ha-gauge-card')
export class HaGaugeCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('ha-gauge-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<HaGaugeCardConfig> {
    return {
      entity: '',
      ...DEFAULT_CONFIG,
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: HaGaugeCardConfig;

  @state() private _displayValue = 0;

  private _lastValue?: number;

  private _cancelAnimation?: () => void;

  private _holdTimer?: number;

  private _holdTriggered = false;

  private _tapTimer?: number;

  private readonly _uid = Math.random().toString(36).slice(2, 8);

  public setConfig(config: HaGaugeCardConfig): void {
    if (!config.entity) {
      throw new Error('Bitte eine Entity auswählen (entity: sensor.xyz)');
    }
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      min: Number(config.min ?? DEFAULT_CONFIG.min),
      max: Number(config.max ?? DEFAULT_CONFIG.max),
      segments:
        config.segments && config.segments.length > 0 ? config.segments : DEFAULT_CONFIG.segments,
    } as HaGaugeCardConfig;
  }

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    if (changed.has('_config') || changed.has('_displayValue')) return true;
    if (changed.has('hass')) {
      const oldHass = changed.get('hass') as HomeAssistant | undefined;
      if (!oldHass) return true;
      return oldHass.states[this._config.entity] !== this.hass.states[this._config.entity];
    }
    return true;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') || changed.has('_config')) {
      this._syncValue();
    }
  }

  private _syncValue(): void {
    const target = this._targetValue;
    if (this._lastValue === undefined) {
      this._lastValue = target;
      this._displayValue = target;
      return;
    }
    if (target === this._lastValue) return;
    const from = this._displayValue;
    this._lastValue = target;
    this._cancelAnimation?.();
    const duration = this._config.animation ? this._config.animation_duration : 0;
    this._cancelAnimation = animateValue(from, target, duration, (v) => {
      this._displayValue = v;
    });
  }

  private get _stateObj() {
    return this.hass?.states[this._config.entity];
  }

  private get _targetValue(): number {
    const stateObj = this._stateObj;
    if (!stateObj) return this._config.min;
    const num = Number(stateObj.state);
    return Number.isNaN(num) ? this._config.min : num;
  }

  private get _unit(): string {
    if (this._config.unit !== undefined) return this._config.unit;
    return this._stateObj?.attributes.unit_of_measurement ?? '';
  }

  private get _name(): string {
    return this._config.name ?? this._stateObj?.attributes.friendly_name ?? this._config.entity;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    const stateObj = this._stateObj;
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="not-found">Entity nicht gefunden: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const { min, max, sweep, style, needle, show_ticks, show_value, glow } = this._config;
    const value = Math.min(max, Math.max(min, this._displayValue));
    const startAngle = sweepStartAngle(sweep);
    const endAngle = startAngle + sweep;
    const valueAngle = valueToAngle(value, min, max, sweep);
    const segments = this._sortedSegments;
    const isGlow = glow || style === 'neon';

    return html`
      <ha-card
        class="style-${style}"
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @dblclick=${this._onDblClick}
        style=${hasAction(this._config.tap_action) ||
        hasAction(this._config.hold_action) ||
        hasAction(this._config.double_tap_action)
          ? 'cursor:pointer'
          : ''}
      >
        <div class="card-content">
          <svg viewBox="0 0 200 170" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="ggb-glow-${this._uid}" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              ${style === 'gradient'
                ? svg`
                    <linearGradient id="ggb-gradient-${this._uid}" x1="0%" y1="0%" x2="100%" y2="0%">
                      ${segments.map((seg) => {
                        const pct = valueToPercent(seg.from, min, max);
                        return svg`<stop offset="${pct}%" stop-color="${seg.color}" />`;
                      })}
                    </linearGradient>
                  `
                : nothing}
            </defs>

            <path
              class="track"
              d=${describeArc(CX, CY, R, startAngle, endAngle)}
              fill="none"
              stroke-width=${STROKE}
              stroke-linecap=${style === 'flat' ? 'butt' : 'round'}
            />

            ${style === 'minimal'
              ? svg`
                  <path
                    class="progress"
                    d=${describeArc(CX, CY, R, startAngle, valueAngle)}
                    fill="none"
                    stroke=${colorForValue(value, segments)}
                    stroke-width=${STROKE / 1.8}
                    stroke-linecap="round"
                    filter=${isGlow ? `url(#ggb-glow-${this._uid})` : nothing}
                  />
                `
              : style === 'gradient'
              ? svg`
                  <path
                    class="progress"
                    d=${describeArc(CX, CY, R, startAngle, endAngle)}
                    fill="none"
                    stroke="url(#ggb-gradient-${this._uid})"
                    stroke-width=${STROKE}
                    stroke-linecap="round"
                    filter=${isGlow ? `url(#ggb-glow-${this._uid})` : nothing}
                  />
                `
              : svg`
                  ${segments.map((seg, i) => {
                    const nextFrom = segments[i + 1]?.from ?? max;
                    const a1 = valueToAngle(seg.from, min, max, sweep);
                    const a2 = valueToAngle(nextFrom, min, max, sweep);
                    if (a2 <= a1) return nothing;
                    return svg`
                      <path
                        d=${describeArc(CX, CY, R, a1, a2)}
                        fill="none"
                        stroke=${seg.color}
                        stroke-width=${STROKE}
                        stroke-linecap=${style === 'flat' ? 'butt' : 'round'}
                        filter=${isGlow ? `url(#ggb-glow-${this._uid})` : nothing}
                      />
                    `;
                  })}
                `}

            ${show_ticks ? this._renderTicks(startAngle, endAngle, min, max) : nothing}

            ${needle ? this._renderNeedle(valueAngle, isGlow) : nothing}

            ${show_value
              ? svg`
                  <text class="value" x="${CX}" y="${CY + 36}" text-anchor="middle">
                    ${value.toFixed(this._config.decimals)}${this._unit ? svg`<tspan class="unit"> ${this._unit}</tspan>` : nothing}
                  </text>
                  <text class="name" x="${CX}" y="${CY + 54}" text-anchor="middle">${this._name}</text>
                `
              : nothing}
          </svg>
        </div>
      </ha-card>
    `;
  }

  private get _sortedSegments(): GaugeSegment[] {
    return [...this._config.segments].sort((a, b) => a.from - b.from);
  }

  private _renderNeedle(angle: number, isGlow: boolean): TemplateResult {
    const len = R - STROKE / 2 - 6;
    return svg`
      <g
        class="needle"
        style="transform-origin: ${CX}px ${CY}px; transform: rotate(${angle}deg);"
        filter=${isGlow ? `url(#ggb-glow-${this._uid})` : nothing}
      >
        <polygon points="${CX - 9},${CY - 6} ${CX - 9},${CY + 6} ${CX + len},${CY}" />
        <circle cx="${CX}" cy="${CY}" r="8" />
      </g>
    `;
  }

  private _renderTicks(startAngle: number, endAngle: number, min: number, max: number): TemplateResult {
    const boundaries = new Set<number>([min, max, ...this._sortedSegments.map((s) => s.from)]);
    const ticks = Array.from(boundaries)
      .filter((v) => v >= min && v <= max)
      .sort((a, b) => a - b);
    return svg`
      ${ticks.map((v) => {
        const angle = valueToAngle(v, min, max, endAngle - startAngle);
        const inner = R - STROKE / 2 - 4;
        const outer = R + STROKE / 2 + 4;
        const labelR = R + STROKE / 2 + 16;
        const rad = (angle * Math.PI) / 180;
        const x1 = CX + inner * Math.cos(rad);
        const y1 = CY + inner * Math.sin(rad);
        const x2 = CX + outer * Math.cos(rad);
        const y2 = CY + outer * Math.sin(rad);
        const lx = CX + labelR * Math.cos(rad);
        const ly = CY + labelR * Math.sin(rad);
        return svg`
          <line class="tick" x1=${x1} y1=${y1} x2=${x2} y2=${y2} />
          <text class="tick-label" x=${lx} y=${ly} text-anchor="middle" dominant-baseline="middle">${v}</text>
        `;
      })}
    `;
  }

  private _onPointerDown = (): void => {
    this._holdTriggered = false;
    if (!hasAction(this._config.hold_action)) return;
    this._holdTimer = window.setTimeout(() => {
      this._holdTriggered = true;
      handleAction(this, this.hass, this._config, 'hold');
    }, 500);
  };

  private _onPointerUp = (): void => {
    if (this._holdTimer) {
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
    if (this._holdTriggered || !hasAction(this._config.tap_action)) return;
    if (hasAction(this._config.double_tap_action)) {
      // Wait briefly to see if a second click turns this into a double-tap.
      this._tapTimer = window.setTimeout(() => {
        handleAction(this, this.hass, this._config, 'tap');
      }, 250);
    } else {
      handleAction(this, this.hass, this._config, 'tap');
    }
  };

  private _onPointerCancel = (): void => {
    if (this._holdTimer) {
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  };

  private _onDblClick = (): void => {
    if (!hasAction(this._config.double_tap_action)) return;
    if (this._tapTimer) {
      window.clearTimeout(this._tapTimer);
      this._tapTimer = undefined;
    }
    handleAction(this, this.hass, this._config, 'double_tap');
  };

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: background-color 180ms ease-in-out;
    }
    .card-content {
      width: 100%;
      padding: 8px 16px 12px;
    }
    svg {
      display: block;
      width: 100%;
      overflow: visible;
    }
    .not-found {
      padding: 16px;
      color: var(--error-color, #db4437);
    }
    .track {
      stroke: var(--gauge-track-color, var(--secondary-background-color, #e0e0e0));
      opacity: 0.55;
    }
    .progress {
      transition: stroke-width 200ms ease;
    }
    .needle polygon,
    .needle circle {
      fill: var(--gauge-needle-color, var(--primary-text-color, #212121));
      transition: transform 120ms ease;
    }
    .needle {
      transition: transform 120ms linear;
    }
    .tick {
      stroke: var(--secondary-text-color, #9e9e9e);
      stroke-width: 1.5;
      opacity: 0.7;
    }
    .tick-label {
      font-size: 9px;
      fill: var(--secondary-text-color, #9e9e9e);
    }
    .value {
      font-size: 28px;
      font-weight: 600;
      fill: var(--primary-text-color, #212121);
    }
    .value .unit {
      font-size: 14px;
      font-weight: 400;
      fill: var(--secondary-text-color, #9e9e9e);
    }
    .name {
      font-size: 12px;
      fill: var(--secondary-text-color, #9e9e9e);
    }

    /* ---- Style presets ---- */
    ha-card.style-neon {
      background: var(--gauge-neon-bg, #101418);
    }
    .style-neon .value {
      fill: #fff;
    }
    .style-neon .name {
      fill: #90a4ae;
    }
    .style-neon .needle polygon,
    .style-neon .needle circle {
      fill: var(--gauge-needle-color, #fff);
    }
    .style-neon .track {
      opacity: 0.25;
    }

    .style-minimal .value {
      font-weight: 300;
    }
    .style-minimal .track {
      opacity: 0.3;
    }

    .style-flat .value {
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .style-flat .needle polygon,
    .style-flat .needle circle {
      transition: none;
    }
    .style-flat .needle {
      transition: none;
    }

    .style-gradient .progress {
      opacity: 0.95;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-gauge-card': HaGaugeCard;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ha-gauge-card',
  name: 'HA Gauge Card',
  description: 'Ein modernes, animiertes Gauge-Card mit Zeiger, Farbsegmenten und mehreren Design-Stilen.',
  preview: true,
  documentationURL: 'https://github.com/max6025/ha-gauge',
});
