import { ActivityModal } from '../components/Modal/ActivityModal';
import { ActivityList } from '../components/ActivityList/ActivityList';
import { StickerPalette } from '../components/StickerPalette/StickerPalette';
import { A4Page } from '../components/A4Page/A4Page';
import { ExportPanel } from '../components/ExportPanel/ExportPanel';
import { useActivityManager } from '../hooks/useActivityManager';
import { useStickerManager } from '../hooks/useStickerManager';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useMemo, useRef, useState } from 'react';

const MAX_PLANNER_NAME_LENGTH = 10;
const DESKTOP_LAYOUT_BREAKPOINT_PX = 900;
const DESKTOP_GAP_PX = 24;
const LAYOUT_BOTTOM_PADDING_PX = 16;

export function HomePage() {
  const [plannerName, setPlannerName] = useLocalStorage<string>('planner_v1_name', '');
  const [plannerSizePx, setPlannerSizePx] = useState<number>(0);
  const layoutRef = useRef<HTMLElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const {
    activities,
    pendingRange,
    editingActivity,
    overlapError,
    dragStartAngle,
    dragEndAngle,
    onClockPointerDown,
    onClockPointerMove,
    onClockPointerUp,
    handleSaveActivity,
    handleEditActivity,
    handleDeleteActivity,
    handleCloseModal,
  } = useActivityManager();

  const {
    placedStickers,
    selectedStickerEmoji,
    setSelectedStickerEmoji,
    selectedStickerId,
    draggingStickerId,
    a4PageRef,
    deselectAllStickers,
    handlePageClick,
    handlePagePointerMove,
    handlePagePointerUp,
    handleStickerPointerDown,
    handleStickerDelete,
    handleStickerResize,
  } = useStickerManager();

  useEffect(() => {
    const layoutEl = layoutRef.current;
    const sidebarEl = sidebarRef.current;
    if (!layoutEl || !sidebarEl) return;

    let rafId: number | null = null;

    function computePlannerSize() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!layoutEl || !sidebarEl) return;
        const rect = layoutEl.getBoundingClientRect();
        const availableHeight = Math.max(0, window.innerHeight - rect.top - LAYOUT_BOTTOM_PADDING_PX);
        const layoutWidth = layoutEl.clientWidth;

        const isDesktop = window.innerWidth >= DESKTOP_LAYOUT_BREAKPOINT_PX;
        const sidebarWidth = isDesktop ? sidebarEl.offsetWidth : 0;
        const gapWidth = isDesktop ? DESKTOP_GAP_PX : 0;
        const availableCanvasWidth = Math.max(0, layoutWidth - sidebarWidth - gapWidth);

        const fitSize = Math.floor(Math.min(availableHeight, availableCanvasWidth));
        setPlannerSizePx(fitSize);
      });
    }

    computePlannerSize();

    const resizeObserver = new ResizeObserver(() => computePlannerSize());
    resizeObserver.observe(layoutEl);
    resizeObserver.observe(sidebarEl);
    window.addEventListener('resize', computePlannerSize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', computePlannerSize);
    };
  }, []);

  const layoutStyle = useMemo(() => {
    if (!plannerSizePx) return undefined;
    return { ['--planner-size' as never]: `${plannerSizePx}px` };
  }, [plannerSizePx]);

  return (
    <div className="app app--home">
      <main className="planner-layout" ref={layoutRef} style={layoutStyle}>
        <section className="planner-canvas" aria-label="생활계획표 편집 영역">
          <div className="planner-canvas-fit">
            <A4Page
              containerRef={a4PageRef}
              plannerName={plannerName}
              activities={activities}
              dragStartAngle={dragStartAngle}
              dragEndAngle={dragEndAngle}
              isPlacingSticker={selectedStickerEmoji !== null}
              onClockPointerDown={onClockPointerDown}
              onClockPointerMove={onClockPointerMove}
              onClockPointerUp={onClockPointerUp}
              onActivityClick={handleEditActivity}
              placedStickers={placedStickers}
              selectedStickerId={selectedStickerId}
              draggingStickerId={draggingStickerId}
              onClick={handlePageClick}
              onPointerMove={handlePagePointerMove}
              onPointerUp={handlePagePointerUp}
              onStickerPointerDown={handleStickerPointerDown}
              onStickerDelete={handleStickerDelete}
              onStickerResize={handleStickerResize}
            />
          </div>
        </section>

        <aside
          className="planner-sidebar"
          aria-label="스티커, 활동목록, 저장/인쇄"
          ref={sidebarRef}
        >
          <div className="planner-sidebar-header">
            <div className="planner-sidebar-subtitle">시계 위를 드래그해서 활동을 추가해보세요!</div>
          </div>

          <div className="planner-sidebar-section">
            <div className="planner-name-row">
              <label className="planner-sidebar-label planner-sidebar-label--inline" htmlFor="planner-name-input">
                이름
              </label>
            <input
              id="planner-name-input"
              className="planner-sidebar-input"
              value={plannerName}
              onChange={(e) => setPlannerName(e.target.value.slice(0, MAX_PLANNER_NAME_LENGTH))}
              maxLength={MAX_PLANNER_NAME_LENGTH}
              placeholder="사용자의 이름을 입력하세요"
              autoComplete="off"
            />
            </div>
          </div>

          <div className="planner-sidebar-divider" />

          <div className="planner-sidebar-section">
            <StickerPalette selectedEmoji={selectedStickerEmoji} onSelectEmoji={setSelectedStickerEmoji} />
          </div>

          <div className="planner-sidebar-divider" />

          <section className="planner-sidebar-section activity-list-section">
            <h3 className="activity-list-heading">📋 활동 목록</h3>
            <ActivityList
              activities={activities}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
            />
          </section>

          <div className="planner-sidebar-divider" />

          <div className="planner-sidebar-section">
            <ExportPanel
              a4PageRef={a4PageRef}
              plannerName={plannerName}
              onBeforeExport={deselectAllStickers}
            />
          </div>
        </aside>
      </main>

      <ActivityModal
        isOpen={pendingRange !== null}
        startHour={pendingRange?.startHour ?? 0}
        endHour={pendingRange?.endHour ?? 0}
        initialActivity={editingActivity ?? undefined}
        errorMessage={overlapError ?? undefined}
        onSave={handleSaveActivity}
        onClose={handleCloseModal}
      />
    </div>
  );
}
