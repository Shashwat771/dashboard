import React from 'react';
import '../styles/DashboardCards.css';

// ─────────────────────────────────────────────────────
// METRIC CARD - Standalone/Composer
// ─────────────────────────────────────────────────────
export const MetricCard = ({ 
  label, 
  value, 
  change, 
  icon, 
  color = 'var(--primary)',
  trend = null,
  subtitle = null 
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className="metric-card" style={{ '--accent-color': color }}>
      <div className="mc-header">
        <div className="mc-label">{label}</div>
        {trend && <div className={`mc-trend ${trend}`}>{trend === 'up' ? '📈' : '📉'}</div>}
      </div>
      <div className="mc-value">{value}</div>
      {subtitle && <div className="mc-subtitle">{subtitle}</div>}
      {change !== null && (
        <div className={`mc-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────
// STAT BOX - Minimalist
// ─────────────────────────────────────────────────────
export const StatBox = ({ number, label, unit = '', icon = null }) => (
  <div className="stat-box">
    {icon && <div className="sb-icon">{icon}</div>}
    <div className="sb-content">
      <div className="sb-number">{number}{unit}</div>
      <div className="sb-label">{label}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────
// CHART CARD - Container for Charts
// ─────────────────────────────────────────────────────
export const ChartCard = ({ 
  title, 
  subtitle = null, 
  children, 
  footer = null,
  compact = false,
  loading = false 
}) => (
  <div className={`chart-card ${compact ? 'compact' : ''}`}>
    {loading && <div className="cc-loader"></div>}
    
    <div className="cc-header">
      <div className="cc-title-section">
        <h3 className="cc-title">{title}</h3>
        {subtitle && <p className="cc-subtitle">{subtitle}</p>}
      </div>
    </div>

    <div className="cc-body">
      {children}
    </div>

    {footer && <div className="cc-footer">{footer}</div>}
  </div>
);

// ─────────────────────────────────────────────────────
// STAT TRACKER - Progress Indicator
// ─────────────────────────────────────────────────────
export const StatTracker = ({ 
  items = []
}) => (
  <div className="stat-tracker">
    {items.map((item, i) => (
      <div key={i} className="st-row">
        <div className="st-label">{item.label}</div>
        <div className="st-bar">
          <div 
            className="st-fill" 
            style={{ 
              width: `${item.percentage}%`,
              backgroundColor: item.color || 'var(--primary)'
            }}
          ></div>
        </div>
        <div className="st-value">{item.percentage}%</div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────
// INFO PANEL - Alert/Info Box
// ─────────────────────────────────────────────────────
export const InfoPanel = ({ 
  type = 'info', // info, success, warning, error
  title, 
  message, 
  action = null 
}) => (
  <div className={`info-panel info-${type}`}>
    <div className="ip-icon">
      {type === 'success' && '✓'}
      {type === 'error' && '✕'}
      {type === 'warning' && '⚠'}
      {type === 'info' && 'ⓘ'}
    </div>
    <div className="ip-content">
      <div className="ip-title">{title}</div>
      <div className="ip-message">{message}</div>
    </div>
    {action && <div className="ip-action">{action}</div>}
  </div>
);

// ─────────────────────────────────────────────────────
// BADGE - Status/Tag Badge
// ─────────────────────────────────────────────────────
export const Badge = ({ children, variant = 'default', size = 'md' }) => (
  <span className={`badge badge-${variant} badge-${size}`}>{children}</span>
);

// ─────────────────────────────────────────────────────
// DIVIDER - Section Divider
// ─────────────────────────────────────────────────────
export const Divider = ({ text = null, margin = '24px' }) => (
  <div className="divider" style={{ margin }}>
    {text && <span className="divider-text">{text}</span>}
  </div>
);

// ─────────────────────────────────────────────────────
// SECTION - Content Section
// ─────────────────────────────────────────────────────
export const Section = ({ 
  title, 
  subtitle = null, 
  children, 
  action = null 
}) => (
  <div className="section">
    <div className="section-header">
      <div className="section-title-group">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
    <div className="section-content">
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────
// DATA ROW - Compact Data Row
// ─────────────────────────────────────────────────────
export const DataRow = ({ 
  label, 
  value, 
  secondary = null, 
  icon = null,
  highlight = false 
}) => (
  <div className={`data-row ${highlight ? 'highlight' : ''}`}>
    {icon && <div className="dr-icon">{icon}</div>}
    <div className="dr-content">
      <div className="dr-label">{label}</div>
      {secondary && <div className="dr-secondary">{secondary}</div>}
    </div>
    <div className="dr-value">{value}</div>
  </div>
);

// ─────────────────────────────────────────────────────
// GRID LAYOUT - Responsive Grid
// ─────────────────────────────────────────────────────
export const ResponsiveGrid = ({ 
  children, 
  cols = 3, 
  gap = '24px',
  minWidth = '300px' 
}) => (
  <div 
    className="responsive-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      gap: gap,
    }}
  >
    {children}
  </div>
);

export default {
  MetricCard,
  StatBox,
  ChartCard,
  StatTracker,
  InfoPanel,
  Badge,
  Divider,
  Section,
  DataRow,
  ResponsiveGrid,
};
