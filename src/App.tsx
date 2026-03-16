import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { AppFooter } from './components/AppFooter/AppFooter';
import { HomePage } from './pages/HomePage';
import { GuidePage } from './pages/GuidePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ColumnsPage } from './pages/ColumnsPage';
import { ColumnDetailPage } from './pages/ColumnDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/columns" element={<ColumnsPage />} />
          <Route path="/columns/:id" element={<ColumnDetailPage />} />
        </Routes>
      </div>
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
