import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { dashboardRoutes } from '../routes';
import './HomePage.css';
import { useState } from 'react';

export default function HomePage() {
  const [showUpload, setShowUpload] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const handleDashboardGenerated = (data) => {
    setDashboardData(data);
    setShowUpload(false);
  };

  if (dashboardData) {
    return (
      <div className="home-page">
        <div className="generated-dashboard">
          <div className="generated-header">
            <h2>Generated Dashboard</h2>
            <button 
              className="back-btn"
              onClick={() => setDashboardData(null)}
            >
              ← Back to Templates
            </button>
          </div>
          <FileUpload onDashboardGenerated={handleDashboardGenerated} initialData={dashboardData} />
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Universal Dashboard Blueprint</h1>
          <p className="hero-subtitle">
            Explore 5 beautiful dashboard templates with professional design, 
            smooth interactions, and responsive layouts.
          </p>
          
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setShowUpload(!showUpload)}
            >
              {showUpload ? 'Hide Upload' : 'Upload Your Data'}
            </button>
            <p className="hero-secondary">Or choose a template to explore below</p>
          </div>

          {showUpload && (
            <div className="upload-section">
              <FileUpload onDashboardGenerated={handleDashboardGenerated} />
            </div>
          )}
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-section">
        <div className="section-header">
          <h2>Dashboard Templates</h2>
          <p>Handcrafted designs optimized for different use cases and aesthetics</p>
        </div>

        <div className="templates-grid">
          {dashboardRoutes.map((route) => (
            <Link key={route.path} to={route.path} className="template-card">
              <div className="template-icon">{route.icon}</div>
              <h3 className="template-name">{route.label}</h3>
              <p className="template-description">{route.description}</p>
              <div className="template-cta">
                <span>Explore Template</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why DataViz AI?</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Beautiful Design</h3>
            <p>Carefully crafted UI with modern aesthetics, smooth transitions, and polished interactions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Layout</h3>
            <p>Optimized for all screen sizes with mobile-first design and adaptive grids.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>High Performance</h3>
            <p>Fast rendering with optimized charts, lazy loading, and efficient state management.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Theme Support</h3>
            <p>Built-in light and dark themes with customizable design tokens and color palettes.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Rich Charts</h3>
            <p>Multiple chart types including bars, lines, pies, and scatter plots with full customization.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>All data processing happens on your device. No data is stored or transmitted.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Create Your Dashboard?</h2>
        <p>Upload your data and choose from 5 beautiful templates</p>
        <button 
          className="btn btn-primary btn-large"
          onClick={() => setShowUpload(true)}
        >
          Get Started
        </button>
      </section>
    </div>
  );
}
