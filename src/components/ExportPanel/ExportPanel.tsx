import { useState } from 'react';
import { saveAsJpg, printPage } from '../../utils/exportPage';
import './ExportPanel.css';

interface ExportPanelProps {
  a4PageRef: { readonly current: HTMLDivElement | null };
  plannerName: string;
  onBeforeExport: () => void;
}

export function ExportPanel({ a4PageRef, plannerName, onBeforeExport }: ExportPanelProps) {
  const [saving, setSaving] = useState(false);

  async function handleSaveJpg() {
    if (!a4PageRef.current || saving) return;
    onBeforeExport();
    setSaving(true);
    // React re-render 대기 후 캡처 (툴바/선택 효과 제거)
    await new Promise((resolve) => setTimeout(resolve, 60));
    try {
      const filename = plannerName
        ? `${plannerName}의_방학_생활계획표`
        : '방학_생활계획표';
      await saveAsJpg(a4PageRef.current, filename);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="export-panel">
      <h3 className="export-panel-heading">📤 저장 / 인쇄</h3>
      <div className="export-btns">
        <button
          className="export-btn export-btn--jpg"
          onClick={handleSaveJpg}
          disabled={saving}
        >
          {saving ? '처리 중…' : '💾 JPG 저장'}
        </button>
        <button className="export-btn export-btn--print" onClick={printPage}>
          🖨️ 인쇄
        </button>
      </div>
    </div>
  );
}
