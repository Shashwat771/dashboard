/**
 * INTEGRATION EXAMPLE
 * 
 * This file shows how to integrate the AI features into your Dashboard component.
 * Copy relevant sections into your Dashboard.jsx file.
 * 
 * Features integrated:
 * - AI Insights Panel (generate insights with one click)
 * - Natural Language Query Box (ask questions about data)
 * - Chart Exporter (download charts as PNG/PDF)
 */

import React, { useState, useRef, useEffect } from 'react';
import AIInsightsPanel from './components/AIInsightsPanel';
import NLQueryBox from './components/NLQueryBox';
import ChartExporter from './components/ChartExporter';

const DashboardWithAIFeatures = ({
  data = [],
  columns = [],
  analysis = {},
  charts = [],
  setCharts = () => {},
  edaResult = null,
}) => {
  // ───────────────────────────────────────────────────────────────────────────
  // AI FEATURES STATE
  // ───────────────────────────────────────────────────────────────────────────
  
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [aiGeneratedCharts, setAiGeneratedCharts] = useState([]);
  const [chartRefs, setChartRefs] = useState({});
  const [newChartFromQuery, setNewChartFromQuery] = useState(null);

  // ───────────────────────────────────────────────────────────────────────────
  // HANDLERS FOR AI FEATURES
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Handle when NL Query suggests or generates a new chart
   */
  const handleGenerateChartFromQuery = (chartConfig) => {
    console.log('[v0] New chart from query:', chartConfig);
    
    // Create unique ID for new chart
    const newChart = {
      ...chartConfig,
      id: `query-chart-${Date.now()}`,
      isGeneratedFromQuery: true,
    };

    setNewChartFromQuery(newChart);
    setAiGeneratedCharts([...aiGeneratedCharts, newChart]);
    
    // Optionally add to main charts
    if (setCharts) {
      setCharts([...charts, newChart]);
    }

    // Show success message
    console.log('[v0] Chart added to dashboard from query');
  };

  /**
   * Handle query results
   */
  const handleQueryResult = (result) => {
    console.log('[v0] Query processed:', result);
    
    // You can highlight matching charts here
    if (result.matchingCharts && result.matchingCharts.length > 0) {
      console.log('[v0] Found matching charts:', 
        result.matchingCharts.map(c => c.chartId)
      );
      
      // Example: Scroll to first matching chart
      const firstMatchId = result.matchingCharts[0].chartId;
      const element = document.getElementById(firstMatchId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Highlight animation could be added here
      }
    }
  };

  /**
   * Register chart element for export
   */
  const registerChartRef = (chartId, element) => {
    setChartRefs(prev => ({
      ...prev,
      [chartId]: element,
    }));
  };

  // ───────────────────────────────────────────────────────────────────────────
  // UI STRUCTURE
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <div className="dashboard-with-ai">
      {/* ─────────────────────────────────────────────────────────────────────
          HEADER WITH AI BUTTON
          ───────────────────────────────────────────────────────────────────── */}
      
      <header className="dashboard-header">
        <div className="db-header-left">
          {/* Your existing header content */}
          <h1>Enhanced Analytics Dashboard</h1>
          <p>Data visualization with AI insights</p>
        </div>

        <div className="db-header-right">
          {/* Add AI Insights Button */}
          <button
            className="ai-insights-btn"
            onClick={() => setShowAIInsights(!showAIInsights)}
            title="Generate AI insights from your data"
          >
            {showAIInsights ? (
              <>
                <span>✕</span>
                Close Insights
              </>
            ) : (
              <>
                <span>🤖</span>
                AI Insights
              </>
            )}
          </button>

          {/* Your existing header buttons */}
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────
          NATURAL LANGUAGE QUERY BOX
          ───────────────────────────────────────────────────────────────────── */}
      
      <NLQueryBox
        charts={charts}
        columns={columns}
        data={data}
        onQueryResult={handleQueryResult}
        onGenerateChart={handleGenerateChartFromQuery}
      />

      {/* ─────────────────────────────────────────────────────────────────────
          NEW CHART FROM QUERY (Optional Display)
          ───────────────────────────────────────────────────────────────────── */}
      
      {newChartFromQuery && (
        <div className="new-chart-from-query">
          <div className="ncfq-header">
            <h3>✨ Generated Chart from Query</h3>
            <p>{newChartFromQuery.description}</p>
            <button 
              className="ncfq-dismiss"
              onClick={() => setNewChartFromQuery(null)}
            >
              Dismiss
            </button>
          </div>
          {/* Render the new chart here */}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          CHARTS SECTION WITH EXPORT
          ───────────────────────────────────────────────────────────────────── */}
      
      <section className="charts-section">
        <h2>Visualizations</h2>
        
        <div className="charts-grid">
          {/* Render all charts (original + AI-generated) */}
          {[...charts, ...aiGeneratedCharts].map((chart, idx) => (
            <ChartCardWithExport
              key={chart.id || idx}
              chart={chart}
              data={data}
              onRegisterRef={(el) => registerChartRef(chart.id, el)}
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          AI INSIGHTS PANEL (Overlay/Sidebar)
          ───────────────────────────────────────────────────────────────────── */}
      
      {showAIInsights && (
        <AIInsightsPanel
          data={data}
          columns={columns}
          analysis={analysis}
          charts={charts}
          onClose={() => setShowAIInsights(false)}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CHART CARD WITH EXPORT BUTTON
// ─────────────────────────────────────────────────────────────────────────────

const ChartCardWithExport = ({ chart, data, onRegisterRef }) => {
  const chartContainerRef = useRef(null);

  return (
    <div className="chart-card" id={chart.id}>
      {/* Chart Header with Export */}
      <div className="chart-card-header">
        <div className="cch-left">
          <h3>{chart.title}</h3>
          {chart.isGeneratedFromQuery && (
            <span className="badge-generated">
              Generated from Query
            </span>
          )}
        </div>

        <div className="cch-right">
          {/* EXPORT BUTTON - Main Feature */}
          <ChartExporter
            chartElement={chartContainerRef.current}
            chartTitle={chart.title}
          />

          {/* Your existing chart controls */}
        </div>
      </div>

      {/* Chart Body - Register ref here */}
      <div 
        className="chart-body"
        ref={(el) => {
          chartContainerRef.current = el;
          onRegisterRef?.(el);
        }}
      >
        {/* Your chart rendering logic */}
        {chart.type === 'bar' && <BarChart {...chart} data={data} />}
        {chart.type === 'line' && <LineChart {...chart} data={data} />}
        {chart.type === 'pie' && <PieChart {...chart} data={data} />}
        {chart.type === 'scatter' && <ScatterChart {...chart} data={data} />}
        {chart.type === 'table' && <DataTable {...chart} data={data} />}
      </div>

      {/* Chart Description */}
      {chart.description && (
        <div className="chart-footer">
          <p>{chart.description}</p>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MINIMAL STYLING
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
  .dashboard-with-ai {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }

  .db-header-left {
    flex: 1;
  }

  .db-header-right {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .ai-insights-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 40px;
  }

  .ai-insights-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
  }

  .chart-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .chart-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .cch-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .cch-right {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .badge-generated {
    display: inline-block;
    padding: 4px 8px;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

  .chart-body {
    padding: 16px;
    min-height: 300px;
  }

  .chart-footer {
    padding: 12px 16px;
    background: #f8fafc;
    border-top: 1px solid #e5e7eb;
    font-size: 13px;
    color: #64748b;
  }

  .charts-section {
    margin-top: 20px;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    .dashboard-header {
      flex-direction: column;
      gap: 12px;
    }

    .charts-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER COMPONENTS (Replace with your actual charts)
// ─────────────────────────────────────────────────────────────────────────────

const BarChart = ({ data, xAxis, yAxis, title }) => (
  <div>Bar Chart: {title}</div>
);

const LineChart = ({ data, xAxis, yAxis, title }) => (
  <div>Line Chart: {title}</div>
);

const PieChart = ({ data, xAxis, yAxis, title }) => (
  <div>Pie Chart: {title}</div>
);

const ScatterChart = ({ data, xAxis, yAxis, title }) => (
  <div>Scatter Chart: {title}</div>
);

const DataTable = ({ data, title }) => (
  <div>Data Table: {title}</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default DashboardWithAIFeatures;

/**
 * QUICK START
 * 
 * 1. Import the component:
 *    import DashboardWithAIFeatures from './INTEGRATION_EXAMPLE';
 * 
 * 2. Use it in your app:
 *    <DashboardWithAIFeatures
 *      data={yourData}
 *      columns={yourColumns}
 *      analysis={yourAnalysis}
 *      charts={yourCharts}
 *      setCharts={setYourCharts}
 *    />
 * 
 * 3. Or integrate parts into existing Dashboard:
 *    - Copy state management code
 *    - Copy handler functions
 *    - Import and place components
 * 
 * All styling is in AIFeatures.css - import it in your main CSS file:
 * @import './styles/AIFeatures.css';
 */
