import type { Activity } from '../types';

type Interval = [number, number];

// 자정을 넘는 활동을 0-24 범위의 구간 배열로 변환
function toIntervals(startHour: number, endHour: number): Interval[] {
  if (endHour > 24) {
    return [
      [startHour, 24],
      [0, endHour - 24],
    ];
  }
  return [[startHour, endHour]];
}

function intervalsOverlap(a: Interval, b: Interval): boolean {
  return a[0] < b[1] && b[0] < a[1];
}

export function hasTimeOverlap(
  start1: number,
  end1: number,
  start2: number,
  end2: number,
): boolean {
  const intervals1 = toIntervals(start1, end1);
  const intervals2 = toIntervals(start2, end2);
  return intervals1.some((i1) => intervals2.some((i2) => intervalsOverlap(i1, i2)));
}

export function overlapsWithExisting(
  startHour: number,
  endHour: number,
  activities: Activity[],
  excludeId?: string,
): boolean {
  return activities
    .filter((a) => a.id !== excludeId)
    .some((a) => hasTimeOverlap(startHour, endHour, a.startHour, a.endHour));
}
