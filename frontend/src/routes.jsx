import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Main app layout
import RootLayout from './layouts/RootLayout';

// Page components
import HomePage from './pages/HomePage';
import ExecutiveSummaryPage from './pages/ExecutiveSummaryPage';
import AnalyticsFocusPage from './pages/AnalyticsFocusPage';
import PerformanceMetricsPage from './pages/PerformanceMetricsPage';
import MinimalCleanPage from './pages/MinimalCleanPage';
import GlassmorphismPage from './pages/GlassmorphismPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Loading fallback component shown while pages load
 */
const PageLoader = () => (
  <div 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh',
      color: 'var(--text-secondary)',
      fontSize: '0.95rem'
    }}
    role="status"
    aria-label="Loading page"
  >
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '2px solid var(--border)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }} />
      <span>Loading dashboard...</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

/**
 * Router configuration with all application routes
 * - Home page at root
 * - 5 dashboard templates under /dashboards/
 * - Catch-all 404 page for undefined routes
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          handle: {
            breadcrumb: () => 'Home',
          },
        },
        {
          path: 'dashboards/executive-summary',
          element: (
            <Suspense fallback={<PageLoader />}>
              <ExecutiveSummaryPage />
            </Suspense>
          ),
          handle: {
            breadcrumb: () => 'Executive Summary',
          },
        },
        {
          path: 'dashboards/analytics-focus',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AnalyticsFocusPage />
            </Suspense>
          ),
          handle: {
            breadcrumb: () => 'Analytics Focus',
          },
        },
        {
          path: 'dashboards/performance-metrics',
          element: (
            <Suspense fallback={<PageLoader />}>
              <PerformanceMetricsPage />
            </Suspense>
          ),
          handle: {
            breadcrumb: () => 'Performance Metrics',
          },
        },
        {
          path: 'dashboards/minimal-clean',
          element: (
            <Suspense fallback={<PageLoader />}>
              <MinimalCleanPage />
            </Suspense>
          ),
          handle: {
            breadcrumb: () => 'Minimal Clean',
          },
        },
        {
          path: 'dashboards/glassmorphism',
          element: (
            <Suspense fallback={<PageLoader />}>
              <GlassmorphismPage />
            </Suspense>
          ),
          handle: {
            breadcrumb: () => 'Glassmorphism',
          },
        },
      ],
    },
  ],
  {
    basename: '/',
  }
);

/**
 * Dashboard routes metadata for navigation menus and quick access
 * Each route includes path, label, description, and visual icon
 */
export const dashboardRoutes = [
  {
    path: '/dashboards/executive-summary',
    label: 'Executive Summary',
    description: 'High-level business metrics with cyan glow effects and professional KPI cards',
    icon: '📊',
    color: 'var(--accent-cyan)',
  },
  {
    path: '/dashboards/analytics-focus',
    label: 'Analytics Focus',
    description: 'Detailed analytics with metric rows, detailed comparisons, and trend analysis',
    icon: '📈',
    color: 'var(--primary)',
  },
  {
    path: '/dashboards/performance-metrics',
    label: 'Performance Metrics',
    description: 'Performance tracking with bold colors, gauges, and dynamic visualizations',
    icon: '⚡',
    color: 'var(--accent-orange)',
  },
  {
    path: '/dashboards/minimal-clean',
    label: 'Minimal Clean',
    description: 'Minimalist design with elegant typography and refined spacing',
    icon: '✨',
    color: 'var(--primary)',
  },
  {
    path: '/dashboards/glassmorphism',
    label: 'Glassmorphism',
    description: 'Modern glassmorphic cards with animated gradients and blur effects',
    icon: '🌌',
    color: 'var(--accent-cyan)',
  },
];

/**
 * Get a dashboard route by its path
 */
export const getDashboardRoute = (path) => {
  return dashboardRoutes.find((route) => route.path === path);
};
