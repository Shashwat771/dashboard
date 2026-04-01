# Routes Quick Reference

## Available Routes

| Route | Name | Purpose | Icon |
|-------|------|---------|------|
| `/` | Home | Landing page, template showcase | 🏠 |
| `/dashboards/executive-summary` | Executive Summary | High-level KPI dashboard | 📊 |
| `/dashboards/analytics-focus` | Analytics Focus | Detailed analytics view | 📈 |
| `/dashboards/performance-metrics` | Performance Metrics | Performance tracking | ⚡ |
| `/dashboards/minimal-clean` | Minimal Clean | Minimalist design | ✨ |
| `/dashboards/glassmorphism` | Glassmorphism | Modern glass effect | 🌌 |

## Route File Structure

```
frontend/src/
├── routes.jsx                    # Main route configuration
├── layouts/
│   ├── RootLayout.jsx           # Main layout wrapper
│   └── RootLayout.css           # Layout styles
├── pages/
│   ├── HomePage.jsx              # Home page
│   ├── ExecutiveSummaryPage.jsx
│   ├── AnalyticsFocusPage.jsx
│   ├── PerformanceMetricsPage.jsx
│   ├── MinimalCleanPage.jsx
│   ├── GlassmorphismPage.jsx
│   ├── NotFoundPage.jsx          # 404 page
│   └── HomePage.css              # Home page styles
└── components/
    ├── Dashboard.jsx             # Main dashboard component
    ├── FileUpload.jsx            # Data upload component
    └── DashboardTemplates.jsx    # Template components
```

## Quick Navigation

### From Home Page
```
/ (Home)
  ├── 📊 Executive Summary
  ├── 📈 Analytics Focus
  ├── ⚡ Performance Metrics
  ├── ✨ Minimal Clean
  └── 🌌 Glassmorphism
```

### Route Configuration in Code

**routes.jsx:**
```javascript
export const dashboardRoutes = [
  {
    path: '/dashboards/executive-summary',
    label: 'Executive Summary',
    description: 'High-level business metrics with cyan glow effects',
    icon: '📊',
  },
  // ... more routes
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dashboards/executive-summary', element: <ExecutiveSummaryPage /> },
      // ... more routes
    ],
  },
]);
```

## Navigation Examples

### Using Link Component
```jsx
import { Link } from 'react-router-dom';

<Link to="/dashboards/executive-summary">
  Executive Summary
</Link>
```

### Using useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboards/analytics-focus');
```

### Using useLocation Hook
```jsx
import { useLocation } from 'react-router-dom';

const location = useLocation();
if (location.pathname === '/') {
  // Home page logic
}
```

## Template-Specific Routes

### Executive Summary Route
- **Path:** `/dashboards/executive-summary`
- **Component:** `ExecutiveSummaryPage.jsx`
- **Template Type:** `ExecutiveSummaryTemplate`
- **Key Features:** Cyan glow, KPI cards, executive metrics

### Analytics Focus Route
- **Path:** `/dashboards/analytics-focus`
- **Component:** `AnalyticsFocusPage.jsx`
- **Template Type:** `AnalyticsFocusTemplate`
- **Key Features:** Metric rows, comparisons, detailed view

### Performance Metrics Route
- **Path:** `/dashboards/performance-metrics`
- **Component:** `PerformanceMetricsPage.jsx`
- **Template Type:** `PerformanceMetricsTemplate`
- **Key Features:** Bold colors, gauges, performance tracking

### Minimal Clean Route
- **Path:** `/dashboards/minimal-clean`
- **Component:** `MinimalCleanPage.jsx`
- **Template Type:** `MinimalCleanTemplate`
- **Key Features:** Elegant typography, minimal design

### Glassmorphism Route
- **Path:** `/dashboards/glassmorphism`
- **Component:** `GlassmorphismPage.jsx`
- **Template Type:** `GlassmorphismTemplate`
- **Key Features:** Blur effects, animated gradients, modern

## Sidebar Navigation Configuration

The sidebar automatically generates from `dashboardRoutes`:

```javascript
{dashboardRoutes.map((route) => (
  <Link key={route.path} to={route.path}>
    <span className="nav-icon">{route.icon}</span>
    <span className="nav-label">{route.label}</span>
  </Link>
))}
```

## Breadcrumb Navigation

Breadcrumbs update based on current route:

```
/ > Home
/ > 📊 Executive Summary
/ > 📈 Analytics Focus
/ > ⚡ Performance Metrics
/ > ✨ Minimal Clean
/ > 🌌 Glassmorphism
```

## Mobile Navigation (< 768px)

- Sidebar hidden by default
- Toggle button in header
- Breadcrumb navigation hidden
- Full-width main content
- Sidebar slides in from left

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Desktop | 1024px+ | Full sidebar visible |
| Tablet | 768px - 1023px | Sidebar reduced to 240px |
| Mobile | < 768px | Sidebar hidden, toggle button |
| Small Mobile | < 480px | Icon-only sidebar, reduced header |

## Environment Configuration

The application uses environment variables (configured in `vite.config.js`):

```javascript
VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:3000'
```

## Common Route Operations

### Navigate to Dashboard
```jsx
<Link to="/dashboards/executive-summary">View Dashboard</Link>
```

### Get Current Route
```jsx
import { useLocation } from 'react-router-dom';
const location = useLocation();
const isHome = location.pathname === '/';
```

### Navigate Programmatically
```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboards/analytics-focus');
```

### Check if Route Active
```jsx
import { useLocation } from 'react-router-dom';
const location = useLocation();
const isActive = location.pathname === '/dashboards/executive-summary';
```

## Development Workflow

### Adding a New Route
1. Create page component in `src/pages/`
2. Add route to `routes.jsx`
3. Add to `dashboardRoutes` array if dashboard template
4. Update sidebar navigation
5. Create layout/styles if needed

### Modifying Existing Route
1. Edit page component in `src/pages/`
2. Update `routes.jsx` if path changes
3. Update `dashboardRoutes` if metadata changes
4. Test navigation and breadcrumbs

### Testing Routes
```bash
# Local development
npm run dev

# Navigate to:
# http://localhost:5173/
# http://localhost:5173/dashboards/executive-summary
# etc.
```

## Error Handling

- **404 Not Found:** Navigates to `NotFoundPage`
- **Route Errors:** Error boundary catches issues
- **Page Loading:** Suspense shows loading state

## Future Route Enhancements

- Dashboard saving with unique IDs
- Template customization routes
- Admin dashboard routes
- User authentication routes
- API integration routes

---

**Quick Links:**
- [Full Routes Documentation](./ROUTES.md)
- [Dashboard Implementation](./frontend/src/components/Dashboard.jsx)
- [Layout Implementation](./frontend/src/layouts/RootLayout.jsx)
