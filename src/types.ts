export interface Activity {
  id: string;
  name: string;
  startHour: number;
  endHour: number;
  color: string;
}

export interface PlacedSticker {
  id: string;
  emoji: string;
  xPercent: number;
  yPercent: number;
  size: number; // 1.0 = 기본(28px), 범위 0.5 ~ 3.0
}
