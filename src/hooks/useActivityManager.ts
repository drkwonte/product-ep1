import { useState } from 'react';
import type { Activity } from '../types';
import { useDragAngle } from './useDragAngle';
import { overlapsWithExisting } from '../utils/activityUtils';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY_ACTIVITIES = 'planner_v1_activities';

interface PendingTimeRange {
  startHour: number;
  endHour: number;
}

export function useActivityManager() {
  const [activities, setActivities] = useLocalStorage<Activity[]>(STORAGE_KEY_ACTIVITIES, []);
  const [pendingRange, setPendingRange] = useState<PendingTimeRange | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [overlapError, setOverlapError] = useState<string | null>(null);

  const { dragStartAngle, dragEndAngle, onPointerDown, onPointerMove, onPointerUp } =
    useDragAngle({
      onDragComplete: (startHour, endHour) => {
        setOverlapError(null);
        setEditingActivity(null);
        setPendingRange({ startHour, endHour });
      },
    });

  function handleSaveActivity(data: Omit<Activity, 'id'>) {
    if (overlapsWithExisting(data.startHour, data.endHour, activities, editingActivity?.id)) {
      setOverlapError('이 시간대에 이미 다른 활동이 있어요! 다른 시간을 선택해주세요.');
      return;
    }

    if (editingActivity) {
      setActivities((prev) =>
        prev.map((a) => (a.id === editingActivity.id ? { ...data, id: editingActivity.id } : a)),
      );
    } else {
      setActivities((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    }

    setPendingRange(null);
    setEditingActivity(null);
    setOverlapError(null);
  }

  function handleEditActivity(activity: Activity) {
    setOverlapError(null);
    setEditingActivity(activity);
    setPendingRange({ startHour: activity.startHour, endHour: activity.endHour });
  }

  function handleDeleteActivity(id: string) {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  function handleCloseModal() {
    setPendingRange(null);
    setEditingActivity(null);
    setOverlapError(null);
  }

  return {
    activities,
    pendingRange,
    editingActivity,
    overlapError,
    dragStartAngle,
    dragEndAngle,
    onClockPointerDown: onPointerDown,
    onClockPointerMove: onPointerMove,
    onClockPointerUp: onPointerUp,
    handleSaveActivity,
    handleEditActivity,
    handleDeleteActivity,
    handleCloseModal,
  };
}
