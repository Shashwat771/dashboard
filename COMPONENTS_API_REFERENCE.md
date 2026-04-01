# 🎯 Quick Reference Card - Dashboard Templates & Components

## 📦 Import Statements

### Templates
```jsx
import { 
  DashboardTemplateSelector,
  ExecutiveSummaryTemplate,
  AnalyticsFocusTemplate,
  PerformanceMetricsTemplate,
  MinimalCleanTemplate,
  GlassmorphismTemplate,
} from '@/components/DashboardTemplates';
```

### Components (Cards & UI)
```jsx
import {
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
} from '@/components/DashboardCards';
```

### Layouts
```jsx
import {
  GridLayout,
  SidebarLayout,
  HeroLayout,
  CardGridLayout,
  SplitLayout,
  MasonryLayout,
  AccordionLayout,
  TabsLayout,
  WizardLayout,
  TimelineLayout,
  ComparisonLayout,
  KanbanLayout,
} from '@/components/DashboardLayouts';
```

---

## 🎨 Component API Cheat Sheet

### MetricCard
```jsx
<MetricCard
  label="Total Revenue"
  value="$125.4K"
  change={12.5}
  trend="up"
  color="var(--primary)"
  subtitle="vs last month"
/>
```

### StatBox
```jsx
<StatBox
  number={2.5}
  label="Growth Rate"
  unit="%"
  icon="📈"
/>
```

### ChartCard
```jsx
<ChartCard
  title="Revenue Trend"
  subtitle="Last 12 months"
  footer="Updated now"
  loading={false}
  compact={false}
>
  <YourChart />
</ChartCard>
```

### StatTracker
```jsx
<StatTracker items={[
  { label: 'Task A', percentage: 85, color: '#6366f1' },
  { label: 'Task B', percentage: 60, color: '#22c55e' },
]} />
```

### InfoPanel
```jsx
<InfoPanel
  type="success"
  title="Success"
  message="All good!"
  action={<button>OK</button>}
/>
```

### Badge
```jsx
<Badge variant="primary" size="md">Active</Badge>
```

### Section
```jsx
<Section
  title="Main Title"
  subtitle="Subtitle"
  action={<button>Export</button>}
>
  {children}
</Section>
```

### DataRow
```jsx
<DataRow
  icon="📊"
  label="Revenue"
  value="$45K"
  secondary="vs last week"
  highlight={true}
/>
```

### ResponsiveGrid
```jsx
<ResponsiveGrid cols={3} gap="24px" minWidth="300px">
  {items.map(item => <Card {...item} />)}
</ResponsiveGrid>
```

---

## 📐 Layout API Cheat Sheet

### SidebarLayout
```jsx
<SidebarLayout
  sidebar={<Sidebar />}
  sidebarWidth="300px"
  sidebarPosition="left"
>
  <MainContent />
</SidebarLayout>
```

### HeroLayout
```jsx
<HeroLayout
  title="Welcome"
  subtitle="Subtitle"
  stats={[{ value: '100K', label: 'Users' }]}
>
  {children}
</HeroLayout>
```

### TabsLayout
```jsx
<TabsLayout tabs={[
  { label: 'Tab 1', icon: '📊', content: <Content1 /> },
  { label: 'Tab 2', icon: '📈', content: <Content2 /> },
]} />
```

---

## 🎭 Templates

### DashboardTemplateSelector
```jsx
<DashboardTemplateSelector
  charts={chartData}
  metrics={metricData}
  selectedTemplate="executive"
  onTemplateChange={setTemplate}
/>
```

---

## 🚀 Quick Setup

### 1. Import Template
```jsx
import { DashboardTemplateSelector } from '@/components/DashboardTemplates';
```

### 2. Add to Component
```jsx
<DashboardTemplateSelector
  charts={charts}
  metrics={metrics}
  selectedTemplate={template}
  onTemplateChange={setTemplate}
/>
```

### 3. Customize via CSS Variables
```css
:root {
  --primary: #your-color;
  --bg-dark: #your-bg;
}
```

---

## 📁 Files Created

```
Components:
✓ DashboardTemplates.jsx    - 5 templates
✓ DashboardCards.jsx        - 10 components
✓ DashboardLayouts.jsx      - 12 layouts
✓ CompleteExampleDashboard.jsx - Examples

Styles:
✓ DashboardTemplates.css    - 800+ lines
✓ DashboardCards.css        - 600+ lines
✓ DashboardLayouts.css      - 700+ lines

Documentation:
✓ DASHBOARD_TEMPLATES_GUIDE.md
✓ DASHBOARD_ENHANCEMENT_SUMMARY.md
✓ COMPONENTS_API_REFERENCE.md
```

---

**Start using now:** Import → Customize → Deploy! 🚀
