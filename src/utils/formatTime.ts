export function formatHour(hour: number): string {
  const normalized = hour % 24;
  if (normalized === 0) return '자정 12:00';
  if (normalized === 12) return '정오 12:00';
  const h = Math.floor(normalized);
  const minutes = Math.round((normalized - h) * 60);
  const period = h < 12 ? '오전' : '오후';
  const displayH = h > 12 ? h - 12 : h;
  const minuteStr = minutes > 0 ? `:${String(minutes).padStart(2, '0')}` : ':00';
  return `${period} ${displayH}${minuteStr}`;
}

export function formatHourShort(hour: number): string {
  const normalized = hour % 24;
  if (normalized === 0) return '자정';
  if (normalized === 12) return '정오';
  const h = Math.floor(normalized);
  const minutes = Math.round((normalized - h) * 60);
  const period = h < 12 ? '오전' : '오후';
  const displayH = h > 12 ? h - 12 : h;
  if (minutes > 0) return `${period} ${displayH}:${String(minutes).padStart(2, '0')}`;
  return `${period} ${displayH}시`;
}

export function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const min = Math.round((hours - h) * 60);
  if (h === 0) return `${min}분`;
  if (min === 0) return `${h}시간`;
  return `${h}시간 ${min}분`;
}
