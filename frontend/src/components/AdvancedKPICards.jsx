import React, { useMemo } from 'react';
import '../styles/AdvancedKPICards.css';

// Format utility
const fmt = (v) => {
  if (v === null || v === undefined) return '—';
  if (typeof v !== 'number') return String(v);
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  if (Number.isInteger(v)) return v.toLocaleString();
  return v.toFixed(2);
};

// ─────────────────────────────────────────────────────
// BIG NUMBER CARD — Total count, revenue
// ─────────────────────────────────────────────────────
export const BigNumberCard = ({ label, value, color = '#6366f1', icon, description }) => (
  <div className="kpi-big-number" style={{ '--kpi-color': color }}>
    {icon && <div className="kpi-icon">{icon}</div>}
    <div className="kpi-label">{label}</div>
    <div className="kpi-big-value">{fmt(value)}</div>
    {description && <p className="kpi-desc">{description}</p>}
  </div>
);

// ─────────────────────────────────────────────────────
// TREND CARD — Growth %, change over time
// ─────────────────────────────────────────────────────
export const TrendCard = ({ label, value, change, color = '#6366f1' }) => (
  <div className="kpi-trend" style={{ '--kpi-color': color }}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-trend-value">{fmt(value)}</div>
    <div className={`kpi-trend-change ${change >= 0 ? 'positive' : 'negative'}`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
    </div>
  </div>
);

// ─────────────────────────────────────────────────────
// PROGRESS CARD — % completion, ratio
// ─────────────────────────────────────────────────────
export const ProgressCard = ({ label, value, max = 100, color = '#6366f1' }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="kpi-progress" style={{ '--kpi-color': color }}>
      <div className="kpi-header">
        <div className="kpi-label">{label}</div>
        <div className="kpi-percent">{Math.round(percentage)}%</div>
      </div>
      <div className="kpi-bar">
        <div className="kpi-fill" style={{ width: `${percentage}%` }} />
      </div>
      <div className="kpi-meta">
        {fmt(value)} / {fmt(max)}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// GAUGE CARD — Score, rating, performance
// ─────────────────────────────────────────────────────
export const GaugeCard = ({ label, value, max = 100, color = '#6366f1' }) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180; // 0-180 degrees

  return (
    <div className="kpi-gauge" style={{ '--kpi-color': color }}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-gauge-container">
        <svg viewBox="0 0 200 120" className="kpi-gauge-svg">
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(210 * percentage) / 100} 210`}
          />
          <circle cx="100" cy="100" r="5" fill={color} />
        </svg>
        <div className="kpi-gauge-value">{fmt(value)}</div>
      </div>
      <div className="kpi-gauge-label">{Math.round(percentage)}%</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// BADGE CARD — Category leader, top item
// ─────────────────────────────────────────────────────
export const BadgeCard = ({ label, value, badge, color = '#6366f1' }) => (
  <div className="kpi-badge" style={{ '--kpi-color': color }}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-badge-pill">{badge}</div>
    <div className="kpi-badge-value">{fmt(value)}</div>
  </div>
);

// ─────────────────────────────────────────────────────
// COMPARISON CARD — A vs B split
// ─────────────────────────────────────────────────────
export const ComparisonCard = ({ label, valueA, labelA, valueB, labelB, colorA = '#6366f1', colorB = '#22c55e' }) => (
  <div className="kpi-comparison">
    <div className="kpi-label">{label}</div>
    <div className="kpi-comparison-grid">
      <div className="kpi-comp-section" style={{ borderColor: colorA }}>
        <div className="kpi-comp-label">{labelA}</div>
        <div className="kpi-comp-value" style={{ color: colorA }}>
          {fmt(valueA)}
        </div>
      </div>
      <div className="kpi-comparison-divider" />
      <div className="kpi-comp-section" style={{ borderColor: colorB }}>
        <div className="kpi-comp-label">{labelB}</div>
        <div className="kpi-comp-value" style={{ color: colorB }}>
          {fmt(valueB)}
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────
// SPARKLINE CARD — Mini trend inside KPI
// ─────────────────────────────────────────────────────
export const SparklineCard = ({ label, value, sparkData = [], color = '#6366f1' }) => {
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = max - min || 1;

  const points = sparkData
    .map((v, i) => {
      const x = (i / (sparkData.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="kpi-sparkline" style={{ '--kpi-color': color }}>
      <div className="kpi-header-row">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">{fmt(value)}</div>
      </div>
      {sparkData.length > 1 && (
        <svg viewBox="0 0 100 40" className="kpi-sparkline-chart">
          <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────
// ICON STAT CARD — Quick stat with context icon
// ─────────────────────────────────────────────────────
export const IconStatCard = ({ label, value, icon, color = '#6366f1', subtitle }) => (
  <div className="kpi-icon-stat" style={{ '--kpi-color': color }}>
    <div className="kpi-icon-wrapper">
      <div className="kpi-icon">{icon}</div>
    </div>
    <div className="kpi-info">
      <div className="kpi-label">{label}</div>
      <div className="kpi-stat-value">{fmt(value)}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
    </div>
  </div>
);
