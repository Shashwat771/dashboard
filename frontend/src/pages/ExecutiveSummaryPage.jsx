import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';
import './DashboardPage.css';

/**
 * ExecutiveSummaryPage
 * Dashboard template focused on high-level business metrics with cyan glow effects
 */
export default function ExecutiveSummaryPage() {
  const [dashboardData, setDashboardData] = useState(null);

  const handleDashboardGenerated = (data) => {
    setDashboardData(data);
  };

  const handleBackClick = () => {
    setDashboardData(null);
  };

  if (dashboardData) {
    return (
      <Dashboard 
        dashboardData={dashboardData} 
        onBackClick={handleBackClick}
        templateType="executive-summary"
      />
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Executive Summary</h1>
        <p className="dashboard-page-description">
          Visualize high-level business metrics with professional KPI cards and cyan glow effects. 
          Upload your data to get started.
        </p>
      </div>
      <FileUpload 
        onDashboardGenerated={handleDashboardGenerated}
        templateType="executive-summary"
      />
    </div>
  );
}
