import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';
import './DashboardPage.css';

/**
 * MinimalCleanPage
 * Dashboard template with minimalist design, elegant typography, and refined spacing
 */
export default function MinimalCleanPage() {
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
        templateType="minimal-clean"
      />
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Minimal Clean</h1>
        <p className="dashboard-page-description">
          Experience minimalist design with elegant typography, refined spacing, and distraction-free layout. 
          Upload your data to see beautifully presented metrics.
        </p>
      </div>
      <FileUpload 
        onDashboardGenerated={handleDashboardGenerated}
        templateType="minimal-clean"
      />
    </div>
  );
}
