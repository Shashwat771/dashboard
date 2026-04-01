import React, { useState, useRef, useEffect } from 'react';
import '../styles/AIFeatures.css';

const NLQueryBox = ({ 
  charts = [],
  columns = [],
  data = [],
  onQueryResult = () => {},
  onGenerateChart = () => {}
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const queryInputRef = useRef(null);

  const suggestions = [
    'Show sales by region',
    'Compare revenue over time',
    'What are the top products?',
    'Analyze customer demographics',
    'Identify trends in the data',
  ];

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('nlQueryHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveToHistory = (q) => {
    const updated = [q, ...history.filter(h => h !== q)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('nlQueryHistory', JSON.stringify(updated));
  };

  const processQuery = async (queryText) => {
    if (!queryText.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dashboard/nl-query`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: queryText,
            charts: charts || [],
            columns: columns || [],
            data: data || [],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process query');
      }

      const result = await response.json();
      setResult(result.queryResult);
      saveToHistory(queryText);
      onQueryResult(result.queryResult);

      console.log('[v0] Query result:', result.queryResult);

      // If a new chart is suggested, offer to generate it
      if (result.queryResult.suggestedChart && result.queryResult.suggestedChart.type) {
        generateNewChart(queryText, result.queryResult.suggestedChart);
      }
    } catch (err) {
      setError(err.message);
      console.error('[v0] Query error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateNewChart = async (queryText, suggestedChart) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dashboard/chart-from-query`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: queryText,
            columns: columns || [],
            data: data || [],
            analysis: {},
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate chart');
      }

      const chartResult = await response.json();
      onGenerateChart(chartResult.chartConfig);
      console.log('[v0] New chart generated:', chartResult.chartConfig);
    } catch (err) {
      console.error('[v0] Chart generation error:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processQuery(query);
    setQuery('');
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    queryInputRef.current?.focus();
  };

  const selectHistory = (item) => {
    setQuery(item);
    setShowSuggestions(false);
    queryInputRef.current?.focus();
  };

  return (
    <div className="nl-query-box">
      <div className="nlq-container">
        <form onSubmit={handleSubmit} className="nlq-form">
          <div className="nlq-input-wrapper">
            <svg className="nlq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              ref={queryInputRef}
              type="text"
              className="nlq-input"
              placeholder="Try: 'Show sales in 2023' or 'Compare by region'"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              disabled={loading}
            />
            <button 
              type="submit" 
              className="nlq-submit"
              disabled={!query.trim() || loading}
              title="Submit query"
            >
              {loading ? (
                <span className="nlq-spinner"></span>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 12l14 7V5l-14 7z"></path>
                </svg>
              )}
            </button>
          </div>

          {showSuggestions && !loading && (
            <div className="nlq-suggestions">
              {history.length > 0 && (
                <div className="nlq-suggestion-group">
                  <div className="nlq-suggestion-label">Recent</div>
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="nlq-suggestion-item history"
                      onClick={() => selectHistory(item)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {item}
                    </button>
                  ))}
                </div>
              )}

              <div className="nlq-suggestion-group">
                <div className="nlq-suggestion-label">Suggestions</div>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="nlq-suggestion-item"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {error && (
          <div className="nlq-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        {result && !loading && (
          <div className="nlq-result">
            <div className="nlr-interpretation">
              <strong>Query:</strong> {result.interpretation}
            </div>

            {result.matchingCharts?.length > 0 && (
              <div className="nlr-matches">
                <strong>Matching Charts:</strong>
                <div className="nlr-charts">
                  {result.matchingCharts.map((match, idx) => (
                    <div key={idx} className="nlr-chart-match">
                      <div className="nlr-chart-title">{match.chartId}</div>
                      <div className="nlr-chart-relevance">
                        <div className="nlr-rel-bar">
                          <div style={{width: `${match.relevance}%`}}></div>
                        </div>
                        <span>{match.relevance}% match</span>
                      </div>
                      <p className="nlr-chart-reason">{match.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.suggestedChart && (
              <div className="nlr-suggested">
                <strong>Suggested Chart:</strong>
                <div className="nlr-suggested-card">
                  <div className="nlr-suggested-title">{result.suggestedChart.title}</div>
                  <p className="nlr-suggested-desc">{result.suggestedChart.description}</p>
                  <span className="nlr-suggested-type">{result.suggestedChart.type}</span>
                </div>
              </div>
            )}

            {result.followUpQuestion && (
              <p className="nlr-followup">
                <em>💡 {result.followUpQuestion}</em>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NLQueryBox;
