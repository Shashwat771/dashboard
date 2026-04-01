import { lazy, Suspense } from 'react';
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

// Loading component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '80vh',
    color: '#8b95a5'
  }}>
    <span>Loading dashboard...</span>
  </div>
);

// Routes configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'dashboards/executive-summary',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExecutiveSummaryPage />
          </Suspense>
        ),
      },
      {
        path: 'dashboards/analytics-focus',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AnalyticsFocusPage />
          </Suspense>
        ),
      },
      {
        path: 'dashboards/performance-metrics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PerformanceMetricsPage />
          </Suspense>
        ),
      },
      {
        path: 'dashboards/minimal-clean',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MinimalCleanPage />
          </Suspense>
        ),
      },
      {
        path: 'dashboards/glassmorphism',
        element: (
          <Suspense fallback={<PageLoader />}>
            <GlassmorphismPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const dashboardRoutes = [
  {
    path: '/dashboards/executive-summary',
    label: 'Executive Summary',
    description: 'High-level business metrics with cyan glow effects',
    icon: '📊',
  },
  {
    path: '/dashboards/analytics-focus',
    label: 'Analytics Focus',
    description: 'Detailed analytics with metric comparisons',
    icon: '📈',
  },
  {
    path: '/dashboards/performance-metrics',
    label: 'Performance Metrics',
    description: 'Performance tracking with bold visualizations',
    icon: '⚡',
  },
  {
    path: '/dashboards/minimal-clean',
    label: 'Minimal Clean',
    description: 'Minimalist design with elegant typography',
    icon: '✨',
  },
  {
    path: '/dashboards/glassmorphism',
    label: 'Glassmorphism',
    description: 'Modern glassmorphism with animated gradients',
    icon: '🌌',
  },
];
