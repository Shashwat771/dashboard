# Routes Visual Map - Navigation Overview

## 🗺️ Application Route Map

```
┌─────────────────────────────────────────────────────────────┐
│                    RouterProvider                           │
│                   (from routes.jsx)                         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   RootLayout                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Sticky Header (sticky, always visible)       │  │
│  │  ┌──────────┬──────────────────┬──────────────────┐  │  │
│  │  │   Logo   │  Breadcrumb Nav  │  Theme Switcher  │  │  │
│  │  └──────────┴──────────────────┴──────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Main Container                          │  │
│  │  ┌────────────────┬──────────────────────────────┐  │  │
│  │  │   Sidebar      │      Outlet / Page Content   │  │  │
│  │  │                │                              │  │  │
│  │  │ • Templates    │  ↓ (Current Route)           │  │  │
│  │  │ • Navigation   │                              │  │  │
│  │  │ • Icons        │ ┌──────────────────────────┐ │  │  │
│  │  │ • Descriptions │ │ HomePage                 │ │  │  │
│  │  │                │ │ AnalyticsFocusPage       │ │  │  │
│  │  │  (Collapsible  │ │ ExecutiveSummaryPage     │ │  │  │
│  │  │   on mobile)   │ │ PerformanceMetricsPage   │ │  │  │
│  │  │                │ │ MinimalCleanPage         │ │  │  │
│  │  │                │ │ GlassmorphismPage        │ │  │  │
│  │  │                │ │ NotFoundPage (404)       │ │  │  │
│  │  │                │ └──────────────────────────┘ │  │  │
│  │  └────────────────┴──────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📍 Route Navigation Tree

```
Root (/)
│
├─ / (Home Page)
│  ├─ Hero Section
│  ├─ Template Showcase Grid (5 cards)
│  ├─ Features Section (6 cards)
│  ├─ CTA Section
│  └─ File Upload Integration
│
├─ /dashboards/executive-summary (Executive Summary)
│  ├─ File Upload
│  └─ Dashboard Rendering
│     └─ Template: ExecutiveSummaryTemplate
│
├─ /dashboards/analytics-focus (Analytics Focus)
│  ├─ File Upload
│  └─ Dashboard Rendering
│     └─ Template: AnalyticsFocusTemplate
│
├─ /dashboards/performance-metrics (Performance)
│  ├─ File Upload
│  └─ Dashboard Rendering
│     └─ Template: PerformanceMetricsTemplate
│
├─ /dashboards/minimal-clean (Minimal Clean)
│  ├─ File Upload
│  └─ Dashboard Rendering
│     └─ Template: MinimalCleanTemplate
│
├─ /dashboards/glassmorphism (Glassmorphism)
│  ├─ File Upload
│  └─ Dashboard Rendering
│     └─ Template: GlassmorphismTemplate
│
└─ * (Not Found - 404)
   └─ Error Page with home link
```

## 🎯 Navigation Flow Diagram

```
START (App Launch)
    │
    ▼
┌─────────────────────┐
│   Home Page (/)     │
│                     │
│ • Template Cards    │
│ • Features          │
│ • File Upload       │
└────┬────────────────┘
     │
     ├─────┬─────────┬─────────┬──────────┬──────────┐
     │     │         │         │          │          │
     ▼     ▼         ▼         ▼          ▼          ▼
   Exec  Analytics Perform  Minimal  Glassmorphism
   Sum   Focus     Metrics  Clean    
   
   ↓      ↓        ↓        ↓       ↓
   
Each Route:
  ┌──────────────────────┐
  │ Dashboard Page       │
  │ Upload Section       │
  │ Dashboard Rendering  │
  └──────────────────────┘
        ↓
  ┌──────────────────────┐
  │ Back to Home Link    │
  │ Navigate to Other    │
  │ Template via Sidebar │
  └──────────────────────┘
```

## 🎨 Component Structure

```
RootLayout (src/layouts/RootLayout.jsx)
│
├─ Header (sticky)
│  ├─ SidebarToggle (mobile only)
│  ├─ Brand Logo + Link
│  ├─ Breadcrumb Navigation
│  └─ ThemeSwitcher
│
├─ Sidebar (collapsible on mobile)
│  └─ Navigation Links
│     ├─ Home Link
│     ├─ Executive Summary Link
│     ├─ Analytics Focus Link
│     ├─ Performance Metrics Link
│     ├─ Minimal Clean Link
│     └─ Glassmorphism Link
│
└─ MainContent (overflow-y: auto)
   └─ Outlet
      └─ Current Page Component
         ├─ HomePage
         ├─ ExecutiveSummaryPage
         ├─ AnalyticsFocusPage
         ├─ PerformanceMetricsPage
         ├─ MinimalCleanPage
         ├─ GlassmorphismPage
         └─ NotFoundPage
```

## 📱 Responsive Layout Changes

```
DESKTOP (1024px+)
┌─────────────────────────────────┐
│  Header (full width, sticky)    │
├────────┬───────────────────────┤
│        │                       │
│ Sidebar│   Main Content        │
│ 280px  │   (1fr)               │
│        │                       │
│        │                       │
│        │                       │
└────────┴───────────────────────┘

TABLET (768px - 1023px)
┌──────────────────────────────┐
│  Header (full width, sticky) │
├──────┬──────────────────────┤
│      │                      │
│Sidebar│   Main Content       │
│ 240px │   (1fr)              │
│      │                      │
│      │                      │
└──────┴──────────────────────┘

MOBILE (<768px)
┌────────────────────────────┐
│  Header (toggle button)    │ ← Hamburger menu
├────────────────────────────┤
│                            │
│   Main Content             │
│   (full width, 1fr)        │
│                            │
│                            │
├─────────────────────────────
 
[Sidebar slides in from left when toggled]
```

## 🔄 Data Flow - File Upload to Dashboard

```
User on Dashboard Page
         │
         ▼
┌──────────────────┐
│ FileUpload       │
│ Component        │
│ (upload CSV/JSON)│
└────────┬─────────┘
         │
         ▼ (onDashboardGenerated)
┌──────────────────────┐
│ dashboardData        │
│ (state update)       │
└────────┬─────────────┘
         │
         ▼ (Conditional Render)
┌──────────────────────┐
│ Dashboard Component  │
│ • Chart.js           │
│ • Tables             │
│ • Templates          │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Template-Specific    │
│ Styling Applied      │
│ (CSS from styles/)   │
└──────────────────────┘
```

## 🎯 Sidebar Navigation - Auto-Generated

```javascript
dashboardRoutes Array (routes.jsx)
            │
            ├─ { path, label, description, icon }
            ├─ { path, label, description, icon }
            ├─ { path, label, description, icon }
            ├─ { path, label, description, icon }
            └─ { path, label, description, icon }
                      │
                      ▼
            Sidebar Maps & Renders
                      │
            ┌─────────┴──────────┐
            │                    │
            ▼                    ▼
        Active Link          Inactive Links
        (highlighted)        (normal)
```

## 🎬 Navigation Sequence

```
1. App Loads
   └─ RouterProvider created
      └─ Routes configured
         └─ RootLayout rendered

2. User at Home (/)
   └─ HomePage displays
      ├─ Hero section
      ├─ Template cards
      └─ Features

3. User Clicks Template Card (Link)
   └─ Route changes to /dashboards/[template]
      └─ RootLayout stays (persistent)
         ├─ Header updates breadcrumb
         ├─ Sidebar shows active link
         └─ Page component loads

4. User Uploads Data
   └─ FileUpload processes file
      └─ Dashboard component renders
         └─ Template styling applied

5. User Navigates to Another Template
   └─ Click sidebar link
      └─ Route changes
         └─ Same pattern repeats
```

## 🎨 Header - Responsive Transformation

```
DESKTOP (1024px+)
┌────────────────────────────────────────────────────┐
│ [LOGO] DataViz AI │ Home > Dashboard │ [THEME] │
└────────────────────────────────────────────────────┘

TABLET (768px - 1023px)
┌──────────────────────────────────────────────────┐
│ [≡] [LOGO] DataViz AI │ Home > Dashboard │ [THEME] │
└──────────────────────────────────────────────────┘

MOBILE (<768px)
┌────────────────────────────────────────────┐
│ [≡] [LOGO] DataViz AI         [THEME] │
└────────────────────────────────────────────┘
^ Hamburger menu        (Breadcrumb hidden)
```

## 📊 Template Route Mapping

```
Route Path                          Page Component                    Template Component
│                                   │                                 │
├─ /                               HomePage.jsx                       (no template)
│
├─ /dashboards/
│  ├─ executive-summary            ExecutiveSummaryPage.jsx          ExecutiveSummaryTemplate
│  ├─ analytics-focus              AnalyticsFocusPage.jsx            AnalyticsFocusTemplate
│  ├─ performance-metrics          PerformanceMetricsPage.jsx        PerformanceMetricsTemplate
│  ├─ minimal-clean                MinimalCleanPage.jsx              MinimalCleanTemplate
│  └─ glassmorphism                GlassmorphismPage.jsx             GlassmorphismTemplate
│
└─ * (404)                          NotFoundPage.jsx                 (error page)
```

## 🎯 Breadcrumb Auto-Update

```
Route Changes → useLocation() Hook Updates
                        │
                        ▼
            Check location.pathname
                        │
         ┌──────────────┼──────────────┐
         │              │              │
         ▼              ▼              ▼
     Is "/"         Is Known      Is Unknown
        │            Route         Route
        │              │              │
        ▼              ▼              ▼
    Home           Dashboard       404
                    Name           Error
```

## 🔐 Error Handling Flow

```
User navigates to /invalid-route
         │
         ▼
Router matches routes
         │
         ▼
No match found
         │
         ▼
errorElement: <NotFoundPage />
         │
         ▼
404 Page renders with:
├─ Error message
├─ Link to home
└─ Styled error page
```

## 📱 Sidebar Toggle Behavior

```
Desktop (1024px+)
└─ Sidebar: fixed visible (280px)
   └─ Toggle: hidden

Tablet (768px-1023px)
└─ Sidebar: fixed visible (240px)
   └─ Toggle: visible

Mobile (<768px)
└─ Sidebar: fixed hidden (left: -280px)
   └─ Toggle: visible
      └─ On click: slides in (left: 0)

Small Mobile (<480px)
└─ Sidebar: icon-only
   └─ No descriptions
   └─ Reduced padding
```

## 🎬 Animation & Transition Events

```
Route Navigation
     │
     ▼
Page Transition Begins
     │
     ├─ Header breadcrumb updates (instant)
     ├─ Sidebar active link updates (instant)
     ├─ Main content begins exit animation
     │
     ▼
New Page Loads
     │
     ├─ Fade in animation (0.6s)
     ├─ Card entrance animations (0.5s)
     ├─ Grid items stagger (delay based)
     │
     ▼
All Animations Complete
```

## 🎯 Navigation Priority

```
1. Use React Router's <Link> component
   └─ Preserves SPA behavior
   └─ Prevents full page reload

2. Use useNavigate() for programmatic nav
   └─ Navigate after actions
   └─ Go back button functionality

3. Avoid href="" or <a> tags
   └─ Causes full page reload
   └─ Loses React state

4. Check route exists before navigating
   └─ Use routes.jsx as source of truth
   └─ Prevent broken links
```

## 📈 Sidebar Generation

```
dashboardRoutes Array
[
  { path, label, description, icon },
  { path, label, description, icon },
  ...
]
       │
       ▼
.map() over array
       │
    ┌──┴──┬──┬──┐
    │     │  │  │
    ▼     ▼  ▼  ▼
  Link  Nav Desc Icon
  to=   Link Text
  path
       │
       ▼
<nav> renders
with Links
```

---

## 🎓 Quick Reference

**Home Page:** `/` → HomePage.jsx
**5 Templates:** `/dashboards/{name}` → PageName.jsx
**Error Page:** `/invalid-route` → NotFoundPage.jsx

**Sidebar:** Auto-generates from dashboardRoutes array
**Breadcrumb:** Auto-updates via useLocation() hook
**Theme:** Global ThemeSwitcher available on all routes

**Mobile:** Sidebar hidden, toggle button visible
**Tablet:** Sidebar reduced size, toggle available
**Desktop:** Full sidebar always visible

---

**Last Updated:** April 1, 2026
**Status:** ✅ Complete
