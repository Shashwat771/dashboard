import React, { useState } from 'react';
import '../styles/AIFeatures.css';

const AIInsightsPanel = ({ 
  data = [], 
  columns = [], 
  analysis = {}, 
  charts = [],
  onClose = () => {} 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('trends');

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dashboard/insights`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data,
            columns,
            analysis,
            charts: charts || [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const result = await response.json();
      setInsights(result.insightsReport);
      console.log('[v0] Insights generated:', result.insightsReport);
    } catch (err) {
      setError(err.message);
      console.error('[v0] Insights error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-insights-panel">
      <div className="aip-header">
        <h2>AI Insights</h2>
        <button className="aip-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {!insights ? (
        <div className="aip-empty">
          <div className="aip-icon">🤖</div>
          <h3>Generate AI Insights</h3>
          <p>Click the button below to analyze your data and get actionable insights</p>
          
          <button 
            className="aip-generate-btn" 
            onClick={generateInsights}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="aip-spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                <span>⚡</span>
                Generate Insights
              </>
            )}
          </button>

          {error && (
            <div className="aip-error">
              <span>❌</span>
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="aip-content">
          <div className="aip-tabs">
            <button 
              className={`aip-tab ${activeTab === 'trends' ? 'active' : ''}`}
              onClick={() => setActiveTab('trends')}
            >
              📈 Trends
            </button>
            <button 
              className={`aip-tab ${activeTab === 'predictions' ? 'active' : ''}`}
              onClick={() => setActiveTab('predictions')}
            >
              🔮 Predictions
            </button>
            <button 
              className={`aip-tab ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              📊 Summary
            </button>
          </div>

          <div className="aip-body">
            {activeTab === 'trends' && (
              <div className="aip-section">
                {insights.trends?.length > 0 ? (
                  insights.trends.map((trend, idx) => (
                    <div key={idx} className="aip-card">
                      <div className="aip-card-header">
                        <h4>{trend.title}</h4>
                        <span className={`aip-impact impact-${trend.impact}`}>
                          {trend.impact === 'positive' ? '📈' : trend.impact === 'negative' ? '📉' : '➡️'}
                        </span>
                      </div>
                      <p className="aip-card-desc">{trend.description}</p>
                      <div className="aip-confidence">
                        <span>Confidence:</span>
                        <div className="aip-bar">
                          <div className="aip-fill" style={{width: `${trend.confidence}%`}}></div>
                        </div>
                        <span>{trend.confidence}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="aip-placeholder">No trends identified</p>
                )}
              </div>
            )}

            {activeTab === 'predictions' && (
              <div className="aip-section">
                {insights.predictions?.length > 0 ? (
                  insights.predictions.map((pred, idx) => (
                    <div key={idx} className="aip-card">
                      <div className="aip-card-header">
                        <h4>{pred.title}</h4>
                        <span className={`aip-risk risk-${pred.riskLevel}`}>
                          {pred.riskLevel === 'low' ? '🟢' : pred.riskLevel === 'medium' ? '🟡' : '🔴'}
                        </span>
                      </div>
                      <p className="aip-card-desc"><strong>Forecast:</strong> {pred.forecast}</p>
                      <p className="aip-card-desc"><strong>Timeframe:</strong> {pred.timeframe}</p>
                    </div>
                  ))
                ) : (
                  <p className="aip-placeholder">No predictions available</p>
                )}
              </div>
            )}

            {activeTab === 'summary' && (
              <div className="aip-section">
                <div className="aip-summary">
                  <p>{insights.summary}</p>
                </div>

                {insights.recommendations && (
                  <div className="aip-recommendations">
                    <h4>💡 Recommendations</h4>
                    <ul>
                      {insights.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {insights.keyMetrics && (
                  <div className="aip-metrics">
                    <h4>📊 Key Metrics</h4>
                    <div className="aip-metrics-grid">
                      {Object.entries(insights.keyMetrics).map(([key, value]) => (
                        <div key={key} className="aip-metric-item">
                          <span className="aip-metric-label">{key}</span>
                          <span className="aip-metric-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            className="aip-regenerate-btn"
            onClick={generateInsights}
            disabled={loading}
          >
            {loading ? 'Regenerating...' : '🔄 Regenerate'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;
