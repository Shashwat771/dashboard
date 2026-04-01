import React, { useState } from 'react';

// Import Templates
import { DashboardTemplateSelector, ExecutiveSummaryTemplate } from '@/components/DashboardTemplates';

// Import Cards
import { 
  MetricCard, 
  ChartCard, 
  StatBox, 
  Section,
  ResponsiveGrid,
  InfoPanel,
  Badge,
  DataRow,
  StatTracker,
  Divider 
} from '@/components/DashboardCards';

// Import Layouts
import {
  GridLayout,
  SidebarLayout,
  HeroLayout,
  CardGridLayout,
  SplitLayout,
  TabsLayout,
} from '@/components/DashboardLayouts';

// Import Charts
import { Line, Bar, Pie } from 'react-chartjs-2';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPLETE DASHBOARD EXAMPLE
 * Shows how to use all templates, components, and layouts together
 * ═══════════════════════════════════════════════════════════════════════════
 */

const CompleteExampleDashboard = () => {
  const [template, setTemplate] = useState('executive');
  const [activeTab, setActiveTab] = useState(0);

  // ─────────────────────────────────────────────────────
  // SAMPLE DATA
  // ─────────────────────────────────────────────────────

  const metrics = [
    { label: 'Total Revenue', value: '$125.4K', change: 12.5, trend: 'up', color: 'var(--primary)' },
    { label: 'Active Users', value: '2,543', change: 8.2, trend: 'up', color: '#22c55e' },
    { label: 'Conversion Rate', value: '3.2%', change: -2.1, trend: 'down', color: '#06b6d4' },
    { label: 'Avg Order Value', value: '$89.50', change: 5.7, trend: 'up', color: '#f97316' },
  ];

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [40, 35, 50, 65, 60, 80],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }]
  };

  const categoryChartData = {
    labels: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'],
    datasets: [{
      label: 'Sales by Category',
      data: [45, 32, 28, 22, 18],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(6, 182, 212, 0.8)',
        'rgba(236, 72, 153, 0.8)',
      ],
      borderRadius: 6,
    }]
  };

  const trackingData = [
    { label: 'Email Campaigns', percentage: 85, color: 'var(--primary)' },
    { label: 'Social Media', percentage: 72, color: '#22c55e' },
    { label: 'Paid Ads', percentage: 58, color: '#f97316' },
  ];

  const tabs = [
    {
      label: '📊 Overview',
      content: (
        <div>
          <Section title="System Status" subtitle="All systems operational">
            <InfoPanel type="success" title="All Systems Green" message="All services are running smoothly" />
          </Section>
        </div>
      )
    },
    {
      label: '📈 Analytics',
      content: (
        <div>
          <Section title="Performance Metrics">
            <StatTracker items={trackingData} />
          </Section>
        </div>
      )
    },
    {
      label: '⚙️ Settings',
      content: (
        <div>
          <Section title="Dashboard Configuration">
            <p>Configure your dashboard preferences here</p>
          </Section>
        </div>
      )
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#16161e' },
    },
  };

  // ─────────────────────────────────────────────────────
  // RENDER DIFFERENT EXAMPLE LAYOUTS
  // ─────────────────────────────────────────────────────

  // Example 1: Template Selector
  const renderTemplateExample = () => (
    <DashboardTemplateSelector
      charts={[
        { type: 'line', data: revenueChartData, title: 'Revenue Trend' },
        { type: 'bar', data: categoryChartData, title: 'Sales by Category' },
      ]}
      metrics={metrics}
      selectedTemplate={template}
      onTemplateChange={setTemplate}
    />
  );

  // Example 2: Cards Grid Example
  const renderCardsExample = () => (
    <div style={{ padding: '40px', background: 'var(--bg-dark)' }}>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '40px' }}>Card Components Example</h1>

      {/* Metric Cards Grid */}
      <Section title="Key Metrics" subtitle="Overview of main KPIs">
        <ResponsiveGrid cols={4} gap="24px">
          {metrics.map((m, i) => (
            <MetricCard
              key={i}
              label={m.label}
              value={m.value}
              change={m.change}
              trend={m.trend}
              color={m.color}
            />
          ))}
        </ResponsiveGrid>
      </Section>

      <Divider text="Additional Metrics" margin="40px" />

      {/* Stat Boxes */}
      <Section title="Summary Statistics">
        <ResponsiveGrid cols={3} gap="16px">
          <StatBox number="156.8K" label="Total Orders" icon="📦" />
          <StatBox number="2,543" label="Active Users" icon="👥" unit="+" />
          <StatBox number="98.2%" label="Uptime" icon="🟢" />
        </ResponsiveGrid>
      </Section>

      <Divider text="Chart Components" margin="40px" />

      {/* Chart Cards */}
      <Section title="Data Visualization">
        <ResponsiveGrid cols={2} gap="24px">
          <ChartCard title="Revenue Trend" subtitle="Last 6 months">
            <Line data={revenueChartData} options={chartOptions} />
          </ChartCard>
          <ChartCard title="Sales by Category">
            <Bar data={categoryChartData} options={chartOptions} />
          </ChartCard>
        </ResponsiveGrid>
      </Section>

      <Divider text="Status & Tracking" margin="40px" />

      {/* Info Panels */}
      <Section title="System Status">
        <ResponsiveGrid cols={2} gap="24px">
          <InfoPanel type="success" title="Services Active" message="All services running normally" />
          <InfoPanel type="warning" title="Performance Alert" message="Server load at 75% capacity" />
        </ResponsiveGrid>
      </Section>

      {/* Tracking */}
      <Section title="Campaign Progress">
        <StatTracker items={trackingData} />
      </Section>

      {/* Data Rows */}
      <Section title="Recent Activity">
        <DataRow icon="📊" label="Dashboard Updated" value="2m ago" highlight />
        <DataRow icon="📝" label="Report Generated" value="1h ago" secondary="Monthly Report" />
        <DataRow icon="⚙️" label="Settings Changed" value="5h ago" />
      </Section>
    </div>
  );

  // Example 3: Sidebar Layout
  const renderSidebarExample = () => (
    <SidebarLayout
      sidebarWidth="280px"
      sidebar={
        <Section title="Quick Links" subtitle="Navigation">
          <DataRow icon="📊" label="Dashboard" highlight />
          <DataRow icon="📈" label="Analytics" />
          <DataRow icon="⚙️" label="Settings" />
          <DataRow icon="📱" label="Mobile App" />
        </Section>
      }
    >
      <div style={{ padding: '40px', background: 'var(--bg-dark)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Sidebar Layout Example</h1>
        <Section title="Main Content">
          <ResponsiveGrid cols={2} gap="24px">
            {metrics.map((m, i) => (
              <MetricCard
                key={i}
                label={m.label}
                value={m.value}
                change={m.change}
                color={m.color}
              />
            ))}
          </ResponsiveGrid>
        </Section>
      </div>
    </SidebarLayout>
  );

  // Example 4: Split Layout
  const renderSplitExample = () => (
    <div style={{ padding: '40px', background: 'var(--bg-dark)' }}>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '40px' }}>Split Layout Example</h1>
      <SplitLayout
        gap="24px"
        left={
          <Section title="Left Column" subtitle="First half">
            <ResponsiveGrid cols={2} gap="16px">
              <MetricCard label="Users" value="2,543" change={8.2} />
              <MetricCard label="Revenue" value="$125.4K" change={12.5} />
            </ResponsiveGrid>
          </Section>
        }
        right={
          <Section title="Right Column" subtitle="Second half">
            <ChartCard title="Revenue Chart">
              <Line data={revenueChartData} options={chartOptions} />
            </ChartCard>
          </Section>
        }
      />
    </div>
  );

  // Example 5: Hero Layout
  const renderHeroExample = () => (
    <div style={{ padding: '40px', background: 'var(--bg-dark)' }}>
      <HeroLayout
        title="Welcome to Your Dashboard"
        subtitle="Managing your business metrics with powerful analytics"
        stats={[
          { value: '156.8K', label: 'Total Orders' },
          { value: '2,543', label: 'Active Users' },
          { value: '98.2%', label: 'Uptime' },
        ]}
      >
        <ResponsiveGrid cols={3} gap="24px">
          {metrics.map((m, i) => (
            <MetricCard key={i} label={m.label} value={m.value} change={m.change} />
          ))}
        </ResponsiveGrid>
      </HeroLayout>
    </div>
  );

  // ─────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────

  return (
    <div>
      <TabsLayout tabs={[
        { label: '🎨 Templates', content: renderTemplateExample() },
        { label: '📦 Components', content: renderCardsExample() },
        { label: '📐 Sidebar Layout', content: renderSidebarExample() },
        { label: '↔️ Split Layout', content: renderSplitExample() },
        { label: '🌟 Hero Layout', content: renderHeroExample() },
      ]} />
    </div>
  );
};

export default CompleteExampleDashboard;

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * USAGE GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. SELECT A TEMPLATE:
 *    - Executive Summary (for C-suite reporting)
 *    - Analytics Focus (for data analysis)
 *    - Performance Metrics (for monitoring)
 *    - Minimal Clean (for startups)
 *    - Glassmorphism (for modern apps)
 *
 * 2. USE COMPONENTS:
 *    - MetricCard: Display KPIs
 *    - ChartCard: Contain charts
 *    - StatBox: Summary statistics
 *    - Section: Group content
 *    - InfoPanel: Show alerts
 *    - Badge: Status indicators
 *    - DataRow: List items
 *    - StatTracker: Progress bars
 *
 * 3. COMBINE WITH LAYOUTS:
 *    - GridLayout: Responsive grid
 *    - SidebarLayout: Navigation + content
 *    - HeroLayout: Hero section
 *    - SplitLayout: Two columns
 *    - TabsLayout: Tabbed content
 *
 * 4. CUSTOMIZE:
 *    - Use CSS variables for theming
 *    - Pass colors through props
 *    - Adjust sizes with props
 *    - Override CSS as needed
 */
