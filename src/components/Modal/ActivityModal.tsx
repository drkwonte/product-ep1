import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import type { Activity } from '../../types';
import { ACTIVITY_COLORS } from '../../constants/palette';
import { formatHour, formatDuration } from '../../utils/formatTime';
import './ActivityModal.css';

const DEFAULT_ACTIVITY_COLOR = ACTIVITY_COLORS[3];

interface ActivityModalProps {
  isOpen: boolean;
  startHour: number;
  endHour: number;
  initialActivity?: Activity;
  errorMessage?: string;
  onSave: (data: Omit<Activity, 'id'>) => void;
  onClose: () => void;
}

export function ActivityModal({
  isOpen,
  startHour,
  endHour,
  initialActivity,
  errorMessage,
  onSave,
  onClose,
}: ActivityModalProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_ACTIVITY_COLOR);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditMode = initialActivity !== undefined;

  useEffect(() => {
    if (isOpen) {
      setName(initialActivity?.name ?? '');
      setSelectedColor(initialActivity?.color ?? DEFAULT_ACTIVITY_COLOR);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialActivity]);

  if (!isOpen) return null;

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave({
      name: trimmed,
      startHour,
      endHour,
      color: selectedColor,
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onClose();
  }

  const duration = endHour - startHour;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 className="modal-title">
          {isEditMode ? '활동 수정' : '활동 추가'}
        </h2>

        <div className="modal-time-range">
          <span className="modal-time">{formatHour(startHour)}</span>
          <span className="modal-time-arrow">→</span>
          <span className="modal-time">{formatHour(endHour)}</span>
          <span className="modal-duration">{formatDuration(duration)}</span>
        </div>

        {errorMessage && (
          <div className="modal-error">{errorMessage}</div>
        )}

        <div className="modal-field">
          <label className="modal-label">색상 선택</label>
          <div className="color-picker">
            {ACTIVITY_COLORS.map((color) => (
              <button
                key={color}
                className={`color-swatch${selectedColor === color ? ' color-swatch-selected' : ''}`}
                style={{ background: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={color}
              />
            ))}
          </div>
        </div>

        <div className="modal-field">
          <label className="modal-label" htmlFor="activity-name">
            활동 이름
          </label>
          <input
            id="activity-name"
            ref={inputRef}
            className="modal-input"
            type="text"
            placeholder="예: 수학 공부, 독서, 운동..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            취소
          </button>
          <button
            className="modal-btn modal-btn-save"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            {isEditMode ? '수정' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
