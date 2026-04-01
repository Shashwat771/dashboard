import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { dashboardRoutes } from '../routes';
import '../layouts/RootLayout.css';

export default function RootLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const isHomePage = location.pathname === '/';
  const currentDashboard = dashboardRoutes.find(r => r.path === location.pathname);

  return (
    <ThemeProvider>
      <div className="root-layout">
        {/* ── Global Header ── */}
        <header className="layout-header" role="banner">
          <div className="layout-header-inner">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="app-brand">
              <div className="app-brand-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                </svg>
              </div>
              <Link to="/" className="app-brand-text">DataViz AI</Link>
            </div>

            {/* ── Breadcrumb ── */}
            <nav className="app-breadcrumb" aria-label="Breadcrumb">
              <Link to="/" className="bc-item">Home</Link>
              {currentDashboard && (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bc-sep" aria-hidden="true">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  <span className="bc-item bc-current">{currentDashboard.label}</span>
                </>
              )}
            </nav>

            <ThemeSwitcher />
          </div>
        </header>

        <div className="layout-container">
          {/* ── Sidebar Navigation ── */}
          {!isHomePage && (
            <aside className={`layout-sidebar ${sidebarOpen ? 'open' : 'closed'}`} role="navigation" aria-label="Dashboard navigation">
              <nav className="sidebar-nav">
                <div className="nav-section">
                  <h3 className="nav-section-title">Dashboard Templates</h3>
                  <ul className="nav-list">
                    {dashboardRoutes.map((route) => (
                      <li key={route.path}>
                        <Link 
                          to={route.path}
                          className={`nav-link ${location.pathname === route.path ? 'active' : ''}`}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              setSidebarOpen(false);
                            }
                          }}
                        >
                          <span className="nav-icon">{route.icon}</span>
                          <span className="nav-label">{route.label}</span>
                        </Link>
                        <p className="nav-description">{route.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>
          )}

          {/* ── Main Content ── */}
          <main className="layout-main" id="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
