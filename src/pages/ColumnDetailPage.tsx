import { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COLUMNS } from '../data/columns';
import './PageLayout.css';
import './ColumnDetailPage.css';

const SITE_ORIGIN = 'https://intothebetter.com';
const DEFAULT_AUTHOR = '방학 생활계획표 편집팀';
const RELATED_COLUMNS_LIMIT = 6;

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${month}월 ${day}일`;
}

function slugifyHeading(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9가-힣\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

function getReferenceLinksByTags(tags: string[]) {
  const refs: Array<{ label: string; url: string }> = [
    { label: 'WHO — 신체 활동 권장(어린이/청소년)', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
    { label: 'WHO — 화면시간/좌식 행동 관련 권고(개요)', url: 'https://www.who.int/health-topics/physical-activity' },
    { label: 'Google — 고품질 사이트 만들기 팁', url: 'https://adsense.googleblog.com/2012/04/tips-for-creating-high-quality-sites.html' },
  ];

  const tagSet = new Set(tags);
  if (tagSet.has('수면') || tagSet.has('건강') || tagSet.has('뇌발달')) {
    refs.unshift(
      { label: 'National Sleep Foundation — Children & Sleep', url: 'https://www.sleepfoundation.org/children-and-sleep' },
    );
  }
  if (tagSet.has('스마트폰') || tagSet.has('미디어') || tagSet.has('디지털교육')) {
    refs.unshift(
      { label: 'UNICEF — Children and digital technology (overview)', url: 'https://www.unicef.org/innovation/children-and-digital-technology' },
    );
  }
  if (tagSet.has('독서') || tagSet.has('학습습관') || tagSet.has('글쓰기')) {
    refs.unshift(
      { label: 'UNESCO — Literacy (overview)', url: 'https://www.unesco.org/en/literacy' },
    );
  }
  return refs;
}

export function ColumnDetailPage() {
  const { id } = useParams<{ id: string }>();
  const column = COLUMNS.find((c) => c.id === id);

  if (!column) return <Navigate to="/columns" replace />;

  const currentIndex = COLUMNS.findIndex((c) => c.id === id);
  const prevColumn = currentIndex > 0 ? COLUMNS[currentIndex - 1] : null;
  const nextColumn = currentIndex < COLUMNS.length - 1 ? COLUMNS[currentIndex + 1] : null;

  const tocItems = useMemo(() => {
    return column.sections
      .map((s) => s.heading?.trim())
      .filter((h): h is string => Boolean(h))
      .map((heading) => ({
        heading,
        anchor: `sec-${slugifyHeading(heading)}`,
      }));
  }, [column.sections]);

  const relatedColumns = useMemo(() => {
    const tagSet = new Set(column.tags);
    return COLUMNS
      .filter((c) => c.id !== column.id)
      .map((c) => ({
        column: c,
        score: c.tags.reduce((acc, t) => acc + (tagSet.has(t) ? 1 : 0), 0),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || b.column.date.localeCompare(a.column.date))
      .slice(0, RELATED_COLUMNS_LIMIT)
      .map((x) => x.column);
  }, [column.id, column.tags]);

  const referenceLinks = useMemo(() => getReferenceLinksByTags(column.tags), [column.tags]);
  const pageUrl = `${SITE_ORIGIN}/columns/${column.id}`;

  useEffect(() => {
    document.title = `${column.title} | 방학 생활계획표 칼럼`;
  }, [column.title]);

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: column.title,
            description: column.description,
            datePublished: column.date,
            dateModified: column.date,
            author: {
              '@type': 'Organization',
              name: DEFAULT_AUTHOR,
            },
            publisher: {
              '@type': 'Organization',
              name: '방학 생활계획표 짜기',
              url: SITE_ORIGIN,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': pageUrl,
            },
            url: pageUrl,
            inLanguage: 'ko-KR',
            keywords: column.tags,
          }),
        }}
      />

      <div className="col-detail-hero">
        <div className="col-detail-hero-inner">
          <div className="col-detail-emoji">{column.emoji}</div>
          <h1 className="col-detail-title">{column.title}</h1>
          <div className="col-detail-meta">
            <span>{formatDate(column.date)}</span>
            <span>읽는 시간 {column.readTimeMin}분</span>
            <span>작성: {DEFAULT_AUTHOR}</span>
          </div>
          <div className="col-detail-tags">
            {column.tags.map((tag) => (
              <span key={tag} className="col-tag">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="col-detail-layout">
        <aside className="col-detail-aside" aria-label="칼럼 도우미">
          {tocItems.length > 0 && (
            <div className="col-box">
              <div className="col-box-title">목차</div>
              <ul className="col-toc" role="list">
                {tocItems.map((t) => (
                  <li key={t.anchor}>
                    <a className="col-toc-link" href={`#${t.anchor}`}>{t.heading}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="col-box">
            <div className="col-box-title">참고 자료</div>
            <ul className="col-ref" role="list">
              {referenceLinks.map((r) => (
                <li key={r.url}>
                  <a className="col-ref-link" href={r.url} target="_blank" rel="noopener noreferrer">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="col-detail-body">
          {column.sections.map((section, si) => {
            const heading = section.heading?.trim();
            const headingId = heading ? `sec-${slugifyHeading(heading)}` : undefined;

            return (
              <section key={si} className="col-detail-section">
                {heading && (
                  <h2 id={headingId} className="col-detail-h2">
                    {heading}
                  </h2>
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
            );
          })}

          {relatedColumns.length > 0 && (
            <section className="col-related" aria-label="관련 칼럼">
              <h2 className="col-related-title">관련 칼럼</h2>
              <div className="col-related-grid">
                {relatedColumns.map((c) => (
                  <Link key={c.id} to={`/columns/${c.id}`} className="col-related-card">
                    <div className="col-related-emoji">{c.emoji}</div>
                    <div className="col-related-body">
                      <div className="col-related-card-title">{c.title}</div>
                      <div className="col-related-card-desc">{c.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

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
