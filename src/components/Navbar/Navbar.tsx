import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NAV_ITEMS = [
  { to: '/', label: '🏠 홈', end: true },
  { to: '/guide', label: '📖 사용 가이드', end: false },
  { to: '/columns', label: '🗞️ 칼럼', end: false },
  { to: '/resources', label: '📚 교육 자료', end: false },
  { to: '/policies', label: '🛡️ 정책', end: false },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar" role="navigation" aria-label="주 메뉴">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <img className="navbar-brand-logo" src="/timetable_logo.png" alt="" aria-hidden="true" />
          <span className="navbar-brand-text">방학 생활계획표</span>
        </NavLink>

        <button
          className={`navbar-toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>

        <ul className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`} role="list">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' navbar-link--active' : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
