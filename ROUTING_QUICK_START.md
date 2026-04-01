# Routing Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:5173/
```

---

## Route Overview

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Template showcase & upload |
| `/dashboards/executive-summary` | ExecutiveSummaryPage | High-level KPI dashboard |
| `/dashboards/analytics-focus` | AnalyticsFocusPage | Detailed analytics |
| `/dashboards/performance-metrics` | PerformanceMetricsPage | Performance tracking |
| `/dashboards/minimal-clean` | MinimalCleanPage | Minimalist design |
| `/dashboards/glassmorphism` | GlassmorphismPage | Modern glassmorphic design |
| `*` | NotFoundPage | 404 error page |

---

## Key Features

### Navigation
- **Header**: Sticky navigation with breadcrumbs
- **Sidebar**: Collapsible on mobile (<768px)
- **Links**: Use React Router `<Link>` component
- **Programmatic**: Use `useNavigate()` hook

### Theming
- **8 Themes**: Dark, Orange, Light, Midnight, Ocean, Forest, Rose, Sunset
- **Switcher**: Click button in top-right corner
- **Persistence**: Theme saved to localStorage
- **Variables**: All colors via CSS custom properties

### Responsive Design
- **Desktop**: 1024px+ (full layout)
- **Tablet**: 768-1023px (optimized layout)
- **Mobile**: <768px (sidebar hidden, drawer mode)
- **Touch**: Optimized for touch devices

---

## Common Tasks

### Navigate Programmatically
```javascript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const goToAnalytics = () => {
    navigate('/dashboards/analytics-focus');
  };
  
  return <button onClick={goToAnalytics}>View Analytics</button>;
}
```

### Check Current Route
```javascript
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboards/');
  
  return <div>{isDashboard ? 'Dashboard' : 'Home'}</div>;
}
```

### Use Theme
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <div>
      Current theme: {currentTheme}
      <button onClick={() => setTheme('light')}>Light Theme</button>
    </div>
  );
}
```

### Add New Route
```javascript
// 1. Create page component
// pages/NewPage.jsx

// 2. Add to dashboardRoutes in routes.jsx
export const dashboardRoutes = [
  // ... existing routes
  {
    path: '/dashboards/new-page',
    label: 'New Page',
    description: 'My new dashboard',
    icon: '📄',
  },
];

// 3. Add route to router
{
  path: 'dashboards/new-page',
  element: (
    <Suspense fallback={<PageLoader />}>
      <NewPage />
    </Suspense>
  ),
  handle: {
    breadcrumb: () => 'New Page',
  },
}
```

---

## File Locations

```
frontend/src/
├── routes.jsx                      # Route definitions
├── main.jsx                        # Entry point
├── context/ThemeContext.jsx        # Theme provider
├── layouts/RootLayout.jsx          # Main layout
├── pages/
│   ├── HomePage.jsx
│   ├── ExecutiveSummaryPage.jsx
│   ├── AnalyticsFocusPage.jsx
│   ├── PerformanceMetricsPage.jsx
│   ├── MinimalCleanPage.jsx
│   ├── GlassmorphismPage.jsx
│   ├── NotFoundPage.jsx
│   └── DashboardPage.css
└── components/ThemeSwitcher.jsx
```

---

## CSS Classes

### Layout
- `.root-layout` - Main container
- `.layout-header` - Sticky header
- `.layout-container` - Header + sidebar + main
- `.layout-sidebar` - Navigation sidebar
- `.layout-main` - Main content area

### Navigation
- `.app-brand` - Logo/app name
- `.app-breadcrumb` - Breadcrumb navigation
- `.nav-link` - Navigation links
- `.nav-link.active` - Active link

### Dashboard Pages
- `.dashboard-page` - Page container
- `.dashboard-page-header` - Title section
- `.dashboard-page-title` - Page title
- `.dashboard-page-description` - Subtitle

### Theme Switcher
- `.theme-switcher` - Container
- `.theme-toggle-btn` - Button
- `.theme-dropdown` - Menu
- `.theme-option` - Theme item
- `.theme-option.active` - Selected theme

---

## Debugging

### Check Routes
```javascript
import { dashboardRoutes } from './routes';
console.log('Available routes:', dashboardRoutes);
```

### Check Current Route
```javascript
import { useLocation } from 'react-router-dom';
const location = useLocation();
console.log('Current path:', location.pathname);
```

### Check Theme
```javascript
import { useTheme } from './context/ThemeContext';
const { currentTheme } = useTheme();
console.log('Current theme:', currentTheme);
```

### Check Device Width
```javascript
console.log('Mobile?', window.innerWidth < 768);
console.log('Tablet?', window.innerWidth >= 768 && window.innerWidth < 1024);
console.log('Desktop?', window.innerWidth >= 1024);
```

---

## Keyboard Shortcuts

- `Tab` - Navigate through links
- `Enter/Space` - Activate button/link
- `Escape` - Close dropdown menus
- `Home` - Jump to home page
- `F11` - Full screen (browser)

---

## Browser DevTools Tips

### React DevTools
```
Components tab → Click component → Props/Hooks
```

### Network Tab
- Check `/` loads fast (<200ms)
- Suspense lazy loads work properly
- No 404 errors on static assets

### Storage Tab
- Check `dashboard-theme` key for theme persistence
- Clear to reset theme to default

### Console
- No routing errors
- No theme variable warnings
- Check custom logs for debugging

---

## Performance Targets

- **First Load**: <2s
- **Page Load**: <500ms (after initial)
- **Theme Switch**: <100ms (instant visual feedback)
- **Navigation**: <300ms (smooth transition)

---

## Mobile Testing

### Chrome DevTools
1. Press `F12` to open dev tools
2. Click device icon (top-left)
3. Select device or custom dimensions
4. Test navigation and theme switcher

### iOS Safari
- Use iPhone/iPad simulator in Xcode
- Test on real device via USB

### Android
- Use Android emulator in Android Studio
- Test on real device via USB

---

## Troubleshooting

### Routes not working?
1. Check browser console for errors
2. Verify route paths match exactly
3. Ensure RouterProvider in main.jsx
4. Clear browser cache

### Theme not changing?
1. Check localStorage is enabled
2. Verify CSS variables applied
3. Check browser DevTools > Storage
4. Try incognito/private mode

### Sidebar not closing?
1. Check viewport width
2. Verify media query breakpoint
3. Test on actual mobile device
4. Check CSS media query syntax

### Pages slow to load?
1. Check Network tab in DevTools
2. Verify Suspense is working
3. Check file sizes
4. Enable DevTools > Performance recording

---

## Resources

- [React Router Docs](https://reactrouter.com)
- [React Hooks](https://react.dev/reference/react)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

## Support

For issues or questions:
1. Check console for errors
2. Review ROUTING_COMPLETE_GUIDE.md
3. Search browser history for similar issues
4. Test in incognito/private mode
5. Clear cache and restart dev server

---

**Last Updated**: 2024
**Status**: Production Ready ✓
