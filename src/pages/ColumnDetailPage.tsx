import { useParams, Link, Navigate } from 'react-router-dom';
import { COLUMNS } from '../data/columns';
import './PageLayout.css';
import './ColumnDetailPage.css';

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${month}월 ${day}일`;
}

export function ColumnDetailPage() {
  const { id } = useParams<{ id: string }>();
  const column = COLUMNS.find((c) => c.id === id);

  if (!column) return <Navigate to="/columns" replace />;

  const currentIndex = COLUMNS.findIndex((c) => c.id === id);
  const prevColumn = currentIndex > 0 ? COLUMNS[currentIndex - 1] : null;
  const nextColumn = currentIndex < COLUMNS.length - 1 ? COLUMNS[currentIndex + 1] : null;

  return (
    <div className="page-wrapper">
      <div className="col-detail-hero">
        <div className="col-detail-hero-inner">
          <div className="col-detail-emoji">{column.emoji}</div>
          <h1 className="col-detail-title">{column.title}</h1>
          <div className="col-detail-meta">
            <span>{formatDate(column.date)}</span>
            <span>읽는 시간 {column.readTimeMin}분</span>
          </div>
          <div className="col-detail-tags">
            {column.tags.map((tag) => (
              <span key={tag} className="col-tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <article className="col-detail-body">
        {column.sections.map((section, si) => (
          <section key={si} className="col-detail-section">
            {section.heading && (
              <h2 className="col-detail-h2">{section.heading}</h2>
            )}
            {section.paragraphs.map((p, pi) =>
              p ? <p key={pi} className="col-detail-p">{p}</p> : null,
            )}
            {section.list && (
              <ul className="col-detail-list">
                {section.list.map((item) => (
                  <li key={item.label} className="col-detail-list-item">
                    <strong>{item.label}</strong> — {item.desc}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {/* ── 이전 / 다음 칼럼 네비게이션 ── */}
      <nav className="col-nav" aria-label="이전·다음 칼럼">
        <div className="col-nav-inner">
          {prevColumn ? (
            <Link to={`/columns/${prevColumn.id}`} className="col-nav-link col-nav-link--prev">
              <span className="col-nav-direction">← 이전 칼럼</span>
              <span className="col-nav-title">{prevColumn.emoji} {prevColumn.title}</span>
            </Link>
          ) : <div />}
          {nextColumn ? (
            <Link to={`/columns/${nextColumn.id}`} className="col-nav-link col-nav-link--next">
              <span className="col-nav-direction">다음 칼럼 →</span>
              <span className="col-nav-title">{nextColumn.emoji} {nextColumn.title}</span>
            </Link>
          ) : <div />}
        </div>
        <div className="col-nav-back">
          <Link to="/columns" className="col-nav-back-link">← 칼럼 목록으로 돌아가기</Link>
        </div>
      </nav>
    </div>
  );
}
