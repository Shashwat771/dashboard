import React, { useMemo } from 'react';
import '../styles/RankingTable.css';

const fmt = (v) => {
  if (v === null || v === undefined) return '—';
  if (typeof v !== 'number') return String(v);
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(2)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  if (Number.isInteger(v)) return v.toLocaleString();
  return v.toFixed(2);
};

// ─────────────────────────────────────────────────────
// RANKING TABLE — Top N with sparkline + badge per row
// ─────────────────────────────────────────────────────
export const RankingTable = ({
  title = 'Top Rankings',
  data = [],
  limit = 10,
  itemLabel = 'Item',
  valueLabel = 'Value',
  sparklineData = {},
  badgeColumn = null,
  color = '#6366f1',
}) => {
  const topItems = useMemo(
    () => data.sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, limit),
    [data, limit]
  );

  const renderSparkline = (item) => {
    const sparkData = sparklineData[item.id] || [];
    if (sparkData.length < 2) return null;

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
      <svg viewBox="0 0 100 40" className="ranking-sparkline">
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  };

  return (
    <div className="ranking-table-container">
      <div className="ranking-header">
        <h3 className="ranking-title">{title}</h3>
      </div>
      <div className="ranking-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th className="rank-col">Rank</th>
              <th className="name-col">{itemLabel}</th>
              <th className="value-col">{valueLabel}</th>
              {sparklineData && Object.keys(sparklineData).length > 0 && (
                <th className="sparkline-col">Trend</th>
              )}
              {badgeColumn && <th className="badge-col">{badgeColumn}</th>}
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, idx) => (
              <tr key={item.id} className="ranking-row">
                <td className="rank-col">
                  <span className={`rank-badge rank-${idx + 1}`}>{idx + 1}</span>
                </td>
                <td className="name-col">{item.name}</td>
                <td className="value-col">
                  <span className="value-text" style={{ color }}>
                    {fmt(item.value)}
                  </span>
                </td>
                {sparklineData && Object.keys(sparklineData).length > 0 && (
                  <td className="sparkline-col">{renderSparkline(item)}</td>
                )}
                {badgeColumn && (
                  <td className="badge-col">
                    <span className="item-badge" style={{ borderColor: color, color }}>
                      {item.badge || '—'}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
// MINI RANKING — Compact version for sidebars
// ─────────────────────────────────────────────────────
export const MiniRanking = ({ title = 'Top Items', data = [], limit = 5, color = '#6366f1' }) => {
  const topItems = useMemo(
    () => data.sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, limit),
    [data, limit]
  );

  return (
    <div className="mini-ranking">
      <div className="mini-ranking-header">
        <h4>{title}</h4>
      </div>
      <div className="mini-ranking-list">
        {topItems.map((item, idx) => (
          <div key={item.id} className="mini-ranking-item">
            <span className="mini-rank">{idx + 1}</span>
            <div className="mini-info">
              <div className="mini-name">{item.name}</div>
              <div className="mini-value" style={{ color }}>
                {fmt(item.value)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
