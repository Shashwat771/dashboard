import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';
import './DashboardPage.css';

/**
 * PerformanceMetricsPage
 * Dashboard template for performance tracking with bold colors, gauges, and dynamic visualizations
 */
export default function PerformanceMetricsPage() {
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
        templateType="performance-metrics"
      />
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">Performance Metrics</h1>
        <p className="dashboard-page-description">
          Track performance with bold visualizations, gauges, and dynamic indicators. 
          Upload your data to monitor key metrics in real-time.
        </p>
      </div>
      <FileUpload 
        onDashboardGenerated={handleDashboardGenerated}
        templateType="performance-metrics"
      />
    </div>
  );
}
