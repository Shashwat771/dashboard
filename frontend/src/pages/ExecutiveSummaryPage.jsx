import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';

export default function ExecutiveSummaryPage() {
  const [dashboardData, setDashboardData] = useState(null);

  return (
    <div>
      {!dashboardData ? (
        <div style={{ padding: '40px 20px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', margin: '0 0 12px 0' }}>Executive Summary Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Upload your data to create an executive-focused dashboard with cyan glow effects and KPI cards</p>
          </div>
          <FileUpload 
            onDashboardGenerated={setDashboardData}
            templateType="executive-summary"
          />
        </div>
      ) : (
        <Dashboard 
          dashboardData={dashboardData} 
          onBackClick={() => setDashboardData(null)}
          templateType="executive-summary"
        />
      )}
    </div>
  );
}
