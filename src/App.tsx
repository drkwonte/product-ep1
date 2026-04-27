import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { AppFooter } from './components/AppFooter/AppFooter';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ColumnsPage } from './pages/ColumnsPage';
import { ColumnDetailPage } from './pages/ColumnDetailPage';
import { PoliciesPage } from './pages/PoliciesPage';
import './App.css';

const ADSENSE_CLIENT = 'ca-pub-9342204830254267';
const ADSENSE_SCRIPT_ID = 'adsense-script';

function AppShell() {
  useEffect(() => {
    // 로컬/개발 환경에서 광고 스크립트가 403을 내는 경우가 많아서 production에서만 로드
    if (!import.meta.env.PROD) return;
    if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/columns" element={<ColumnsPage />} />
          <Route path="/columns/:id" element={<ColumnDetailPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
        </Routes>
      </div>
      <AppFooter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
