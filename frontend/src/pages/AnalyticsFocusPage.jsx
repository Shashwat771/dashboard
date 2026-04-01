import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';
import './DashboardPage.css';

/**
 * AnalyticsFocusPage
 * Dashboard template focused on detailed analytics with metric rows and comparisons
 */
export default function AnalyticsFocusPage() {
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
        templateType="analytics-focus"
      />
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Analytics Focus</h1>
        <p className="dashboard-page-description">
          Dive deep into detailed analytics with metric rows, comparisons, and trend analysis. 
          Upload your data to explore insights.
        </p>
      </div>
      <FileUpload 
        onDashboardGenerated={handleDashboardGenerated}
        templateType="analytics-focus"
      />
    </div>
  );
}
