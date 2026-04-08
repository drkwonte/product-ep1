import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './AppFooter.css';

const CURRENT_YEAR = new Date().getFullYear();

export function AppFooter() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="app-footer">
        <div className="app-footer-inner">
          <p className="app-footer-about">
            <strong>방학 생활계획표 짜기</strong>는 초등학생이 방학 동안 하루 일과를 스스로 계획하고
            꾸밀 수 있도록 돕는 무료 웹 도구입니다.
          </p>
          <nav className="app-footer-links">
            <button className="app-footer-link" onClick={() => setShowPrivacy(true)}>
              개인정보처리방침
            </button>
            <Link className="app-footer-link" to="/policies">
              편집·면책·저작권
            </Link>
            <a
              className="app-footer-link"
              href="mailto:drkwonte@gmail.com"
            >
              문의하기
            </a>
          </nav>
          <p className="app-footer-copy">© {CURRENT_YEAR} 방학 생활계획표 짜기. All rights reserved.</p>
        </div>
      </footer>

      {showPrivacy &&
        ReactDOM.createPortal(
          <div className="privacy-overlay" onClick={() => setShowPrivacy(false)}>
            <div
              className="privacy-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="privacy-header">
                <h2 id="privacy-title" className="privacy-title">개인정보처리방침</h2>
                <button
                  className="privacy-close"
                  onClick={() => setShowPrivacy(false)}
                  aria-label="닫기"
                >
                  ✕
                </button>
              </div>

              <div className="privacy-body">
                <p className="privacy-updated">최종 수정일: 2026년 3월 15일</p>

                <h3>1. 수집하는 정보</h3>
                <p>
                  본 서비스는 회원가입이나 로그인을 요구하지 않으며, 이름·이메일 등 개인 식별
                  정보를 수집하지 않습니다. 사용자가 입력한 계획표 데이터(활동 목록, 스티커,
                  이름)는 사용자 기기의 <strong>localStorage</strong>에만 저장되며 외부 서버로
                  전송되지 않습니다.
                </p>

                <h3>2. 제3자 서비스 및 쿠키</h3>
                <p>본 사이트는 아래 제3자 서비스를 사용합니다.</p>

                <h4>Google AdSense</h4>
                <p>
                  본 사이트는 <strong>Google AdSense</strong>를 통해 광고를 제공합니다. Google은
                  쿠키를 사용해 사용자의 이전 방문 기록을 바탕으로 관심 기반 광고를 게재합니다.
                  Google의 광고 쿠키 사용을 원하지 않으시면{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google 광고 설정
                  </a>
                  에서 opt-out 하실 수 있습니다. 또한{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.aboutads.info
                  </a>
                  를 방문하면 제3자 광고 쿠키 비활성화에 대한 안내를 받으실 수 있습니다.
                </p>

                <h4>Disqus (댓글 시스템)</h4>
                <p>
                  댓글 기능은 <strong>Disqus</strong>를 통해 제공됩니다. Disqus는 자체 개인정보
                  처리방침에 따라 데이터를 처리합니다.{' '}
                  <a
                    href="https://help.disqus.com/en/articles/1717103-disqus-privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Disqus 개인정보처리방침 보기
                  </a>
                </p>

                <h3>3. 쿠키 정책</h3>
                <p>
                  본 서비스 자체는 쿠키를 사용하지 않습니다. 다만 Google AdSense 및 Disqus 등
                  제3자 서비스가 해당 서비스 운영을 위해 쿠키를 사용할 수 있습니다. 브라우저
                  설정에서 쿠키를 비활성화할 수 있으나, 일부 기능이 제한될 수 있습니다.
                </p>

                <h3>4. 어린이 개인정보 보호</h3>
                <p>
                  본 서비스는 초등학생을 주요 이용 대상으로 하며, 만 14세 미만 아동의 개인정보를
                  의도적으로 수집하지 않습니다. 보호자 동의 없이 개인정보가 수집되었다고 판단될
                  경우 아래 연락처로 문의하여 주십시오.
                </p>

                <h3>5. 문의</h3>
                <p>
                  개인정보 처리와 관련한 문의는{' '}
                  <a href="mailto:drkwonte@gmail.com">drkwonte@gmail.com</a> 으로 연락해 주세요.
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
