# Development Guide - Dashboard Routes & Navigation

## Getting Started

### Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (includes new react-router-dom)
npm install

# Or with other package managers
yarn install
pnpm install
bun install
```

### Running the Application
```bash
# Development server
npm run dev

# Server starts at http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure Overview

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── routes.jsx                 ← Route configuration
│   │   ├── main.jsx                   ← Entry point (updated)
│   │   ├── App.jsx                    ← Old app (can be removed)
│   │   ├── layouts/
│   │   │   ├── RootLayout.jsx        ← Main layout wrapper
│   │   │   └── RootLayout.css        ← Layout styles
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── HomePage.css
│   │   │   ├── ExecutiveSummaryPage.jsx
│   │   │   ├── AnalyticsFocusPage.jsx
│   │   │   ├── PerformanceMetricsPage.jsx
│   │   │   ├── MinimalCleanPage.jsx
│   │   │   ├── GlassmorphismPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── components/                ← Existing components
│   │   ├── context/                   ← Theme context
│   │   └── styles/                    ← Global styles
│   ├── package.json                   ← Updated with react-router-dom
│   └── vite.config.js
├── ROUTES.md                          ← Route documentation
├── ROUTES_QUICK_REFERENCE.md         ← Quick lookup
├── ROUTING_IMPLEMENTATION.md          ← Implementation details
└── DEVELOPMENT_GUIDE.md               ← This file
```

## Understanding the Routing System

### Current Routes

| Route | Purpose | Component |
|-------|---------|-----------|
| `/` | Home page & template showcase | `HomePage.jsx` |
| `/dashboards/executive-summary` | Executive dashboard | `ExecutiveSummaryPage.jsx` |
| `/dashboards/analytics-focus` | Analytics dashboard | `AnalyticsFocusPage.jsx` |
| `/dashboards/performance-metrics` | Performance dashboard | `PerformanceMetricsPage.jsx` |
| `/dashboards/minimal-clean` | Minimal dashboard | `MinimalCleanPage.jsx` |
| `/dashboards/glassmorphism` | Glassmorphism dashboard | `GlassmorphismPage.jsx` |
| `*` | 404 Not Found | `NotFoundPage.jsx` |

### How Navigation Works

1. **Router Provider** (`main.jsx`)
   - Sets up BrowserRouter with routes
   - Provides routing context to entire app

2. **Root Layout** (`RootLayout.jsx`)
   - Wrapper for all pages
   - Contains persistent header and sidebar
   - Shows `<Outlet />` for child routes

3. **Page Components**
   - Each route has dedicated page component
   - Can have unique layout or data flow
   - Receives no props from router initially

4. **Navigation**
   - Sidebar links navigate between routes
   - Breadcrumb shows current location
   - Header stays consistent

## Adding a New Route

### Step 1: Create Page Component
Create `frontend/src/pages/NewPage.jsx`:

```jsx
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Dashboard from '../components/Dashboard';

export default function NewPage() {
  const [dashboardData, setDashboardData] = useState(null);

  return (
    <div>
      {!dashboardData ? (
        <div style={{ padding: '40px 20px' }}>
          <h1>New Dashboard Template</h1>
          <FileUpload onDashboardGenerated={setDashboardData} />
        </div>
      ) : (
        <Dashboard 
          dashboardData={dashboardData} 
          onBackClick={() => setDashboardData(null)}
        />
      )}
    </div>
  );
}
```

### Step 2: Update routes.jsx

```jsx
// Add import at top
import NewPage from './pages/NewPage';

// Add to router children array
{
  path: 'dashboards/new',
  element: <NewPage />,
}

// Add to dashboardRoutes array
{
  path: '/dashboards/new',
  label: 'New Template',
  description: 'Description of template',
  icon: '🎨',
}
```

### Step 3: Verify
- Route now appears in sidebar
- Accessible at `/dashboards/new`
- Breadcrumb updates automatically

## Modifying Existing Routes

### Change Route Path
1. Update `routes.jsx` - path in router config
2. Update `routes.jsx` - path in `dashboardRoutes` array
3. Update sidebar links automatically regenerate
4. Update any hardcoded links

### Change Page Content
1. Edit page component in `pages/` directory
2. Hot reload updates in dev server
3. No route config changes needed

### Change Navigation Label/Icon
1. Update `dashboardRoutes` array in `routes.jsx`
2. Sidebar regenerates automatically
3. Breadcrumb uses location.pathname, updates auto

## Working with Responsive Design

### Testing Different Screen Sizes

**Chrome DevTools:**
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select device or custom size
4. Test sidebar toggle and responsiveness

**Responsive Breakpoints:**
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px
- Small Mobile: < 480px

### CSS Media Queries

In `RootLayout.css`:

```css
/* Desktop (default) */
.layout-sidebar {
  width: 280px;
  position: relative;
}

/* Tablet */
@media (max-width: 1024px) {
  .layout-sidebar {
    width: 240px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .layout-sidebar {
    position: fixed;
    left: -280px; /* Hidden */
  }
  
  .layout-sidebar.open {
    left: 0; /* Visible */
  }
}
```

## Working with Navigation

### Using Link Component
```jsx
import { Link } from 'react-router-dom';

// In JSX
<Link to="/dashboards/executive-summary">
  Executive Summary
</Link>
```

### Using useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate on button click
<button onClick={() => navigate('/dashboards/analytics-focus')}>
  Go to Analytics
</button>
```

### Getting Current Route
```jsx
import { useLocation } from 'react-router-dom';

const location = useLocation();

// Check current path
if (location.pathname === '/') {
  // On home page
}

// Get path for styling
const isActive = location.pathname === '/dashboards/executive-summary';
```

## Styling Guide

### Using Design Tokens
```css
/* All colors use CSS custom properties */
.component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
}
```

### Common Design Tokens
- `--bg-dark` - Main background color
- `--bg-card` - Card/surface backgrounds
- `--bg-elevated` - Elevated surfaces (header)
- `--text-primary` - Main text color
- `--text-secondary` - Secondary text
- `--text-muted` - Muted text
- `--primary` - Brand primary color
- `--accent-*` - Accent colors (cyan, orange, etc)
- `--border` - Border color
- `--shadow-*` - Shadow effects
- `--radius-*` - Border radius values
- `--transition-*` - Transition durations

### Responsive Classes
```css
/* Mobile first */
.component {
  padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: 32px;
  }
}
```

## Common Development Tasks

### Task: Add a Link to Navigate
```jsx
import { Link } from 'react-router-dom';

<Link to="/dashboards/minimal-clean" className="template-card">
  View Minimal Clean Dashboard
</Link>
```

### Task: Highlight Active Route
```jsx
import { useLocation } from 'react-router-dom';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  );
}
```

### Task: Navigate Programmatically
```jsx
import { useNavigate } from 'react-router-dom';

function UploadButton() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/dashboards/performance-metrics')}>
      Performance Metrics
    </button>
  );
}
```

### Task: Get Query Parameters
```jsx
import { useSearchParams } from 'react-router-dom';

function MyComponent() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  
  return <div>{templateId}</div>;
}
```

## Testing Routes

### Manual Testing Checklist
- [ ] All routes load without errors
- [ ] Navigation between routes smooth
- [ ] Breadcrumb updates correctly
- [ ] Sidebar toggle works on mobile
- [ ] Theme switcher works on all routes
- [ ] File upload works on each template
- [ ] 404 page shows for invalid routes
- [ ] Responsive design at all breakpoints
- [ ] Links work correctly
- [ ] Back button returns to correct page

### Testing Commands
```bash
# Check for errors
npm run lint

# Build for production (catches errors)
npm run build

# Preview production build
npm run preview
```

## Debugging Tips

### Check Current Route
```jsx
import { useLocation } from 'react-router-dom';

// In any component
const location = useLocation();
console.log('Current path:', location.pathname);
```

### Debug Navigation Issues
1. Check `routes.jsx` for correct paths
2. Verify Link `to` prop matches route path
3. Check component exports are correct
4. Look for typos in route paths
5. Use browser DevTools to check console

### Check Responsive Design
```jsx
// Log window size in component
useEffect(() => {
  const handleResize = () => {
    console.log('Window width:', window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## Performance Optimization

### Code Splitting (Future)
To lazy load route components:

```jsx
import { lazy, Suspense } from 'react';

const ExecutiveSummaryPage = lazy(() => 
  import('./pages/ExecutiveSummaryPage')
);

// In route config
{
  path: 'dashboards/executive-summary',
  element: (
    <Suspense fallback={<LoadingSpinner />}>
      <ExecutiveSummaryPage />
    </Suspense>
  ),
}
```

### Optimize Large Lists
```jsx
// Use key prop for list items
{items.map((item) => (
  <Link key={item.id} to={`/item/${item.id}`}>
    {item.name}
  </Link>
))}
```

## Deployment

### Building for Production
```bash
npm run build
```

This creates `dist/` folder with optimized build.

### Environment Variables
Create `.env` file:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```js
const API_BASE = import.meta.env.VITE_API_URL
```

### Hosting
Routes work with any static hosting:
- Vercel
- Netlify
- GitHub Pages (with basename)
- AWS S3
- Traditional web server

## Troubleshooting

### Routes Not Showing
1. Check `routes.jsx` syntax
2. Verify imports are correct
3. Check component names match
4. Look for typos in paths

### 404 on Page Refresh
- Normal for client-side routing
- Configure server to serve `index.html`
- Use server redirects for all routes to `index.html`

### Sidebar Not Toggling
1. Check JavaScript console for errors
2. Verify `sidebarOpen` state updates
3. Check CSS media query breakpoints
4. Test in DevTools device mode

### Breadcrumb Not Updating
1. Check `useLocation()` hook usage
2. Verify route paths in `dashboardRoutes`
3. Check component uses correct path

## Resources

- [React Router Documentation](https://reactrouter.com)
- [React Hooks Documentation](https://react.dev/reference/react)
- [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Web Accessibility](https://www.w3.org/WAI/ARIA/)

## Getting Help

### Documentation Files
- `ROUTES.md` - Comprehensive routes documentation
- `ROUTES_QUICK_REFERENCE.md` - Quick lookup guide
- `ROUTING_IMPLEMENTATION.md` - Implementation details

### Check These First
1. Does route exist in `routes.jsx`?
2. Does page component exist?
3. Are imports correct?
4. Check console for errors
5. Clear browser cache and restart dev server

---

**Last Updated:** April 1, 2026
**Framework:** React 19.2.4 + React Router v6
**Status:** ✅ Production Ready
