import type React from 'react';
import type { Activity, PlacedSticker } from '../../types';
import { ClockWheel } from '../ClockWheel/ClockWheel';
import { STICKER_BASE_SIZE_PX, STICKER_SIZE_STEP, STICKER_TOOLBAR_THRESHOLD_PERCENT } from '../../constants/sticker';
import './A4Page.css';

interface A4PageProps {
  containerRef: { readonly current: HTMLDivElement | null };
  plannerName: string;
  activities: Activity[];
  dragStartAngle: number | null;
  dragEndAngle: number | null;
  isPlacingSticker: boolean;
  onClockPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
  onClockPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
  onClockPointerUp: () => void;
  onActivityClick: (activity: Activity) => void;
  placedStickers: PlacedSticker[];
  selectedStickerId: string | null;
  draggingStickerId: string | null;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: () => void;
  onStickerPointerDown: (e: React.PointerEvent, sticker: PlacedSticker) => void;
  onStickerDelete: (id: string) => void;
  onStickerResize: (id: string, delta: number) => void;
}

export function A4Page({
  containerRef,
  plannerName,
  activities,
  dragStartAngle,
  dragEndAngle,
  isPlacingSticker,
  onClockPointerDown,
  onClockPointerMove,
  onClockPointerUp,
  onActivityClick,
  placedStickers,
  selectedStickerId,
  draggingStickerId,
  onClick,
  onPointerMove,
  onPointerUp,
  onStickerPointerDown,
  onStickerDelete,
  onStickerResize,
}: A4PageProps) {
  return (
    <div
      ref={containerRef}
      className={`a4-page${isPlacingSticker ? ' a4-page-sticker-mode' : ''}`}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="a4-title-section" onClick={(e) => e.stopPropagation()}>
        <div className="a4-title-row">
          <span className="a4-title-name">{plannerName || '이름'}</span>
          <span className="a4-title-suffix">의 방학 생활계획표</span>
        </div>
      </div>

      <ClockWheel
        activities={activities}
        dragStartAngle={dragStartAngle}
        dragEndAngle={dragEndAngle}
        isPlacingSticker={isPlacingSticker}
        plannerName={plannerName}
        onPointerDown={onClockPointerDown}
        onPointerMove={onClockPointerMove}
        onPointerUp={onClockPointerUp}
        onActivityClick={onActivityClick}
      />

      {placedStickers.map((sticker) => {
        const isSelected = selectedStickerId === sticker.id;
        const isDragging = draggingStickerId === sticker.id;
        const showToolbarAbove = sticker.yPercent > STICKER_TOOLBAR_THRESHOLD_PERCENT;

        return (
          <div
            key={sticker.id}
            className={`placed-sticker${isSelected ? ' placed-sticker--selected' : ''}`}
            style={{
              left: `${sticker.xPercent}%`,
              top: `${sticker.yPercent}%`,
              fontSize: `${STICKER_BASE_SIZE_PX * sticker.size}px`,
              cursor: isDragging ? 'grabbing' : (isPlacingSticker ? 'default' : 'grab'),
              pointerEvents: isPlacingSticker ? 'none' : 'auto',
              transition: isDragging ? 'none' : 'filter 0.15s',
            }}
            onPointerDown={(e) => onStickerPointerDown(e, sticker)}
            onClick={(e) => e.stopPropagation()}
          >
            {sticker.emoji}
            {isSelected && !isDragging && (
              <div
                className={`sticker-toolbar${showToolbarAbove ? '' : ' sticker-toolbar--below'}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="sticker-toolbar-btn"
                  onClick={() => onStickerResize(sticker.id, -STICKER_SIZE_STEP)}
                  title="작게"
                >
                  −
                </button>
                <button
                  className="sticker-toolbar-btn sticker-toolbar-btn--delete"
                  onClick={() => onStickerDelete(sticker.id)}
                  title="삭제"
                >
                  🗑️
                </button>
                <button
                  className="sticker-toolbar-btn"
                  onClick={() => onStickerResize(sticker.id, STICKER_SIZE_STEP)}
                  title="크게"
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}

      <div className="a4-label">A4 출력 영역</div>
    </div>
  );
}
