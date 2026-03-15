import { useState, useRef } from 'react';
import type React from 'react';
import type { PlacedSticker } from '../types';
import { STICKER_MIN_SIZE, STICKER_MAX_SIZE } from '../constants/sticker';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY_STICKERS = 'planner_v1_stickers';

interface DraggingSticker {
  id: string;
  offsetXPx: number;
  offsetYPx: number;
}

export function useStickerManager() {
  const [placedStickers, setPlacedStickers] = useLocalStorage<PlacedSticker[]>(
    STORAGE_KEY_STICKERS,
    [],
  );
  const [selectedStickerEmoji, setSelectedStickerEmoji] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [draggingSticker, setDraggingSticker] = useState<DraggingSticker | null>(null);
  const a4PageRef = useRef<HTMLDivElement>(null);

  function deselectAllStickers() {
    setSelectedStickerId(null);
  }

  function handlePageClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!selectedStickerEmoji) {
      setSelectedStickerId(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    setPlacedStickers((prev) => [
      ...prev,
      { id: crypto.randomUUID(), emoji: selectedStickerEmoji, xPercent, yPercent, size: 1 },
    ]);
  }

  function handlePagePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingSticker) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = ((e.clientX - draggingSticker.offsetXPx - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - draggingSticker.offsetYPx - rect.top) / rect.height) * 100;
    setPlacedStickers((prev) =>
      prev.map((s) =>
        s.id === draggingSticker.id
          ? {
              ...s,
              xPercent: Math.max(0, Math.min(100, newX)),
              yPercent: Math.max(0, Math.min(100, newY)),
            }
          : s,
      ),
    );
  }

  function handlePagePointerUp() {
    setDraggingSticker(null);
  }

  function handleStickerPointerDown(e: React.PointerEvent, sticker: PlacedSticker) {
    if (selectedStickerEmoji) return;
    e.stopPropagation();
    setSelectedStickerId(sticker.id);
    const a4Rect = a4PageRef.current!.getBoundingClientRect();
    const stickerClientX = (sticker.xPercent / 100) * a4Rect.width + a4Rect.left;
    const stickerClientY = (sticker.yPercent / 100) * a4Rect.height + a4Rect.top;
    setDraggingSticker({
      id: sticker.id,
      offsetXPx: e.clientX - stickerClientX,
      offsetYPx: e.clientY - stickerClientY,
    });
  }

  function handleStickerDelete(id: string) {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedStickerId(null);
  }

  function handleStickerResize(id: string, delta: number) {
    setPlacedStickers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, size: Math.max(STICKER_MIN_SIZE, Math.min(STICKER_MAX_SIZE, s.size + delta)) }
          : s,
      ),
    );
  }

  return {
    placedStickers,
    selectedStickerEmoji,
    setSelectedStickerEmoji,
    selectedStickerId,
    draggingStickerId: draggingSticker?.id ?? null,
    a4PageRef,
    deselectAllStickers,
    handlePageClick,
    handlePagePointerMove,
    handlePagePointerUp,
    handleStickerPointerDown,
    handleStickerDelete,
    handleStickerResize,
  };
}
