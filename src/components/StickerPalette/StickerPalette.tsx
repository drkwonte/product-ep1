import { useState } from 'react';
import { createPortal } from 'react-dom';
import type React from 'react';
import { STICKER_EMOJIS } from '../../constants/palette';
import './StickerPalette.css';

interface StickerPaletteProps {
  selectedEmoji: string | null;
  onSelectEmoji: (emoji: string | null) => void;
}

export function StickerPalette({
  selectedEmoji,
  onSelectEmoji,
}: StickerPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(emoji: string) {
    onSelectEmoji(selectedEmoji === emoji ? null : emoji);
    setIsOpen(false);
  }

  function handleBackdropKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setIsOpen(false);
  }

  const modal = isOpen
    ? createPortal(
        <div
          className="sticker-modal-backdrop"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleBackdropKeyDown}
        >
          <div
            className="sticker-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticker-modal-header">
              <h3 className="sticker-modal-title">✨ 스티커 고르기</h3>
              <button
                className="sticker-modal-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="sticker-grid">
              {STICKER_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  className={`sticker-btn${selectedEmoji === emoji ? ' sticker-btn-selected' : ''}`}
                  onClick={() => handleSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="sticker-controls">
      <button
        className="sticker-open-btn"
        onClick={() => setIsOpen(true)}
      >
        ✨ 스티커 꾸미기
      </button>

      {selectedEmoji && (
        <div className="sticker-active-hint">
          <span className="sticker-active-emoji">{selectedEmoji}</span>
          <span className="sticker-active-text">
            A4 영역 안 원하는 곳을 클릭해서 붙여보세요!
          </span>
          <button
            className="sticker-deselect-btn"
            onClick={() => onSelectEmoji(null)}
          >
            ✕
          </button>
        </div>
      )}

      {modal}
    </div>
  );
}
