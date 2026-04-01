# Complete Routing Implementation Guide

## Overview

This document provides a comprehensive guide to the routing system implemented in the DataViz AI dashboard application. The routing is built using **React Router v6** with proper code organization, accessibility features, and responsive design.

---

## Architecture

### Route Structure

```
/                              → HomePage (template showcase & upload)
├── /dashboards/executive-summary     → ExecutiveSummaryPage
├── /dashboards/analytics-focus       → AnalyticsFocusPage
├── /dashboards/performance-metrics   → PerformanceMetricsPage
├── /dashboards/minimal-clean         → MinimalCleanPage
├── /dashboards/glassmorphism         → GlassmorphismPage
└── *                          → NotFoundPage (404)
```

### Layout Hierarchy

```
RootLayout (ThemeProvider wrapper)
├── Header (sticky navigation)
│   ├── Sidebar Toggle (mobile)
│   ├── App Brand
│   ├── Breadcrumb Navigation
│   └── Theme Switcher
├── Sidebar (responsive, collapsible)
│   └── Dashboard Navigation Links
└── Main Content Area (Outlet)
    └── Page Component
```

---

## File Structure

```
frontend/src/
├── routes.jsx                    # Route configuration & metadata
├── main.jsx                      # App entry point with RouterProvider
├── context/
│   └── ThemeContext.jsx         # Theme provider with 8 color themes
├── layouts/
│   ├── RootLayout.jsx           # Main layout wrapper
│   └── RootLayout.css           # Layout styles
├── pages/
│   ├── HomePage.jsx             # Landing page
│   ├── ExecutiveSummaryPage.jsx # Executive Summary dashboard
│   ├── AnalyticsFocusPage.jsx   # Analytics Focus dashboard
│   ├── PerformanceMetricsPage.jsx # Performance Metrics dashboard
│   ├── MinimalCleanPage.jsx     # Minimal Clean dashboard
│   ├── GlassmorphismPage.jsx    # Glassmorphism dashboard
│   ├── NotFoundPage.jsx         # 404 error page
│   ├── DashboardPage.css        # Shared dashboard page styles
│   └── NotFoundPage.css         # 404 page styles
└── components/
    ├── ThemeSwitcher.jsx        # Theme selection component
    └── ThemeSwitcher.css        # Theme switcher styles
```

---

## Key Components

### 1. Route Configuration (`routes.jsx`)

**Purpose**: Centralized route definitions with metadata

**Features**:
- Lazy loading with Suspense fallback
- Route metadata for breadcrumbs
- Dashboard routes array for navigation generation
- Helper function `getDashboardRoute(path)` to find routes

**Example**:
```javascript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // dashboard routes
    ]
  }
]);
```

### 2. Root Layout (`RootLayout.jsx`)

**Purpose**: Main application wrapper with persistent header and sidebar

**Features**:
- Sticky header with breadcrumb navigation
- Responsive sidebar (auto-collapse on mobile)
- Theme context provider
- Dynamic breadcrumb updates based on route
- Keyboard-accessible navigation

**Mobile Behavior**:
- Sidebar collapses below 768px
- Toggle button appears to expand/collapse
- Touch-optimized dimensions (44px minimum)

### 3. Theme Provider (`ThemeContext.jsx`)

**Purpose**: Global theme management with 8 color themes

**Available Themes**:
1. Dark (default, indigo primary)
2. Orange Blaze (warm, energetic)
3. Light (bright, professional)
4. Midnight Black (ultra-dark, purple primary)
5. Ocean Blue (cool, aquatic)
6. Forest Green (natural, growth-focused)
7. Rose Pink (vibrant, modern)
8. Sunset (warm, gradient-inspired)

**Features**:
- Persistent theme storage (localStorage)
- CSS variable injection
- System preference detection
- Smooth theme transitions

### 4. Dashboard Pages

All dashboard pages follow this pattern:

**Structure**:
```
Upload State: FileUpload component with instructions
Data State: Dashboard component with data visualization
```

**Features**:
- Consistent header with title and description
- Standardized CSS classes for styling
- Proper state management
- Accessibility attributes

---

## Routing Features

### 1. Breadcrumb Navigation

Automatically generated based on current route:
- Home > Executive Summary
- Home > Analytics Focus
- etc.

**Implementation**: Uses `useLocation()` and `dashboardRoutes` array

### 2. Responsive Sidebar

**Desktop (768px+)**:
- Always visible on left
- Width: 280px
- Permanent navigation

**Mobile (<768px)**:
- Hidden by default
- Toggle button in header
- Drawer-style presentation
- Auto-closes after navigation

### 3. Loading States

Suspense fallback shows:
- Loading spinner animation
- "Loading dashboard..." text
- Proper ARIA labels

### 4. Error Handling

404 page includes:
- Visual error icon
- Helpful error message
- Two action buttons (Home, Dashboards)
- Floating animation effect

---

## CSS Organization

### Design Tokens (via CSS Variables)

All colors are managed through CSS variables:
- `--primary`, `--primary-hover`, `--primary-light`
- `--accent`, `--accent-orange`, `--accent-cyan`
- `--bg-dark`, `--bg-card`, `--bg-elevated`
- `--border`, `--border-hover`, `--border-active`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--shadow-*` (glow effects)
- `--transition-*` (animation timings)

### Responsive Breakpoints

```css
Desktop: 1024px+
Tablet: 768px - 1023px
Mobile: 480px - 767px
Small Mobile: <480px
```

### Animations

- **pageSlideIn**: Page entrance (0.4s)
- **fadeInUp**: Content reveal (0.5s)
- **slideUpGrid**: Grid item animation (0.4s)
- **gradientShift**: Background animation (15s infinite)
- **float**: Error icon floating (3s infinite)

---

## Theme Switching

### User Interaction

1. Click theme button in header
2. Dropdown menu appears (desktop) or sheet slides up (mobile)
3. 8 theme options with color preview
4. Select theme to apply
5. Theme persists across sessions

### Theme Switcher Component

**Features**:
- Visual color preview
- Icon representation
- Currently selected indicator
- Keyboard-accessible
- Touch-optimized on mobile

---

## Navigation Patterns

### Programmatic Navigation

```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboards/executive-summary');
```

### Link Navigation

```javascript
import { Link } from 'react-router-dom';

<Link to="/dashboards/analytics-focus">Analytics</Link>
```

### Location Detection

```javascript
import { useLocation } from 'react-router-dom';

const location = useLocation();
const isHomePage = location.pathname === '/';
```

---

## Accessibility Features

### ARIA Attributes

- `role="banner"` on header
- `role="navigation"` on sidebar
- `role="main"` on main content
- `role="status"` on loading spinner
- `aria-label` on all buttons
- `aria-current="page"` on active nav items

### Keyboard Navigation

- Tab through navigation links
- Enter/Space to activate
- Escape to close dropdowns
- Focus indicators visible

### Screen Reader Support

- Semantic HTML structure
- Proper heading hierarchy
- Descriptive link text
- Form labels

---

## Performance Optimizations

### Code Splitting

Dashboard pages are wrapped in Suspense for lazy loading:
```javascript
<Suspense fallback={<PageLoader />}>
  <ExecutiveSummaryPage />
</Suspense>
```

### Route Metadata

Routes include `handle` properties for breadcrumbs:
```javascript
handle: {
  breadcrumb: () => 'Executive Summary',
}
```

### CSS Optimization

- CSS variables for theme switching (no page reloads)
- Hardware-accelerated animations (transform, opacity)
- Optimized media queries
- Minimal bundle size

---

## Mobile Optimizations

### Touch-Friendly Dimensions

- Minimum touch target: 44px
- Button padding: 8-12px
- Sidebar toggle visible on mobile
- Theme switcher drawer slides from bottom

### Responsive Typography

```css
Desktop: 2.2rem (titles), 1rem (body)
Tablet: 1.8rem (titles), 0.95rem (body)
Mobile: 1.5rem (titles), 0.9rem (body)
```

### Safe Area Padding

```css
/* For notched devices */
padding-bottom: max(24px, env(safe-area-inset-bottom))
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

**Features Used**:
- CSS Grid & Flexbox
- CSS Custom Properties (Variables)
- CSS Backdrop Filter
- Fetch API
- Local Storage

---

## Development Workflow

### Adding a New Dashboard Template

1. Create page component: `NewTemplatePage.jsx`
2. Add to `dashboardRoutes` in `routes.jsx`
3. Add route to router configuration
4. Create CSS file if needed
5. Test responsive behavior

### Adding a New Theme

1. Add theme colors to `themes` object in `ThemeContext.jsx`
2. Theme automatically appears in theme switcher
3. Update CSS variables on theme selection

### Debugging Routes

```javascript
// Check current location
const location = useLocation();
console.log('Current path:', location.pathname);

// Check route metadata
const route = getDashboardRoute(location.pathname);
console.log('Current route:', route);
```

---

## Common Issues & Solutions

### Issue: Sidebar not closing on mobile
**Solution**: Check if window.innerWidth < 768 logic is running

### Issue: Theme not persisting
**Solution**: Verify localStorage is enabled, check browser dev tools

### Issue: Breadcrumb not updating
**Solution**: Ensure route path matches `dashboardRoutes.path`

### Issue: Page not loading
**Solution**: Check browser console for errors, verify FileUpload component exists

---

## Future Enhancements

1. **Route-based Code Splitting**: Further optimize with dynamic imports
2. **Route Transitions**: Add page transition animations
3. **Deep Linking**: Support URL params for dashboard state
4. **Nested Routes**: Organize dashboards in subdirectories
5. **Route Guards**: Add authentication/permission checks
6. **Analytics**: Track page views and user navigation
7. **Offline Support**: Service workers for offline navigation
8. **Route Prefetching**: Preload next page on hover

---

## Summary

This routing implementation provides:
✓ Clean, maintainable route organization
✓ Responsive navigation with mobile support
✓ Accessible navigation patterns
✓ Theme switching functionality
✓ Loading states and error handling
✓ Performance optimizations
✓ Developer-friendly patterns

All components are production-ready and follow React best practices.
