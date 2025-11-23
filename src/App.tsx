import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KpiDashboardPage from './pages/KpiDashboardPage';
import HeatmapPage from './pages/HeatmapPage';
import WorkshopPage from './pages/WorkshopPage';

/**
 * The top-level component defines the client-side routes for the application.
 */
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kpi" element={<KpiDashboardPage />} />
      <Route path="/heatmap" element={<HeatmapPage />} />
      <Route path="/workshop" element={<WorkshopPage />} />
    </Routes>
  );
};

export default App;