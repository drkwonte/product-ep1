import { Link } from 'react-router-dom';
import { COLUMNS } from '../data/columns';
import './PageLayout.css';
import './ColumnsPage.css';

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${year}. ${month}. ${day}.`;
}

export function ColumnsPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero-title">🗞️ 칼럼</h1>
        <p className="page-hero-desc">
          초등학생 방학 생활과 교육에 관한 유익한 칼럼을 모았습니다.
          아이와 함께 건강하고 알찬 방학을 만들어가는 데 도움이 되길 바랍니다.
        </p>
      </div>

      <div className="page-content">
        <ul className="col-list" role="list">
          {COLUMNS.map((col) => (
            <li key={col.id}>
              <Link to={`/columns/${col.id}`} className="col-card">
                <span className="col-card-emoji">{col.emoji}</span>
                <div className="col-card-body">
                  <h2 className="col-card-title">{col.title}</h2>
                  <p className="col-card-desc">{col.description}</p>
                  <div className="col-card-meta">
                    <span>{formatDate(col.date)}</span>
                    <span>읽는 시간 {col.readTimeMin}분</span>
                    <div className="col-card-tags">
                      {col.tags.map((tag) => (
                        <span key={tag} className="col-tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
