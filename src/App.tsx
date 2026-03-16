import { ActivityModal } from './components/Modal/ActivityModal';
import { ActivityList } from './components/ActivityList/ActivityList';
import { StickerPalette } from './components/StickerPalette/StickerPalette';
import { A4Page } from './components/A4Page/A4Page';
import { ExportPanel } from './components/ExportPanel/ExportPanel';
import { DisqusSection } from './components/DisqusSection/DisqusSection';
import { AppFooter } from './components/AppFooter/AppFooter';
import { ContentGuide } from './components/ContentGuide/ContentGuide';
import { useActivityManager } from './hooks/useActivityManager';
import { useStickerManager } from './hooks/useStickerManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [plannerName, setPlannerName] = useLocalStorage<string>('planner_v1_name', '');

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

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📅 방학 생활계획표 짜기</h1>
        <p className="app-subtitle">시계 위를 드래그해서 활동을 추가해보세요!</p>
      </header>

      <main className="app-main">
        <div className="top-controls">
          <StickerPalette
            selectedEmoji={selectedStickerEmoji}
            onSelectEmoji={setSelectedStickerEmoji}
          />
          <ExportPanel
            a4PageRef={a4PageRef}
            plannerName={plannerName}
            onBeforeExport={deselectAllStickers}
          />
        </div>

        <A4Page
          containerRef={a4PageRef}
          plannerName={plannerName}
          onPlannerNameChange={setPlannerName}
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

        <section className="activity-list-section">
          <h3 className="activity-list-heading">📋 활동 목록</h3>
          <ActivityList
            activities={activities}
            onEdit={handleEditActivity}
            onDelete={handleDeleteActivity}
          />
        </section>
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

      <ContentGuide />
      <DisqusSection />
      <AppFooter />
    </div>
  );
}

export default App;
