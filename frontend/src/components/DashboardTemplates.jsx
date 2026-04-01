import React, { useState, useMemo } from 'react';
import { Bar, Line, Pie, Scatter, Doughnut } from 'react-chartjs-2';
import '../styles/DashboardTemplates.css';

const PALETTE = [
  '#6366f1', '#22c55e', '#f97316', '#ef4444',
  '#06b6d4', '#14b8a6', '#ec4899', '#84cc16',
  '#a855f7', '#fb923c', '#f472b6', '#818cf8',
];

const col = (i) => PALETTE[i % PALETTE.length];

const fmt = (v) => {
  if (v === null || v === undefined) return '—';
  if (typeof v !== 'number') return String(v);
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  if (Number.isInteger(v)) return v.toLocaleString();
  return v.toFixed(2);
};

// ─────────────────────────────────────────────────────
// TEMPLATE: EXECUTIVE SUMMARY
// ─────────────────────────────────────────────────────
export const ExecutiveSummaryTemplate = ({ charts = [], metrics = [] }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' },
      tooltip: { backgroundColor: '#16161e', titleColor: '#fff', bodyColor: '#8b95a5' },
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="template-exec-summary">
      <div className="exec-header">
        <h1>Executive Summary</h1>
        <span className="exec-date">{new Date().toLocaleDateString()}</span>
      </div>

      {/* KPI Cards */}
      <div className="exec-kpi-grid">
        {metrics.slice(0, 4).map((m, i) => (
          <div key={i} className="exec-kpi-card">
            <div className="exec-kpi-label">{m.label}</div>
            <div className="exec-kpi-value">{fmt(m.value)}</div>
            <div className={`exec-kpi-change ${m.change >= 0 ? 'positive' : 'negative'}`}>
              {m.change >= 0 ? '↑' : '↓'} {Math.abs(m.change)}%
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="exec-charts-grid">
        {charts.slice(0, 2).map((chart, i) => (
          <div key={i} className="exec-chart-block">
            <h3>{chart.title}</h3>
            <div className="exec-chart-container">
              {chart.type === 'bar' && <Bar data={chart.data} options={chartOptions} />}
              {chart.type === 'line' && <Line data={chart.data} options={chartOptions} />}
              {chart.type === 'pie' && <Pie data={chart.data} options={chartOptions} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// TEMPLATE: ANALYTICS FOCUS
// ─────────────────────────────────────────────────────
export const AnalyticsFocusTemplate = ({ charts = [], metrics = [] }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#16161e' },
    },
  };

  return (
    <div className="template-analytics-focus">
      <div className="af-header">
        <h2>Analytics Dashboard</h2>
        <div className="af-controls">
          <button className="af-btn">Refresh</button>
          <button className="af-btn">Export</button>
        </div>
      </div>

      <div className="af-main-grid">
        {/* Large main chart */}
        <div className="af-main-chart">
          <h3>{charts[0]?.title || 'Primary Metric'}</h3>
          <div className="af-chart-lg">
            {charts[0] && (
              charts[0].type === 'line' ? (
                <Line data={charts[0].data} options={chartOptions} />
              ) : (
                <Bar data={charts[0].data} options={chartOptions} />
              )
            )}
          </div>
        </div>

        {/* Sidebar metrics */}
        <div className="af-sidebar">
          <div className="af-metrics-stack">
            {metrics.slice(0, 5).map((m, i) => (
              <div key={i} className="af-metric-item">
                <div className="af-metric-icon" style={{ background: col(i) }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="af-metric-info">
                  <div className="af-metric-label">{m.label}</div>
                  <div className="af-metric-value">{fmt(m.value)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary charts */}
      <div className="af-secondary-grid">
        {charts.slice(1, 3).map((chart, i) => (
          <div key={i} className="af-chart-card">
            <h4>{chart.title}</h4>
            <div className="af-chart-md">
              {chart.type === 'pie' ? (
                <Pie data={chart.data} options={chartOptions} />
              ) : (
                <Bar data={chart.data} options={chartOptions} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// TEMPLATE: PERFORMANCE METRICS
// ─────────────────────────────────────────────────────
export const PerformanceMetricsTemplate = ({ charts = [], metrics = [] }) => {
  return (
    <div className="template-performance">
      <div className="perf-header">
        <h1>Performance Overview</h1>
        <div className="perf-status">
          <span className="perf-badge success">● All Systems Operational</span>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="perf-cards-grid">
        {metrics.map((m, i) => (
          <div key={i} className="perf-card">
            <div className="perf-card-header">
              <span className="perf-label">{m.label}</span>
              <span className={`perf-badge ${m.change >= 0 ? 'up' : 'down'}`}>
                {m.change >= 0 ? '↑' : '↓'} {Math.abs(m.change)}%
              </span>
            </div>
            <div className="perf-card-value">{fmt(m.value)}</div>
            <div className="perf-progress" style={{ background: `linear-gradient(90deg, ${col(i)} 0%, transparent 100%)` }}>
              <div className="perf-progress-fill" style={{ width: `${Math.min((m.value / 1000) * 100, 100)}%`, background: col(i) }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Grid */}
      <div className="perf-chart-grid">
        {charts.map((chart, i) => (
          <div key={i} className="perf-chart-wrapper">
            <h3>{chart.title}</h3>
            <div className="perf-chart">
              {chart.type === 'bar' && <Bar data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
              {chart.type === 'line' && <Line data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// TEMPLATE: MINIMAL CLEAN
// ─────────────────────────────────────────────────────
export const MinimalCleanTemplate = ({ charts = [], metrics = [] }) => {
  return (
    <div className="template-minimal">
      <div className="minimal-header">
        <h1>Dashboard</h1>
        <p className="minimal-subtitle">Real-time data visualization</p>
      </div>

      {/* Stats Row */}
      <div className="minimal-stats">
        {metrics.slice(0, 3).map((m, i) => (
          <div key={i} className="minimal-stat">
            <div className="minimal-stat-value">{fmt(m.value)}</div>
            <div className="minimal-stat-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="minimal-charts">
        {charts.map((chart, i) => (
          <div key={i} className="minimal-chart">
            <h3>{chart.title}</h3>
            <div className="minimal-chart-box">
              {chart.type === 'line' && <Line data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
              {chart.type === 'bar' && <Bar data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
              {chart.type === 'pie' && <Pie data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// TEMPLATE: GLASSMORPHISM
// ─────────────────────────────────────────────────────
export const GlassmorphismTemplate = ({ charts = [], metrics = [] }) => {
  return (
    <div className="template-glass">
      <div className="glass-bg"></div>
      
      <div className="glass-container">
        <h1 className="glass-title">Glass Analytics</h1>

        {/* Glass metric cards */}
        <div className="glass-grid">
          {metrics.slice(0, 4).map((m, i) => (
            <div key={i} className="glass-card">
              <div className="glass-accent" style={{ background: col(i) }}></div>
              <h4>{m.label}</h4>
              <div className="glass-value">{fmt(m.value)}</div>
              <p className="glass-small">{m.change >= 0 ? '+' : ''}{m.change}% this week</p>
            </div>
          ))}
        </div>

        {/* Glass charts */}
        <div className="glass-charts">
          {charts.slice(0, 2).map((chart, i) => (
            <div key={i} className="glass-chart-card">
              <h3>{chart.title}</h3>
              <div className="glass-chart">
                {chart.type === 'line' && <Line data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
                {chart.type === 'bar' && <Bar data={chart.data} options={{ responsive: true, maintainAspectRatio: false }} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// TEMPLATE SELECTOR COMPONENT
// ─────────────────────────────────────────────────────
export const DashboardTemplateSelector = ({ 
  charts = [], 
  metrics = [], 
  selectedTemplate = 'executive',
  onTemplateChange = () => {} 
}) => {
  const templates = [
    { id: 'executive', name: '👔 Executive Summary', Component: ExecutiveSummaryTemplate },
    { id: 'analytics', name: '📊 Analytics Focus', Component: AnalyticsFocusTemplate },
    { id: 'performance', name: '⚡ Performance Metrics', Component: PerformanceMetricsTemplate },
    { id: 'minimal', name: '✨ Minimal Clean', Component: MinimalCleanTemplate },
    { id: 'glass', name: '🔮 Glassmorphism', Component: GlassmorphismTemplate },
  ];

  const current = templates.find(t => t.id === selectedTemplate);
  const Component = current?.Component || ExecutiveSummaryTemplate;

  return (
    <div className="template-selector-wrapper">
      <div className="template-switcher">
        {templates.map(t => (
          <button
            key={t.id}
            className={`template-btn ${selectedTemplate === t.id ? 'active' : ''}`}
            onClick={() => onTemplateChange(t.id)}
            title={t.name}
          >
            {t.name}
          </button>
        ))}
      </div>
      <Component charts={charts} metrics={metrics} />
    </div>
  );
};

export default DashboardTemplateSelector;
