function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    return ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(channel(0))}${toHex(channel(8))}${toHex(channel(4))}`;
}

/**
 * 부채꼴 배경색: 사용자가 고른 색상을 기반으로
 * 채도를 낮추고 명도를 높여 어두운 텍스트가 읽기 쉬운 색으로 변환한다.
 */
export function createSectorFill(hex: string): string {
  const [h, s, l] = hexToHsl(hex);
  const newS = s * 0.45;                     // 채도 55% 감소
  const newL = Math.min(93, l + (100 - l) * 0.6); // 명도를 흰색 방향으로 60% 이동 (최대 93%)
  return hslToHex(h, newS, newL);
}
