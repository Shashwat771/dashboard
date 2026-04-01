import React, { useState } from 'react';
import {
  BigNumberCard,
  TrendCard,
  ProgressCard,
  GaugeCard,
  BadgeCard,
  ComparisonCard,
  SparklineCard,
  IconStatCard,
} from './AdvancedKPICards';
import { RankingTable, MiniRanking } from './RankingTable';
import '../styles/AdvancedShowcase.css';

export const AdvancedFeaturesShowcase = ({ data = [], fileInfo = {} }) => {
  const [activeTab, setActiveTab] = useState('kpi-variants');

  // Sample data for demo
  const sampleMetrics = {
    total: 12547,
    average: 385.6,
    topItem: 'Product A',
    growth: 23.5,
    completion: 72,
    score: 82,
  };

  const sparklineData = [45, 52, 48, 61, 55, 67, 58, 71, 64, 78, 72, 85];

  const topItems = [
    { id: 1, name: 'Product A', value: 4532, badge: 'Best Seller' },
    { id: 2, name: 'Product B', value: 3821, badge: 'Top Rated' },
    { id: 3, name: 'Product C', value: 2156, badge: 'Popular' },
    { id: 4, name: 'Product D', value: 1893, badge: 'Trending' },
    { id: 5, name: 'Product E', value: 1145, badge: 'New' },
  ];

  const sparklineMap = {
    1: [100, 120, 115, 140, 135, 155, 148, 170, 165, 185, 180, 200],
    2: [95, 105, 110, 120, 125, 115, 130, 140, 135, 145, 140, 155],
    3: [80, 85, 90, 95, 92, 100, 105, 110, 108, 115, 120, 125],
    4: [60, 65, 70, 75, 80, 85, 88, 90, 92, 95, 98, 100],
    5: [40, 45, 50, 55, 60, 62, 65, 68, 70, 72, 75, 78],
  };

  const exportData = (format) => {
    const content = format === 'csv' 
      ? `Metric,Value\nTotal Items,${sampleMetrics.total}\nAverage,${sampleMetrics.average}\nTop Item,${sampleMetrics.topItem}\nGrowth %,${sampleMetrics.growth}%`
      : `{"metrics": ${JSON.stringify(sampleMetrics, null, 2)}}`;
    
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="advanced-showcase">
      <div className="showcase-header">
        <h2>🎨 Advanced Dashboard Features</h2>
        <p>Based on Blueprint: 8 KPI Variants + Ranking Table + Advanced Controls</p>
      </div>

      {/* Tab Navigation */}
      <div className="showcase-tabs">
        {[
          { id: 'kpi-variants', label: '8 KPI Card Types' },
          { id: 'ranking', label: 'Ranking Table' },
          { id: 'integrations', label: 'Export & Features' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`showcase-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="showcase-content">
        {/* KPI Variants */}
        {activeTab === 'kpi-variants' && (
          <section className="showcase-section">
            <h3>1️⃣ Big Number Card</h3>
            <div className="grid-2">
              <BigNumberCard
                label="Total Items"
                value={sampleMetrics.total}
                color="#6366f1"
                icon="📊"
                description="All items in the dataset"
              />
              <BigNumberCard
                label="Revenue"
                value={542800}
                color="#22c55e"
                icon="💰"
                description="Total revenue this period"
              />
            </div>

            <h3>2️⃣ Trend Card</h3>
            <div className="grid-4">
              <TrendCard
                label="Growth Rate"
                value={sampleMetrics.total}
                change={sampleMetrics.growth}
                color="#6366f1"
              />
              <TrendCard
                label="Conversions"
                value={1234}
                change={12.5}
                color="#22c55e"
              />
              <TrendCard
                label="Returns"
                value={456}
                change={-8.3}
                color="#ef4444"
              />
            </div>

            <h3>3️⃣ Progress Card</h3>
            <div className="grid-3">
              <ProgressCard
                label="Completion"
                value={sampleMetrics.completion}
                max={100}
                color="#6366f1"
              />
              <ProgressCard
                label="Storage Used"
                value={750}
                max={1000}
                color="#f97316"
              />
              <ProgressCard
                label="Goal Progress"
                value={85}
                max={100}
                color="#22c55e"
              />
            </div>

            <h3>4️⃣ Gauge Card</h3>
            <div className="grid-3">
              <GaugeCard
                label="Performance"
                value={sampleMetrics.score}
                max={100}
                color="#6366f1"
              />
              <GaugeCard
                label="Satisfaction"
                value={78}
                max={100}
                color="#22c55e"
              />
              <GaugeCard
                label="Quality Score"
                value={92}
                max={100}
                color="#14b8a6"
              />
            </div>

            <div className="grid-row">
              <div>
                <h3>5️⃣ Badge Card</h3>
                <BadgeCard
                  label="Top Performer"
                  value={4532}
                  badge="⭐ #1 Product"
                  color="#ffd60a"
                />
              </div>
              <div>
                <h3>6️⃣ Comparison Card</h3>
                <ComparisonCard
                  label="Q3 vs Q4"
                  valueA={125000}
                  labelA="Q3 Revenue"
                  valueB={158000}
                  labelB="Q4 Revenue"
                  colorA="#ef4444"
                  colorB="#22c55e"
                />
              </div>
            </div>

            <h3>7️⃣ Sparkline Card</h3>
            <div className="grid-2">
              <SparklineCard
                label="Monthly Trend"
                value={sampleMetrics.total}
                sparkData={sparklineData}
                color="#6366f1"
              />
              <SparklineCard
                label="Sales Trend"
                value={58234}
                sparkData={[30, 35, 32, 45, 38, 52, 48, 61, 55, 70, 65, 78]}
                color="#22c55e"
              />
            </div>

            <h3>8️⃣ Icon Stat Card</h3>
            <div className="grid-4">
              <IconStatCard
                label="Users"
                value={5234}
                icon="👥"
                color="#6366f1"
                subtitle="Active users"
              />
              <IconStatCard
                label="Orders"
                value={342}
                icon="📦"
                color="#22c55e"
                subtitle="This month"
              />
              <IconStatCard
                label="Revenue"
                value={54800}
                icon="💵"
                color="#f97316"
                subtitle="Total income"
              />
              <IconStatCard
                label="Growth"
                value={23.5}
                icon="📈"
                color="#14b8a6"
                subtitle="YoY increase"
              />
            </div>
          </section>
        )}

        {/* Ranking Table */}
        {activeTab === 'ranking' && (
          <section className="showcase-section">
            <h3>🏆 Full Ranking Table</h3>
            <RankingTable
              title="Top Products with Sparklines"
              data={topItems}
              itemLabel="Product"
              valueLabel="Revenue"
              sparklineData={sparklineMap}
              badgeColumn="Badge"
              color="#6366f1"
            />

            <h3>📊 Mini Ranking for Sidebars</h3>
            <div className="grid-2">
              <MiniRanking
                title="Top 5 Items"
                data={topItems}
                color="#6366f1"
              />
              <MiniRanking
                title="Best Sellers"
                data={topItems}
                color="#22c55e"
              />
            </div>
          </section>
        )}

        {/* Integrations & Export */}
        {activeTab === 'integrations' && (
          <section className="showcase-section">
            <h3>📤 Data Export</h3>
            <div className="export-controls">
              <button
                className="btn btn-primary"
                onClick={() => exportData('csv')}
              >
                📥 Export as CSV
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => exportData('json')}
              >
                📋 Export as JSON
              </button>
            </div>

            <h3>✨ Advanced Features Integrated</h3>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <h4>8 KPI Card Variants</h4>
                  <p>Big Number, Trend, Progress, Gauge, Badge, Comparison, Sparkline, Icon Stat</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <h4>Ranking Tables with Sparklines</h4>
                  <p>Full-width tables with inline trend visualization and medals</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <h4>Responsive Grid Layouts</h4>
                  <p>Adaptive 2-col, 3-col, 4-col grids for all screen sizes</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <h4>Data Export (CSV & JSON)</h4>
                  <p>Download dashboard data in multiple formats</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <h4>Color Theming</h4>
                  <p>Customizable accent colors per card/component</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <div>
                  <h4>Universal Design Tokens</h4>
                  <p>CSS variables for consistent styling across templates</p>
                </div>
              </div>
            </div>

            <h3>🎨 Theme Colors (CSS Variables)</h3>
            <div className="theme-palette">
              <div className="color-swatch" style={{ backgroundColor: '#6366f1' }}>
                --primary
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#22c55e' }}>
                --success
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#f97316' }}>
                --warning
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#ef4444' }}>
                --danger
              </div>
              <div className="color-swatch" style={{ backgroundColor: '#14b8a6' }}>
                --info
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdvancedFeaturesShowcase;
