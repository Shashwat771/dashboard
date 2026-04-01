import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';
import './DashboardPage.css';

/**
 * GlassmorphismPage
 * Dashboard template featuring modern glassmorphic design with animated gradients and blur effects
 */
export default function GlassmorphismPage() {
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
        templateType="glassmorphism"
      />
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Glassmorphism</h1>
        <p className="dashboard-page-description">
          Experience modern glassmorphic design with frosted glass cards, animated gradients, and smooth blur effects. 
          Upload your data for a futuristic dashboard.
        </p>
      </div>
      <FileUpload 
        onDashboardGenerated={handleDashboardGenerated}
        templateType="glassmorphism"
      />
    </div>
  );
}
