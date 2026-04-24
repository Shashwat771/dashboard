import React, { useState } from 'react';
import '../styles/EnhancedInsights.css';

const EnhancedInsights = ({ insights }) => {
  const [activeTab, setActiveTab] = useState('statistical');

  if (!insights || Object.keys(insights).length === 0) {
    return null;
  }

  // Icon mapping for different insight types
  const iconMap = {
    'alert-circle': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    'trending-up': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    'bar-chart-2': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    'link-2': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    'star': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 10.26 23.77 11.27 17.88 17.07 19.24 25.72 12 21.77 4.76 25.72 6.12 17.07 0.22 11.27 8.9 10.26" />
      </svg>
    ),
    'target': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="1" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="9" />
      </svg>
    ),
    'trending-down': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    'pie-chart': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 1 1 8.11 2.79" /><line x1="22" y1="12" x2="12" y2="12" />
      </svg>
    ),
    'zap': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    'activity': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    'alert-triangle': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.04h16.94a2 2 0 0 0 1.71-3.04l-8.47-14.14a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    'shield': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    'lightbulb': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  };

  const getSeverityClass = (severity) => {
    return {
      success: 'success',
      warning: 'warning',
      info: 'info',
    }[severity] || 'info';
  };

  const renderInsightCard = (insight) => (
    <div key={insight.id} className={`insight-card insight-${getSeverityClass(insight.severity)}`}>
      <div className="insight-header">
        <div className="insight-icon">{iconMap[insight.icon] || iconMap['lightbulb']}</div>
        <div className="insight-meta">
          <h4 className="insight-title">{insight.title}</h4>
          <span className={`insight-badge insight-badge-${getSeverityClass(insight.severity)}`}>
            {insight.type.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>
      <p className="insight-description">{insight.description}</p>
    </div>
  );

  const tabs = [
    { id: 'statistical', label: 'Statistical', icon: '📊', count: insights.statistical?.length || 0 },
    { id: 'business', label: 'Business', icon: '💼', count: insights.business?.length || 0 },
    { id: 'predictive', label: 'Predictive', icon: '🔮', count: insights.predictive?.length || 0 },
  ];

  const currentInsights = insights[activeTab] || [];

  return (
    <section className="enhanced-insights-section">
      {/* Header */}
      <div className="insights-section-header">
        <div className="insights-title-group">
          <div className="insights-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 6v6m3-3H9" />
            </svg>
            <span>AI-POWERED INSIGHTS</span>
          </div>
          <h2 className="insights-main-title">Comprehensive Data Analysis</h2>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="insights-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`insights-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* Insights Content */}
      <div className="insights-content">
        {currentInsights.length > 0 ? (
          <div className="insights-grid">
            {currentInsights.map((insight) => renderInsightCard(insight))}
          </div>
        ) : (
          <div className="insights-empty">
            <p>No insights available for this category</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="insights-summary">
        <div className="summary-stat">
          <span className="stat-label">Total Insights</span>
          <span className="stat-value">
            {(insights.statistical?.length || 0) + (insights.business?.length || 0) + (insights.predictive?.length || 0)}
          </span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Critical Alerts</span>
          <span className="stat-value">
            {[...((insights.statistical || [])), ...(insights.business || []), ...(insights.predictive || [])].filter((i) => i.severity === 'warning').length}
          </span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Success Metrics</span>
          <span className="stat-value">
            {[...(insights.statistical || []), ...(insights.business || []), ...(insights.predictive || [])].filter((i) => i.severity === 'success').length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default EnhancedInsights;
