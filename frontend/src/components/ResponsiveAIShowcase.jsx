import React, { useState } from 'react';
import '../styles/ResponsiveShowcase.css';

/**
 * ResponsiveAIShowcase Component
 * 
 * Demonstrates how AI features adapt across all breakpoints:
 * - Mobile (320px - 480px): Stack vertical, single column, touch-friendly buttons
 * - Tablet (481px - 768px): 2-column layout, optimized spacing
 * - Laptop (769px+): Full multi-column grid, expanded interfaces
 */

export const ResponsiveAIShowcase = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [selectedCharts, setSelectedCharts] = useState([]);

  // Mock data for demonstration
  const mockInsights = {
    trends: [
      { label: 'Revenue Growth', value: '+23.5%', change: 'up', confidence: 0.94 },
      { label: 'User Engagement', value: '+18.2%', change: 'up', confidence: 0.87 },
      { label: 'Cost Reduction', value: '-12.3%', change: 'down', confidence: 0.91 },
    ],
    predictions: [
      { metric: 'Next Month Revenue', forecast: '$450K', range: '$420K - $480K' },
      { metric: 'User Churn', forecast: '3.2%', range: '2.8% - 3.8%' },
    ],
    summary: 'Your business shows strong upward momentum with a projected 28% growth in Q3. Customer acquisition costs are down while engagement metrics remain high.',
  };

  const mockCharts = [
    { id: 1, title: 'Revenue Trend', type: 'line', dimensions: '2D' },
    { id: 2, title: 'Category Distribution', type: 'pie', dimensions: '2D' },
    { id: 3, title: 'Sales by Region', type: 'bar', dimensions: '2D' },
    { id: 4, title: 'Customer Lifetime Value', type: 'scatter', dimensions: '2D' },
  ];

  const toggleChartSelection = (chartId) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId) ? prev.filter((id) => id !== chartId) : [...prev, chartId]
    );
  };

  return (
    <div className="rds-container">
      {/* RESPONSIVE HEADER */}
      <header className="rds-header">
        <div className="rds-header-content">
          <h1 className="rds-logo">DataViz AI</h1>
          <nav className="rds-nav">
            <a href="#" className="rds-nav-link">Insights</a>
            <a href="#" className="rds-nav-link">Query</a>
            <a href="#" className="rds-nav-link">Export</a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="rds-main">
        {/* RESPONSIVE TABS - Horizontal on desktop, scrollable on mobile */}
        <div className="rds-tabs">
          <button
            className={`rds-tab ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            AI Insights
          </button>
          <button
            className={`rds-tab ${activeTab === 'query' ? 'active' : ''}`}
            onClick={() => setActiveTab('query')}
          >
            NL Query
          </button>
          <button
            className={`rds-tab ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            Export
          </button>
        </div>

        {/* CONTENT PANELS - Responsive layout adapts by screen size */}
        <div className="rds-content">
          {/* INSIGHTS PANEL */}
          {activeTab === 'insights' && (
            <div className="rds-panel">
              <div className="rds-panel-header">
                <h2>AI-Powered Insights</h2>
                <p className="rds-subtitle">Trends, predictions & actionable recommendations</p>
              </div>

              {/* RESPONSIVE GRID - 1 column mobile, 3 columns desktop */}
              <div className="rds-insights-grid">
                {/* TRENDS SECTION */}
                <section className="rds-insights-section">
                  <h3 className="rds-section-title">Key Trends</h3>
                  <div className="rds-trends-list">
                    {mockInsights.trends.map((trend, idx) => (
                      <div key={idx} className="rds-trend-item">
                        <div className="rds-trend-header">
                          <span className="rds-trend-label">{trend.label}</span>
                          <span className={`rds-trend-badge ${trend.change}`}>
                            {trend.value}
                          </span>
                        </div>
                        <div className="rds-confidence-bar">
                          <div
                            className="rds-confidence-fill"
                            style={{ width: `${trend.confidence * 100}%` }}
                          />
                        </div>
                        <span className="rds-confidence-text">
                          {(trend.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PREDICTIONS SECTION */}
                <section className="rds-insights-section">
                  <h3 className="rds-section-title">Predictions</h3>
                  <div className="rds-predictions-list">
                    {mockInsights.predictions.map((pred, idx) => (
                      <div key={idx} className="rds-prediction-card">
                        <p className="rds-pred-metric">{pred.metric}</p>
                        <p className="rds-pred-forecast">{pred.forecast}</p>
                        <p className="rds-pred-range">{pred.range}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SUMMARY SECTION */}
                <section className="rds-insights-section">
                  <h3 className="rds-section-title">Summary</h3>
                  <div className="rds-summary-box">
                    <p>{mockInsights.summary}</p>
                    <button className="rds-action-btn rds-btn-primary">
                      View Detailed Report
                    </button>
                  </div>
                </section>
              </div>

              {/* MOBILE ACTION BUTTON - Only visible on mobile */}
              <button className="rds-mobile-action-btn">
                Regenerate Insights
              </button>
            </div>
          )}

          {/* NATURAL LANGUAGE QUERY PANEL */}
          {activeTab === 'query' && (
            <div className="rds-panel">
              <div className="rds-panel-header">
                <h2>Natural Language Query</h2>
                <p className="rds-subtitle">Ask questions like &quot;Show sales in 2023&quot;</p>
              </div>

              {/* QUERY INPUT - Responsive width and touch-friendly */}
              <div className="rds-query-section">
                <div className="rds-query-input-wrapper">
                  <input
                    type="text"
                    className="rds-query-input"
                    placeholder="Ask me anything about your data..."
                  />
                  <button className="rds-query-submit">
                    <span className="rds-icon">→</span>
                  </button>
                </div>

                {/* SMART SUGGESTIONS - Stack on mobile, inline on desktop */}
                <div className="rds-suggestions">
                  <p className="rds-suggestions-label">Try asking:</p>
                  <div className="rds-suggestions-grid">
                    <button className="rds-suggestion-chip">
                      Show Q2 revenue
                    </button>
                    <button className="rds-suggestion-chip">
                      Compare regions
                    </button>
                    <button className="rds-suggestion-chip">
                      Year-over-year growth
                    </button>
                  </div>
                </div>

                {/* MATCHED CHARTS - Responsive card grid */}
                <div className="rds-matched-section">
                  <h3>Matching Charts</h3>
                  <div className="rds-charts-grid">
                    {mockCharts.slice(0, 2).map((chart) => (
                      <div key={chart.id} className="rds-chart-card">
                        <div className="rds-chart-placeholder">
                          <span>{chart.type.toUpperCase()} CHART</span>
                        </div>
                        <p className="rds-chart-title">{chart.title}</p>
                        <button className="rds-action-btn rds-btn-secondary">
                          View Chart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXPORT PANEL */}
          {activeTab === 'export' && (
            <div className="rds-panel">
              <div className="rds-panel-header">
                <h2>Export Charts</h2>
                <p className="rds-subtitle">Download as PNG or PDF</p>
              </div>

              {/* EXPORT OPTIONS - Stacked buttons on mobile */}
              <div className="rds-export-section">
                <div className="rds-export-options">
                  <button className="rds-export-option">
                    <span className="rds-export-icon">📊</span>
                    <span>PNG (2x Resolution)</span>
                  </button>
                  <button className="rds-export-option">
                    <span className="rds-export-icon">📄</span>
                    <span>PDF Report</span>
                  </button>
                </div>

                {/* CHARTS SELECTION - Multi-select, responsive grid */}
                <div className="rds-select-section">
                  <h3>Select Charts to Export</h3>
                  <div className="rds-charts-select-grid">
                    {mockCharts.map((chart) => (
                      <label key={chart.id} className="rds-chart-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedCharts.includes(chart.id)}
                          onChange={() => toggleChartSelection(chart.id)}
                        />
                        <span className="rds-checkbox-box" />
                        <span className="rds-checkbox-label">{chart.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* EXPORT PREVIEW - Responsive preview card */}
                {selectedCharts.length > 0 && (
                  <div className="rds-export-preview">
                    <h3>Export Preview</h3>
                    <p className="rds-preview-info">
                      Ready to export {selectedCharts.length} chart(s)
                    </p>
                    <button className="rds-action-btn rds-btn-primary rds-btn-large">
                      Download ({selectedCharts.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* RESPONSIVE FOOTER */}
      <footer className="rds-footer">
        <p>&copy; 2024 DataViz AI. All responsive breakpoints optimized.</p>
      </footer>
    </div>
  );
};

export default ResponsiveAIShowcase;
