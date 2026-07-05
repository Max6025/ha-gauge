import type { GaugeStyle, HaGaugeCardConfig } from './types';

export const CARD_VERSION = '1.0.0';

export type DefaultConfig = Omit<HaGaugeCardConfig, 'type' | 'entity'>;

export const DEFAULT_CONFIG: DefaultConfig = {
  min: 0,
  max: 100,
  decimals: 1,
  needle: true,
  animation: true,
  animation_duration: 900,
  style: 'modern',
  sweep: 180,
  show_ticks: true,
  show_value: true,
  glow: false,
  segments: [
    { from: 0, color: '#43a047' },
    { from: 60, color: '#fdd835' },
    { from: 85, color: '#e53935' },
  ],
};

export const STYLE_OPTIONS: { value: GaugeStyle; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'neon', label: 'Neon Glow' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'flat', label: 'Flat' },
];

export const SWEEP_OPTIONS: { value: string; label: string }[] = [
  { value: '180', label: 'Halbkreis (180°)' },
  { value: '270', label: 'Dreiviertelkreis (270°)' },
];
