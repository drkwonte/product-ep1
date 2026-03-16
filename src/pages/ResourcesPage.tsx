import './PageLayout.css';
import './ResourcesPage.css';

interface ResourceLink {
  title: string;
  url: string;
  desc: string;
}

interface ResourceGroup {
  heading: string;
  items: ResourceLink[];
}

const OFFICIAL_SITES: ResourceGroup = {
  heading: '공식 교육 기관 & 온라인 학습 사이트',
  items: [
    {
      title: '교육부 공식 홈페이지',
      url: 'https://www.moe.go.kr',
      desc: '교육부의 정책 자료, 학부모 지원 정보, 방학 프로그램 안내 등을 확인할 수 있습니다.',
    },
    {
      title: 'EBS 초등 온라인 강의',
      url: 'https://primary.ebs.co.kr',
      desc: '초등학교 전 학년 무료 인터넷 강의. 방학 중 복습과 예습에 활용하기 좋습니다.',
    },
    {
      title: '국가교육과정정보센터 (NCIC)',
      url: 'https://ncic.go.kr',
      desc: '학년별 교육과정 안내와 교과 자료를 제공합니다. 방학 학습 계획 수립에 참고하세요.',
    },
    {
      title: '위두랑 (학생 학습 포털)',
      url: 'https://www.edunet.net',
      desc: '교육부 운영 에듀넷·티-클리어. 무료 학습 자료, 동영상 강의, 창의체험 자료를 제공합니다.',
    },
    {
      title: '사이버 학습 (시·도교육청)',
      url: 'https://www.stu.dangi.or.kr',
      desc: '전국 시·도 교육청 운영 사이버 학습 서비스. 교과 학습 보충·심화 콘텐츠를 무료로 이용하세요.',
    },
  ],
};

const ACTIVITY_SITES: ResourceGroup = {
  heading: '방학 중 추천 체험 활동 & 견학 장소',
  items: [
    {
      title: '국립중앙박물관 어린이박물관',
      url: 'https://www.museum.go.kr/site/child/home',
      desc: '역사와 문화를 재미있게 체험할 수 있는 어린이 전용 박물관. 방학 특별 프로그램도 운영합니다.',
    },
    {
      title: '국립과천과학관',
      url: 'https://www.sciencecenter.go.kr',
      desc: '첨단 과학과 우주를 직접 체험하는 과학관. 천체 관측, 메이커 체험 등 다양한 교육 프로그램이 있습니다.',
    },
    {
      title: '국립민속박물관 어린이박물관',
      url: 'https://www.nfm.go.kr/kids',
      desc: '우리나라 전통 생활 문화를 어린이 눈높이에 맞게 체험할 수 있는 공간입니다.',
    },
    {
      title: '국립생태원',
      url: 'https://www.nie.re.kr',
      desc: '세계 5대 기후대의 생태계를 한곳에서 경험할 수 있는 생태 교육 공간입니다.',
    },
    {
      title: '지역 공공도서관 프로그램',
      url: 'https://www.library.kr',
      desc: '전국 공공도서관에서는 방학마다 독서·창의 체험 교실을 운영합니다. 가까운 도서관 프로그램을 확인해보세요.',
    },
  ],
};

const READING_RESOURCES: ResourceGroup = {
  heading: '초등학생 독서 활동 & 추천 자료',
  items: [
    {
      title: '국립중앙도서관 어린이·청소년 자료',
      url: 'https://www.nl.go.kr/kids',
      desc: '국립중앙도서관의 어린이 전용 페이지. 주제별 추천 도서 목록과 전자책을 무료로 이용할 수 있습니다.',
    },
    {
      title: '어린이 독서 토론 가이드 (책씨앗)',
      url: 'https://www.bookseed.kr',
      desc: '문화체육관광부 운영 독서 진흥 사이트. 연령별 추천 도서와 독서 활동지를 무료로 내려받을 수 있습니다.',
    },
    {
      title: '독서교육종합지원시스템 (DLS)',
      url: 'https://www.reading.or.kr',
      desc: '학교 도서관과 연계된 독서 기록 시스템. 방학 독서 일지를 작성하고 독서 이력을 관리할 수 있습니다.',
    },
  ],
};

const HEALTH_RESOURCES: ResourceGroup = {
  heading: '어린이 건강 & 생활 습관 가이드',
  items: [
    {
      title: '국가건강정보포털 — 어린이 건강',
      url: 'https://www.kdca.go.kr',
      desc: '질병관리청 제공. 어린이 영양, 신체 발달, 예방접종, 감염병 예방 등 건강 정보를 제공합니다.',
    },
    {
      title: '어린이 식품안전나라',
      url: 'https://www.foodsafetykorea.go.kr/kids',
      desc: '식품의약품안전처 어린이 식품 안전 포털. 건강한 식습관 형성을 위한 교육 자료가 풍부합니다.',
    },
    {
      title: '스마트쉼센터 (인터넷·스마트폰 과의존 예방)',
      url: 'https://www.iapc.or.kr',
      desc: '방학 중 스마트기기 과사용이 우려된다면 이 사이트에서 자가 진단과 예방 가이드를 활용하세요.',
    },
  ],
};

function LinkCard({ item }: { item: ResourceLink }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="res-card"
    >
      <div className="res-card-title">{item.title}</div>
      <p className="res-card-desc">{item.desc}</p>
      <span className="res-card-url">{item.url.replace('https://', '')}</span>
    </a>
  );
}

function ResourceSection({ group }: { group: ResourceGroup }) {
  return (
    <section className="res-section">
      <h2 className="res-h2">{group.heading}</h2>
      <div className="res-grid">
        {group.items.map((item) => (
          <LinkCard key={item.url} item={item} />
        ))}
      </div>
    </section>
  );
}

export function ResourcesPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero-title">📚 교육 자료</h1>
        <p className="page-hero-desc">
          초등학생 방학을 알차게 보내는 데 도움이 되는 공식 교육 기관, 체험 활동,
          독서, 건강 자료를 모았습니다.
        </p>
      </div>

      <div className="page-content resources-content">

        <ResourceSection group={OFFICIAL_SITES} />
        <ResourceSection group={ACTIVITY_SITES} />
        <ResourceSection group={READING_RESOURCES} />
        <ResourceSection group={HEALTH_RESOURCES} />

        {/* ── 방학 계획 시 참고할 교육 원칙 ──────── */}
        <section className="res-section res-editorial">
          <h2 className="res-h2">방학을 알차게 보내는 원칙 — 전문가 조언</h2>

          <h3 className="res-h3">규칙적인 생활이 뇌 발달을 돕습니다</h3>
          <p>
            아동 발달 심리학 연구에 따르면, 규칙적인 수면과 식사 시간은 어린이의 집중력과
            기억력 발달에 긍정적인 영향을 미칩니다. 방학 중에도 취침 시간을 학기 중과
            1시간 이내로 유지하고, 아침 식사를 거르지 않도록 지도하는 것이 중요합니다.
          </p>

          <h3 className="res-h3">놀이는 학습만큼 중요합니다</h3>
          <p>
            OECD 교육 보고서는 &ldquo;자유로운 놀이 시간은 어린이의 창의성, 사회성, 감정 조절
            능력을 발달시킨다&rdquo;고 강조합니다. 생활계획표에 반드시 <strong>구조화되지 않은
            자유 시간</strong>을 충분히 포함하세요. 지나치게 빽빽한 스케줄은 아이에게 스트레스를
            줄 수 있습니다.
          </p>

          <h3 className="res-h3">신체 활동 60분은 필수입니다</h3>
          <p>
            세계보건기구(WHO)와 국내 질병관리청은 만 5~17세 어린이·청소년에게 매일 최소
            60분의 중·고강도 신체 활동을 권고합니다. 뛰기, 자전거 타기, 수영, 줄넘기 등
            어떤 활동이든 좋습니다. 화면 앞에서 보내는 시간은 하루 2시간 이내로 제한하는
            것이 권장됩니다.
          </p>

          <h3 className="res-h3">독서 30분이 학력 격차를 줄입니다</h3>
          <p>
            한국교육개발원(KEDI) 연구에 따르면 방학 중 매일 30분 이상 자기 주도 독서를 실천한
            학생들은 그렇지 않은 학생들에 비해 학기 초 어휘력과 독해력 점수가 유의미하게
            높았습니다. 아이가 스스로 고른 책을 읽도록 격려해주세요.
          </p>

          <h3 className="res-h3">디지털 기기 사용 지침</h3>
          <p>
            방학에는 스마트폰·태블릿 사용 시간이 급격히 늘어나기 쉽습니다. 가족이 함께
            &ldquo;하루 스크린 타임&rdquo; 규칙을 정하고, 생활계획표에 명시해두면 합리적인 기기 관리가
            가능합니다. 취침 1시간 전에는 모든 디지털 기기를 끄는 습관이 수면의 질을 높이는
            데 효과적입니다.
          </p>
        </section>

        {/* ── 학부모 가이드 ────────────────────────── */}
        <section className="res-section res-editorial">
          <h2 className="res-h2">학부모를 위한 방학 지도 가이드</h2>

          <h3 className="res-h3">계획표 작성, 이렇게 도와주세요</h3>
          <p>
            아이에게 &ldquo;엄마·아빠랑 같이 이번 방학 계획표 만들어볼까?&rdquo;라고 말을 꺼내 보세요.
            계획표를 직접 만드는 과정에서 아이는 <strong>자기결정감</strong>을 경험하고,
            이를 실천하려는 내적 동기가 생깁니다. 부모님은 결과물보다 과정을 칭찬해주고,
            처음부터 완벽한 계획보다는 실현 가능한 계획에 집중할 수 있도록 안내해주세요.
          </p>

          <h3 className="res-h3">주 1회 계획표 점검 루틴 만들기</h3>
          <p>
            매주 일요일 저녁, 아이와 함께 한 주를 돌아보는 시간을 가져보세요. &ldquo;이번 주에
            가장 잘한 건 뭐야?&rdquo;, &ldquo;다음 주에는 뭘 바꿔볼까?&rdquo;처럼 긍정적인 질문으로
            대화를 시작하면 아이가 방어적이지 않고 솔직하게 이야기할 수 있습니다. 이 과정이
            쌓이면 아이의 <strong>메타인지와 자기 관리 능력</strong>이 자연스럽게 향상됩니다.
          </p>

          <h3 className="res-h3">잔소리 대신 환경을 바꿔주세요</h3>
          <p>
            계획대로 실천하지 못하는 아이에게 반복적으로 잔소리를 하기보다, 환경을 바꾸는 것이
            더 효과적입니다. 공부 공간과 놀이 공간을 구분하고, 계획표를 눈에 잘 띄는 곳에
            붙여두며, 스마트폰은 사용 시간 외에는 충전 공간(아이 방 밖)에 두는 것처럼
            행동을 유도하는 환경 설계가 도움이 됩니다.
          </p>
        </section>

      </div>
    </div>
  );
}
