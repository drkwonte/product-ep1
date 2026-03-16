import { ContentGuide } from '../components/ContentGuide/ContentGuide';
import './PageLayout.css';

export function GuidePage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero-title">📖 사용 가이드</h1>
        <p className="page-hero-desc">
          방학 생활계획표 짜기를 100% 활용하는 방법과 알찬 방학을 보내기 위한 팁을 안내합니다.
        </p>
      </div>

      <div className="page-content">
        {/* 기존 ContentGuide 컴포넌트 재사용 */}
        <ContentGuide />

        {/* ── 추가 콘텐츠: 인쇄 & 저장 팁 ─────────── */}
        <article className="content-guide">
          <section className="cg-section">
            <h2 className="cg-h2">인쇄 & 저장 꿀팁</h2>

            <h3 className="cg-h3">깔끔하게 인쇄하는 방법</h3>
            <p>
              브라우저의 <strong>인쇄 미리보기</strong>에서 <em>여백 없음(Margins: None)</em>으로
              설정하면 A4 용지에 꼭 맞게 출력됩니다. Chrome 브라우저 사용 시 인쇄 설정에서
              &ldquo;배경 그래픽&rdquo; 옵션을 켜야 색상이 함께 인쇄됩니다.
            </p>

            <h3 className="cg-h3">JPG로 저장 후 활용하기</h3>
            <p>
              &ldquo;JPG 저장&rdquo; 버튼으로 내려받은 이미지는 카카오톡·밴드 등으로 공유하거나,
              편의점 포토 프린트 서비스를 이용해 더 빠르고 선명하게 출력할 수 있습니다.
              A4 또는 L(엽서) 사이즈로 인화하면 보기 좋은 계획표가 완성됩니다.
            </p>

            <h3 className="cg-h3">계획표를 오래 보존하는 방법</h3>
            <p>
              인쇄한 계획표를 코팅하거나 클리어 파일에 넣어 냉장고·책상 앞에 붙이면 훨씬
              오래 사용할 수 있습니다. 완성된 계획표 이미지를 가족 단체 채팅방에 공유하면
              가족 모두가 어린이의 일정을 확인하고 응원할 수 있습니다.
            </p>
          </section>

          <section className="cg-section">
            <h2 className="cg-h2">흔히 하는 실수와 해결 방법</h2>

            <h3 className="cg-h3">활동이 겹쳐서 저장이 안 돼요</h3>
            <p>
              이 앱은 같은 시간에 두 가지 활동이 겹치는 것을 자동으로 막습니다. 이미 등록된
              활동의 시간 범위와 겹치면 빨간 오류 메시지가 표시됩니다. 겹치는 기존 활동을
              먼저 수정하거나 삭제한 뒤 다시 추가해보세요.
            </p>

            <h3 className="cg-h3">자정을 넘어가는 활동은 어떻게 추가하나요?</h3>
            <p>
              예를 들어 밤 10시부터 아침 7시까지의 수면을 추가하려면, 시계의 10시 부분에서
              드래그를 시작해 7시 방향으로 <strong>시계 방향</strong>으로 쭉 드래그하면 됩니다.
              자정을 넘어가는 구간도 정확하게 선택됩니다.
            </p>

            <h3 className="cg-h3">스티커가 계획표 영역 밖에 붙어요</h3>
            <p>
              스티커는 점선으로 표시된 A4 출력 영역 안에 붙이는 것이 좋습니다. 영역 밖에 붙은
              스티커는 JPG 저장이나 인쇄 시 잘릴 수 있습니다. 스티커를 선택한 뒤 드래그해서
              영역 안으로 이동시킬 수 있습니다.
            </p>

            <h3 className="cg-h3">계획표가 사라졌어요</h3>
            <p>
              이 앱은 같은 기기·브라우저의 저장 공간(localStorage)에 데이터를 보관합니다.
              브라우저의 인터넷 사용 기록 삭제(캐시 포함) 또는 다른 기기·브라우저 접속 시
              데이터가 유지되지 않습니다. 중요한 계획표는 JPG로 저장해두는 습관을 들이세요.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
