import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HaGaugeCardConfig, GaugeSegment } from './types';
import { DEFAULT_CONFIG, STYLE_OPTIONS, SWEEP_OPTIONS } from './const';

interface SchemaEntry {
  name: string;
  selector: Record<string, unknown>;
}

const SCHEMA: SchemaEntry[] = [
  { name: 'entity', selector: { entity: { domain: ['sensor', 'number', 'input_number'] } } },
  { name: 'name', selector: { text: {} } },
  { name: 'unit', selector: { text: {} } },
  { name: 'min', selector: { number: { mode: 'box' } } },
  { name: 'max', selector: { number: { mode: 'box' } } },
  { name: 'decimals', selector: { number: { mode: 'box', min: 0, max: 5, step: 1 } } },
  { name: 'style', selector: { select: { mode: 'dropdown', options: STYLE_OPTIONS } } },
  { name: 'sweep', selector: { select: { mode: 'dropdown', options: SWEEP_OPTIONS } } },
  { name: 'needle', selector: { boolean: {} } },
  { name: 'needle_color', selector: { text: {} } },
  { name: 'show_value', selector: { boolean: {} } },
  { name: 'show_ticks', selector: { boolean: {} } },
  { name: 'animation', selector: { boolean: {} } },
  { name: 'animation_duration', selector: { number: { mode: 'box', min: 0, max: 5000, step: 50, unit_of_measurement: 'ms' } } },
  { name: 'glow', selector: { boolean: {} } },
  { name: 'tap_action', selector: { ui_action: {} } },
  { name: 'hold_action', selector: { ui_action: {} } },
  { name: 'double_tap_action', selector: { ui_action: {} } },
];

const LABELS: Record<string, string> = {
  entity: 'Entity',
  name: 'Titel (optional)',
  unit: 'Einheit (überschreibt Entity-Einheit)',
  min: 'Minimum',
  max: 'Maximum',
  decimals: 'Nachkommastellen',
  style: 'Design',
  sweep: 'Bogenform',
  needle: 'Zeiger anzeigen',
  needle_color: 'Zeigerfarbe (CSS-Farbe, leer = Standard)',
  show_value: 'Messwert anzeigen',
  show_ticks: 'Skalenstriche anzeigen',
  animation: 'Animation aktivieren',
  animation_duration: 'Animationsdauer',
  glow: 'Leuchteffekt (Glow)',
  tap_action: 'Tap-Aktion',
  hold_action: 'Halten-Aktion',
  double_tap_action: 'Doppel-Tap-Aktion',
};

@customElement('ha-gauge-card-editor')
export class HaGaugeCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: HaGaugeCardConfig;

  public setConfig(config: HaGaugeCardConfig): void {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      segments: config.segments ?? DEFAULT_CONFIG.segments,
    } as HaGaugeCardConfig;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;

    const data = {
      ...this._config,
      sweep: String(this._config.sweep) as unknown,
    };

    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${SCHEMA}
          .computeLabel=${(entry: SchemaEntry) => LABELS[entry.name] ?? entry.name}
          @value-changed=${this._formValueChanged}
        ></ha-form>

        <div class="segments">
          <div class="segments-header">
            <span>Farbsegmente (Schwellenwerte)</span>
            <mwc-button @click=${this._addSegment}>+ Segment</mwc-button>
          </div>
          ${this._segments.map(
            (seg, index) => html`
              <div class="segment-row">
                <ha-textfield
                  label="ab Wert"
                  type="number"
                  .value=${String(seg.from)}
                  @input=${(e: Event) => this._updateSegment(index, 'from', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
                <input
                  class="color-input"
                  type="color"
                  .value=${this._toHex(seg.color)}
                  @input=${(e: Event) => this._updateSegment(index, 'color', (e.target as HTMLInputElement).value)}
                />
                <ha-textfield
                  label="Farbe (CSS)"
                  .value=${seg.color}
                  @input=${(e: Event) => this._updateSegment(index, 'color', (e.target as HTMLInputElement).value)}
                ></ha-textfield>
                <ha-icon-button
                  .path=${'M19,13H5V11H19V13Z'}
                  label="Entfernen"
                  @click=${() => this._removeSegment(index)}
                ></ha-icon-button>
              </div>
            `
          )}
          ${this._segments.length === 0
            ? html`<div class="hint">Keine Segmente – der Zeiger nutzt eine Standardfarbe.</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private get _segments(): GaugeSegment[] {
    return [...(this._config.segments ?? [])];
  }

  private _toHex(color: string): string {
    return /^#[0-9a-fA-F]{6}$/.test(color) ? color : '#808080';
  }

  private _formValueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = { ...ev.detail.value };
    if (typeof value.sweep === 'string') {
      value.sweep = Number(value.sweep);
    }
    this._config = { ...this._config, ...value };
    this._fireConfigChanged();
  }

  private _addSegment(): void {
    const segments = [...this._config.segments, { from: this._config.max, color: '#43a047' }];
    this._config = { ...this._config, segments };
    this._fireConfigChanged();
  }

  private _removeSegment(index: number): void {
    const segments = this._config.segments.filter((_, i) => i !== index);
    this._config = { ...this._config, segments };
    this._fireConfigChanged();
  }

  private _updateSegment(index: number, key: 'from' | 'color', rawValue: string): void {
    const segments = this._config.segments.map((seg, i) => {
      if (i !== index) return seg;
      if (key === 'from') {
        const num = Number(rawValue);
        return { ...seg, from: Number.isNaN(num) ? seg.from : num };
      }
      return { ...seg, color: rawValue };
    });
    this._config = { ...this._config, segments };
    this._fireConfigChanged();
  }

  private _fireConfigChanged(): void {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .segments {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }
    .segments-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .segment-row {
      display: grid;
      grid-template-columns: 1fr 40px 1fr auto;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .color-input {
      width: 36px;
      height: 36px;
      padding: 0;
      border: none;
      background: none;
    }
    .hint {
      color: var(--secondary-text-color, #9e9e9e);
      font-size: 12px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-gauge-card-editor': HaGaugeCardEditor;
  }
}
