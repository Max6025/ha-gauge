import type { ActionConfig } from 'custom-card-helpers';

export type GaugeStyle = 'modern' | 'neon' | 'minimal' | 'gradient' | 'flat';
export type GaugeSweep = 180 | 270;

export interface GaugeSegment {
  from: number;
  color: string;
  label?: string;
}

export interface HaGaugeCardConfig {
  type: string;
  entity: string;
  name?: string;
  unit?: string;
  min: number;
  max: number;
  decimals: number;
  needle: boolean;
  animation: boolean;
  animation_duration: number;
  style: GaugeStyle;
  sweep: GaugeSweep;
  show_ticks: boolean;
  show_value: boolean;
  glow: boolean;
  needle_color?: string;
  track_color?: string;
  segments: GaugeSegment[];
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
