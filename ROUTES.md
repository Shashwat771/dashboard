# Dashboard Routes Documentation

This document describes all available routes in the DataViz AI dashboard application with their purposes and functionality.

## Route Structure

The application uses React Router v6 with a hierarchical route structure organized around dashboard templates.

### Root Routes

#### `/` - Home Page
**Purpose:** Landing page and main entry point
- Displays welcome message and project overview
- Lists all available dashboard templates
- Features section highlighting application benefits
- File upload section to generate dashboards
- Navigation to specific dashboard templates

**Component:** `HomePage.jsx`
**Features:**
- Hero section with gradient title
- Template showcase grid
- Feature highlights
- Call-to-action sections
- Upload integration

---

## Dashboard Template Routes

Each dashboard template has its own dedicated route and page component.

### `/dashboards/executive-summary` - Executive Summary Dashboard
**Purpose:** High-level business metrics and KPI overview
**Template Type:** Executive Summary
**Features:**
- Cyan glow effects on KPI cards
- Gradient top borders
- Large typography for metrics
- Executive-focused layout
- Quick insights at a glance

**Component:** `ExecutiveSummaryPage.jsx`
**Upload Path:** `/dashboards/executive-summary`

---

### `/dashboards/analytics-focus` - Analytics Focus Dashboard
**Purpose:** Detailed analytics with metric comparisons
**Template Type:** Analytics Focus
**Features:**
- Metric comparison items
- Left accent borders
- Smooth hover animations
- Light and stat rows layout
- Detailed data analysis view

**Component:** `AnalyticsFocusPage.jsx`
**Upload Path:** `/dashboards/analytics-focus`

---

### `/dashboards/performance-metrics` - Performance Metrics Dashboard
**Purpose:** Performance tracking and monitoring
**Template Type:** Performance Metrics
**Features:**
- Bold orange/yellow gradients
- Performance gauges
- Card elevation effects
- Progress visualization
- Real-time metric tracking

**Component:** `PerformanceMetricsPage.jsx`
**Upload Path:** `/dashboards/performance-metrics`

---

### `/dashboards/minimal-clean` - Minimal Clean Dashboard
**Purpose:** Minimalist design focused dashboard
**Template Type:** Minimal Clean
**Features:**
- Elegant typography
- Serif fonts (Sora, DM Sans)
- Refined spacing
- Clean visual hierarchy
- Professional appearance

**Component:** `MinimalCleanPage.jsx`
**Upload Path:** `/dashboards/minimal-clean`

---

### `/dashboards/glassmorphism` - Glassmorphism Dashboard
**Purpose:** Modern glassmorphic design dashboard
**Template Type:** Glassmorphism
**Features:**
- Blur effects (backdrop-filter)
- Animated gradients
- Cyan/green glow effects
- Modern aesthetic
- Smooth transitions

**Component:** `GlassmorphismPage.jsx`
**Upload Path:** `/dashboards/glassmorphism`

---

## Route Configuration Details

### Layout Hierarchy

```
RootLayout
├── Header (sticky, with navigation)
├── Sidebar (collapsible, template links)
└── Main Content Area
    └── Outlet (child routes)
        ├── HomePage
        ├── ExecutiveSummaryPage
        ├── AnalyticsFocusPage
        ├── PerformanceMetricsPage
        ├── MinimalCleanPage
        └── GlassmorphismPage
```

### Header Features
- Brand logo with icon
- Sidebar toggle button (mobile)
- Breadcrumb navigation
- Theme switcher
- Sticky positioning with blur backdrop

### Sidebar Features
- Dashboard template navigation
- Active route highlighting
- Icon and label for each template
- Description tooltips
- Mobile responsive (collapsible)
- Smooth transitions

### Navigation Configuration

All navigation routes are defined in `routes.jsx` in the `dashboardRoutes` array:

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
```

## Responsive Behavior

### Desktop (1024px+)
- Full sidebar visible (280px width)
- All navigation labels visible
- Descriptions shown in sidebar
- Main content extends full width minus sidebar

### Tablet (768px - 1023px)
- Sidebar width reduced to 240px
- All features remain visible
- Sidebar toggle appears on header

### Mobile (< 768px)
- Sidebar hidden by default
- Sidebar toggle button prominent
- Breadcrumb navigation hidden
- Full-width main content
- Sidebar slides in from left when opened
- Touch-friendly spacing

### Small Mobile (< 480px)
- Reduced header height
- Icon-only navigation in sidebar
- Descriptions hidden
- Optimized spacing

## Data Flow

### Upload Workflow
1. User navigates to any dashboard route
2. Dashboard page component displays FileUpload
3. User uploads CSV/JSON data
4. Data is processed and visualized
5. Dashboard renders with template-specific styling
6. User can download or switch templates

### Route Transitions
- Routes support smooth transitions
- Page loader shown during template switching
- Loading component displays while data processes
- Error boundaries catch issues

## URL Parameters (Future Enhancement)

Routes can be extended with query parameters:
```
/dashboards/executive-summary?data=chart-id&theme=dark
```

Potential parameters:
- `data` - Pre-load specific dataset
- `template` - Override template choice
- `theme` - Force theme (light/dark)
- `export` - Auto-export format

## Error Handling

### 404 - Not Found
When user navigates to invalid route, `NotFoundPage` displays:
- 404 error message
- Link back to home
- Styled error page

## Navigation Patterns

### From Home Page
1. Click "Upload Your Data" → Inline upload on home
2. Click template card → Navigate to template route
3. Upload data on template page → Dashboard renders

### Between Templates
1. Use sidebar navigation
2. Click different template
3. Previous data persists (can re-upload)
4. Dashboard re-renders with new template

### Back Navigation
1. "Back to Home" button on pages
2. Breadcrumb navigation
3. Sidebar home link
4. Browser back button

## API Integration

### Data Endpoints (Backend)
Routes are frontend-only. Backend APIs handled by:
- `Dashboard.jsx` - Chart generation
- `FileUpload.jsx` - File processing
- API calls to `http://localhost:3000` (configurable via `VITE_API_URL`)

## Development Routes

### Local Development
```bash
# Start dev server
npm run dev

# Routes available at:
# http://localhost:5173/
# http://localhost:5173/dashboards/executive-summary
# etc.
```

### Build & Deploy
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Route Best Practices

1. **Always use Link for navigation** - Preserves SPA behavior
2. **Use useLocation** - Get current route information
3. **Path consistency** - Keep paths in routes.jsx and dashboardRoutes in sync
4. **Lazy loading** - Routes use Suspense for code splitting (future)
5. **Error boundaries** - Catch and handle route errors gracefully

## Future Route Enhancements

1. **Dashboard Saving**
   - `/dashboards/:id` - View saved dashboard
   - `/dashboards/:id/edit` - Edit dashboard

2. **Template Customization**
   - `/customize/:templateId` - Customize template

3. **Admin Routes** (if needed)
   - `/admin/templates` - Manage templates
   - `/admin/analytics` - View analytics

4. **Authentication** (if needed)
   - `/login` - Login page
   - `/register` - Registration page
   - `/profile` - User profile

## Testing Routes

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] All template routes accessible
- [ ] Navigation between routes smooth
- [ ] Sidebar toggle works on mobile
- [ ] Breadcrumb updates correctly
- [ ] File upload works on each template page
- [ ] Back button returns to home
- [ ] 404 page shows for invalid routes
- [ ] Theme switching works across routes
- [ ] Responsive behavior at all breakpoints

---

**Last Updated:** April 1, 2026
**Maintainer:** DataViz AI Team
**Status:** Production Ready
