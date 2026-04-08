import './PageLayout.css';
import './PoliciesPage.css';

const LAST_UPDATED = '2026-04-08';

export function PoliciesPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero-title">🛡️ 편집 정책 · 면책 · 저작권</h1>
        <p className="page-hero-desc">
          본 페이지는 서비스 이용 시 참고해야 할 편집 원칙, 의학·교육 조언의 한계(면책), 저작권
          관련 안내를 제공합니다.
        </p>
      </div>

      <div className="page-content policies-content">
        <p className="policies-updated">최종 수정일: {LAST_UPDATED}</p>

        <section className="policies-section">
          <h2 className="policies-h2">1) 편집 정책 (콘텐츠 제작 원칙)</h2>
          <p className="policies-p">
            본 사이트의 가이드·칼럼·자료 페이지는 초등학생 방학 생활과 학습을 돕기 위한 정보 제공을
            목적으로 합니다. 아래 원칙에 따라 콘텐츠를 제작·수정합니다.
          </p>
          <ul className="policies-list">
            <li>
              <strong>고유한 설명</strong> — 단순 요약·나열이 아닌, 실제 사용 맥락(예: 생활계획표에
              적용하는 방법) 중심으로 작성합니다.
            </li>
            <li>
              <strong>출처 표기</strong> — 공공기관/학술/권위 있는 자료를 참고한 경우 가능한 범위에서
              출처 링크를 제공합니다.
            </li>
            <li>
              <strong>표절 금지</strong> — 타 사이트 문구를 복사·붙여넣기 하지 않으며, 인용이 필요한
              경우 최소한으로 사용하고 출처를 명확히 표시합니다.
            </li>
            <li>
              <strong>지속적인 개선</strong> — 더 나은 안내를 위해 오탈자·설명 부족·최신성 이슈를
              발견하면 업데이트합니다.
            </li>
          </ul>
        </section>

        <section className="policies-section">
          <h2 className="policies-h2">2) 면책 (의학·교육 조언의 한계)</h2>
          <p className="policies-p">
            본 사이트의 모든 콘텐츠(가이드/칼럼/자료/도구)는 일반적인 정보 제공을 위한 것이며,
            전문가의 진단·처방·상담을 대체하지 않습니다.
          </p>
          <ul className="policies-list">
            <li>
              <strong>의학·건강</strong> — 수면, 영양, 운동 등 건강 관련 내용은 일반적인 참고 정보이며,
              증상이 있거나 질환이 의심될 경우 의료 전문가의 상담을 받으시기 바랍니다.
            </li>
            <li>
              <strong>교육·학습</strong> — 학습 방법, 습관 형성, 동기 부여에 관한 내용은 개인의 상황에
              따라 효과가 달라질 수 있으며, 학교·전문가 조언과 함께 종합적으로 판단하시기 바랍니다.
            </li>
            <li>
              <strong>안전</strong> — 야외 활동/운동/체험을 안내하는 경우, 보호자 지도와 안전 수칙을
              우선으로 해 주세요.
            </li>
          </ul>
        </section>

        <section className="policies-section">
          <h2 className="policies-h2">3) 저작권 안내</h2>
          <p className="policies-p">
            본 사이트에 게시된 텍스트 콘텐츠(가이드/칼럼 등) 및 디자인 요소는 저작권법의 보호를
            받습니다.
          </p>
          <ul className="policies-list">
            <li>
              <strong>무단 복제·재배포 금지</strong> — 전체 또는 일부를 출처 없이 복제/배포/판매하는
              행위를 금지합니다.
            </li>
            <li>
              <strong>인용</strong> — 공정한 관행에 부합하는 범위에서 인용할 수 있으며, 링크와 함께
              출처(사이트명과 페이지)를 명확히 표기해 주세요.
            </li>
            <li>
              <strong>사용자 입력 데이터</strong> — 사용자가 도구에 입력한 계획표 내용(이름/활동/스티커)은
              사용자의 기기(localStorage)에 저장되며, 본 사이트 서버로 전송되지 않습니다.
            </li>
          </ul>
        </section>

        <section className="policies-section">
          <h2 className="policies-h2">4) 제3자 서비스 (광고/댓글)</h2>
          <p className="policies-p">
            본 사이트는 기능 제공을 위해 제3자 서비스를 사용할 수 있습니다. 제3자 서비스는 자체
            정책에 따라 쿠키/데이터를 처리할 수 있습니다.
          </p>
          <ul className="policies-list">
            <li>
              <strong>Google AdSense</strong> — 광고 제공을 위해 Google이 쿠키를 사용할 수 있습니다.
            </li>
            <li>
              <strong>Disqus</strong> — 댓글 기능 제공을 위해 Disqus가 데이터를 처리할 수 있습니다.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

