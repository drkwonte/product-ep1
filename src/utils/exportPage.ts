import html2canvas from 'html2canvas';

const EXPORT_SCALE = 2;
const EXPORT_JPEG_QUALITY = 0.95;

/**
 * A4 요소를 캡처해 JPG로 저장한다.
 * 캡처 중에는 편집 UI(테두리, 선택 효과, 툴바, 라벨)가 제거된다.
 */
export async function saveAsJpg(element: HTMLElement, filename: string): Promise<void> {
  element.classList.add('a4-page--exporting');
  try {
    const canvas = await html2canvas(element, {
      scale: EXPORT_SCALE,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      ignoreElements: (el) =>
        el.classList.contains('a4-label') || el.classList.contains('sticker-toolbar'),
    });
    const link = document.createElement('a');
    link.download = `${filename}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', EXPORT_JPEG_QUALITY);
    link.click();
  } finally {
    element.classList.remove('a4-page--exporting');
  }
}

export function printPage(): void {
  window.print();
}
