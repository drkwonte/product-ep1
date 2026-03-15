export const HOURS_IN_DAY = 24;
export const DEGREES_PER_HOUR = 360 / HOURS_IN_DAY;

export const CLOCK_SIZE = 500;
export const CLOCK_CENTER = CLOCK_SIZE / 2;

export const SECTOR_OUTER_RADIUS = 205;
export const SECTOR_INNER_RADIUS = 85;

export const TICK_START_RADIUS = 208;
export const TICK_MAJOR_END_RADIUS = 225;
export const TICK_MINOR_END_RADIUS = 217;
// 자정·정오 눈금은 짧게 해서 서브레이블과 겹치지 않게
export const TICK_SPECIAL_HOUR_END_RADIUS = 215;
export const TICK_HALF_HOUR_END_RADIUS = 212;
export const NUMBER_RADIUS = 240;

export function hourToAngleDeg(hour: number): number {
  return hour * DEGREES_PER_HOUR;
}

export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export function buildArcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngleDeg: number,
  endAngleDeg: number,
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngleDeg);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngleDeg);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngleDeg);
  const largeArcFlag = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}
