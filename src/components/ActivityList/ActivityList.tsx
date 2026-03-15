import type { Activity } from '../../types';
import './ActivityList.css';

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

export function ActivityList({ activities, onEdit, onDelete }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="activity-list-empty">
        <span className="activity-list-empty-icon">📋</span>
        <p>아직 추가된 활동이 없어요</p>
        <p>시계 위를 드래그해 보세요!</p>
      </div>
    );
  }

  return (
    <ul className="activity-list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity-item">
          <div className="activity-color-bar" style={{ background: activity.color }} />
          <span className="activity-name">{activity.name}</span>
          <div className="activity-actions">
            <button
              className="activity-btn activity-btn-edit"
              onClick={() => onEdit(activity)}
              title="수정"
            >
              ✏️
            </button>
            <button
              className="activity-btn activity-btn-delete"
              onClick={() => onDelete(activity.id)}
              title="삭제"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
