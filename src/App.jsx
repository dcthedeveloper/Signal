import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Analysis from './pages/Analysis';
import Calendar from './pages/Calendar';
import Assistant from './pages/Assistant';
import WhatIf from './pages/WhatIf';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="what-if" element={<WhatIf />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
