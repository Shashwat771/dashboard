import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';

export default function PerformanceMetricsPage() {
  const [dashboardData, setDashboardData] = useState(null);

  return (
    <div>
      {!dashboardData ? (
        <div style={{ padding: '40px 20px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', margin: '0 0 12px 0' }}>Performance Metrics Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Upload your data to create a performance-tracking dashboard with bold colors and gauges</p>
          </div>
          <FileUpload 
            onDashboardGenerated={setDashboardData}
            templateType="performance-metrics"
          />
        </div>
      ) : (
        <Dashboard 
          dashboardData={dashboardData} 
          onBackClick={() => setDashboardData(null)}
          templateType="performance-metrics"
        />
      )}
    </div>
  );
}
