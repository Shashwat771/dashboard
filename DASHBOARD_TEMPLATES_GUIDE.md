# 🎨 Dashboard Templates & Components Guide

## Overview

Your project now includes **5 premium dashboard templates** and **10 reusable UI components** with modern, professional styling. This guide explains how to use them.

---

## 📊 Dashboard Templates

### 1. **Executive Summary Template** 👔
**Best for:** C-suite reports, high-level overviews, KPI dashboards

```jsx
import { ExecutiveSummaryTemplate } from '@/components/DashboardTemplates';

<ExecutiveSummaryTemplate 
  charts={chartData} 
  metrics={metricData} 
/>
```

**Features:**
- Large KPI cards with percentage changes
- Professional header with date
- Multiple chart support
- Gradient accents
- Hover animations

---

### 2. **Analytics Focus Template** 📊
**Best for:** Data analysis, multi-metric tracking, detailed insights

```jsx
import { AnalyticsFocusTemplate } from '@/components/DashboardTemplates';

<AnalyticsFocusTemplate 
  charts={chartData} 
  metrics={metricData} 
/>
```

**Features:**
- Large primary chart on left
- Metric sidebar on right
- Secondary charts grid
- Responsive layout
- Professional styling

---

### 3. **Performance Metrics Template** ⚡
**Best for:** Real-time monitoring, status dashboards, performance tracking

```jsx
import { PerformanceMetricsTemplate } from '@/components/DashboardTemplates';

<PerformanceMetricsTemplate 
  charts={chartData} 
  metrics={metricData} 
/>
```

**Features:**
- Status badges
- Progress bars for metrics
- Large metric cards
- Operational status indicator
- Gradient backgrounds

---

### 4. **Minimal Clean Template** ✨
**Best for:** Startups, minimalist design, focus on data

```jsx
import { MinimalCleanTemplate } from '@/components/DashboardTemplates';

<MinimalCleanTemplate 
  charts={chartData} 
  metrics={metricData} 
/>
```

**Features:**
- Centered layout
- Large typography
- Minimal decorations
- Focus on content
- Clean whitespace

---

### 5. **Glassmorphism Template** 🔮
**Best for:** Modern apps, premium feel, tech companies

```jsx
import { GlassmorphismTemplate } from '@/components/DashboardTemplates';

<GlassmorphismTemplate 
  charts={chartData} 
  metrics={metricData} 
/>
```

**Features:**
- Glass effect cards
- Backdrop blur
- Gradient title
- Animated shin effect
- Premium aesthetics

---

## 🔄 Template Selector Component

Use this to let users switch between templates:

```jsx
import { DashboardTemplateSelector } from '@/components/DashboardTemplates';

const [selectedTemplate, setSelectedTemplate] = useState('executive');

<DashboardTemplateSelector
  charts={chartData}
  metrics={metricData}
  selectedTemplate={selectedTemplate}
  onTemplateChange={setSelectedTemplate}
/>
```

---

## 🎯 UI Components

### 1. **MetricCard**
Displays a single metric with value and trend

```jsx
import { MetricCard } from '@/components/DashboardCards';

<MetricCard
  label="Revenue"
  value="$125.4K"
  change={12.5}
  trend="up"
  color="var(--primary)"
  subtitle="vs last month"
/>
```

**Props:**
- `label` (string): Metric name
- `value` (string): The value to display
- `change` (number): Percentage change
- `trend` (string): "up" or "down"
- `color` (string): CSS color variable
- `subtitle` (string): Optional subtitle

---

### 2. **StatBox**
Minimalist stat display

```jsx
import { StatBox } from '@/components/DashboardCards';

<StatBox
  number={2.5}
  label="Growth Rate"
  unit="%"
  icon="📈"
/>
```

---

### 3. **ChartCard**
Container for charts with header/footer

```jsx
import { ChartCard } from '@/components/DashboardCards';
import { Line } from 'react-chartjs-2';

<ChartCard
  title="Revenue Trend"
  subtitle="Last 12 months"
  footer="Data updated 2 hours ago"
  loading={false}
>
  <Line data={chartData} options={chartOptions} />
</ChartCard>
```

---

### 4. **StatTracker**
Progress bars for multiple metrics

```jsx
import { StatTracker } from '@/components/DashboardCards';

<StatTracker
  items={[
    { label: 'Task A', percentage: 85, color: '#6366f1' },
    { label: 'Task B', percentage: 60, color: '#22c55e' },
    { label: 'Task C', percentage: 45, color: '#f97316' },
  ]}
/>
```

---

### 5. **InfoPanel**
Alert/notification box

```jsx
import { InfoPanel } from '@/components/DashboardCards';

<InfoPanel
  type="success"
  title="Analysis Complete"
  message="Your dashboard has been updated successfully"
  action={<button>View Details</button>}
/>
```

**Types:** `success`, `error`, `warning`, `info`

---

### 6. **Badge**
Status or category badge

```jsx
import { Badge } from '@/components/DashboardCards';

<Badge variant="primary" size="md">Active</Badge>
<Badge variant="success" size="sm">Completed</Badge>
<Badge variant="error" size="lg">Failed</Badge>
```

**Variants:** `default`, `primary`, `success`, `error`, `warning`
**Sizes:** `sm`, `md`, `lg`

---

### 7. **Divider**
Visual section separator

```jsx
import { Divider } from '@/components/DashboardCards';

<Divider text="Latest Updates" margin="24px" />
```

---

### 8. **Section**
Content grouping container

```jsx
import { Section } from '@/components/DashboardCards';

<Section
  title="Performance Overview"
  subtitle="Real-time metrics"
  action={<button>Export</button>}
>
  {/* Content here */}
</Section>
```

---

### 9. **DataRow**
Compact data display row

```jsx
import { DataRow } from '@/components/DashboardCards';

<DataRow
  icon="📊"
  label="Total Revenue"
  value="$45,231"
  secondary="vs last week"
  highlight={true}
/>
```

---

### 10. **ResponsiveGrid**
Flexible responsive grid layout

```jsx
import { ResponsiveGrid } from '@/components/DashboardCards';

<ResponsiveGrid cols={3} gap="24px" minWidth="300px">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</ResponsiveGrid>
```

---

## 🎨 Color Scheme & Variables

All components use CSS variables for consistent theming:

```css
--bg-dark: #0f111d;
--bg-elevated: #16161e;
--bg-card: #1a1a24;
--primary: #6366f1;
--text-primary: #edeff2;
--text-muted: #8b95a5;
```

To customize, update these in your root CSS file.

---

## 📱 Responsive Behavior

All templates and components are fully responsive:

- **Desktop** (1024px+): Full layout
- **Tablet** (768-1024px): Optimized grid
- **Mobile** (<768px): Single column, stacked layout

---

## 🚀 Complete Example

```jsx
import React, { useState } from 'react';
import { DashboardTemplateSelector } from '@/components/DashboardTemplates';
import { 
  MetricCard, 
  ChartCard, 
  Section,
  ResponsiveGrid 
} from '@/components/DashboardCards';
import { Line, Bar } from 'react-chartjs-2';

export default function Dashboard() {
  const [template, setTemplate] = useState('executive');

  const metrics = [
    { label: 'Total Revenue', value: '$125.4K', change: 12.5 },
    { label: 'Active Users', value: '2,543', change: 8.2 },
    { label: 'Conversion Rate', value: '3.2%', change: -2.1 },
    { label: 'Avg. Order Value', value: '$89.50', change: 5.7 },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [40, 35, 50, 65, 60, 80],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
    }]
  };

  return (
    <DashboardTemplateSelector
      charts={[{ type: 'line', data: chartData, title: 'Revenue Trend' }]}
      metrics={metrics}
      selectedTemplate={template}
      onTemplateChange={setTemplate}
    />
  );
}
```

---

## 🛠️ Integration with Existing Dashboard

To integrate with your existing Dashboard.jsx:

```jsx
// Add imports
import { DashboardTemplateSelector } from '@/components/DashboardTemplates';
import { MetricCard, ChartCard, Section } from '@/components/DashboardCards';

// In your Dashboard component, replace the render with:
<DashboardTemplateSelector
  charts={charts}
  metrics={calculatedMetrics}
  selectedTemplate={userPreferredTemplate}
  onTemplateChange={onTemplateChange}
/>
```

---

## 📊 Mock Data Example

```javascript
const mockMetrics = [
  { label: 'Total Sales', value: '$156.8K', change: 15.2, color: 'var(--primary)' },
  { label: 'New Customers', value: '1,245', change: 8.4, color: '#22c55e' },
  { label: 'Avg Rating', value: '4.8/5', change: 2.1, color: '#f97316' },
  { label: 'Repeat Rate', value: '68%', change: -3.2, color: '#06b6d4' },
];

const mockCharts = [
  {
    type: 'line',
    title: 'Revenue Over Time',
    data: { /* chart.js data */ }
  },
  {
    type: 'bar',
    title: 'Sales by Category',
    data: { /* chart.js data */ }
  },
  {
    type: 'pie',
    title: 'Market Share',
    data: { /* chart.js data */ }
  },
];
```

---

## 🎯 Best Practices

1. **Template Selection**: Choose based on your audience and use case
2. **Component Reusability**: Combine components for custom layouts
3. **Color System**: Use CSS variables for consistent theming
4. **Responsive**: Test on mobile to ensure proper layout
5. **Performance**: Lazy load charts for better performance
6. **Accessibility**: Use semantic HTML and ARIA labels

---

## 🔄 Updating Styles

All styling files:
- `/styles/DashboardTemplates.css` - Template styles
- `/styles/DashboardCards.css` - Component styles

Modify CSS variables to match your brand colors.

---

## 📚 Files Created

1. **Components:**
   - `components/DashboardTemplates.jsx` - 5 templates + selector
   - `components/DashboardCards.jsx` - 10 UI components

2. **Styles:**
   - `styles/DashboardTemplates.css` - Template styling
   - `styles/DashboardCards.css` - Component styling

---

## ✨ Features Summary

✅ 5 professional dashboard templates
✅ 10 reusable UI components
✅ Premium dark theme
✅ Fully responsive design
✅ Smooth animations & transitions
✅ Glassmorphism effects
✅ Color-coded metrics
✅ Progress indicators
✅ Status badges
✅ Custom CSS variables

---

Need help? Check the component JSX files for more examples and props!
