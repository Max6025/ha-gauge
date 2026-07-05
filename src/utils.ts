import type { GaugeSegment } from './types';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Angle convention: 0deg = 3 o'clock, increasing clockwise (matches SVG rotate()
 * and atan2 in a y-down coordinate system), so the math and the visual rotation
 * always agree without extra sign-flipping.
 */
export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function sweepStartAngle(sweep: number): number {
  return 270 - sweep / 2;
}

export function valueToAngle(value: number, min: number, max: number, sweep: number): number {
  const pct = clamp((value - min) / (max - min || 1), 0, 1);
  return sweepStartAngle(sweep) + pct * sweep;
}

export function valueToPercent(value: number, min: number, max: number): number {
  return clamp((value - min) / (max - min || 1), 0, 1) * 100;
}

/** Returns the color of the segment that `value` falls into (last segment with from <= value). */
export function colorForValue(value: number, segments: GaugeSegment[]): string {
  const sorted = [...segments].sort((a, b) => a.from - b.from);
  let color = sorted[0]?.color ?? '#43a047';
  for (const seg of sorted) {
    if (value >= seg.from) color = seg.color;
  }
  return color;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates a numeric value with requestAnimationFrame and reports progress via onFrame.
 * Returns a cancel function. Used to keep the needle, digital readout and progress arc
 * perfectly in sync during transitions (a single source of truth instead of separate
 * CSS transitions per element).
 */
export function animateValue(
  from: number,
  to: number,
  duration: number,
  onFrame: (value: number) => void
): () => void {
  if (duration <= 0 || from === to) {
    onFrame(to);
    return () => {};
  }
  let cancelled = false;
  const start = performance.now();
  const step = (now: number) => {
    if (cancelled) return;
    const elapsed = now - start;
    const t = clamp(elapsed / duration, 0, 1);
    const eased = easeOutCubic(t);
    onFrame(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return () => {
    cancelled = true;
  };
}
