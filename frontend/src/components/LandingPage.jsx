import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Navigation */}
      <nav className="landing-nav" style={{ transform: `translateY(-${scrollY * 0.1}px)` }}>
        <div className="nav-container">
          <div className="nav-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 6v6m3-3H9" />
            </svg>
            <span>DataPulse</span>
          </div>
          <button
            className="nav-auth-btn"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>AI-Powered Analytics Platform</span>
            </div>

            <h1 className="hero-title">
              Transform Your Data Into
              <span className="gradient-text"> Actionable Insights</span>
            </h1>

            <p className="hero-subtitle">
              Unlock the power of your data with intelligent analytics, real-time dashboards, and AI-driven insights. Make smarter decisions faster.
            </p>

            <div className="hero-cta-group">
              <button
                className="hero-cta-primary"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <span>Get Started Free</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="hero-cta-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>

          <div className="hero-illustration">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dot"></div>
                <div className="preview-dot"></div>
                <div className="preview-dot"></div>
              </div>
              <div className="preview-content">
                <div className="preview-bar" style={{ width: '85%', height: '6px', background: 'linear-gradient(90deg, #6366f1, #3b82f6)', borderRadius: '3px', marginBottom: '8px' }}></div>
                <div className="preview-bar" style={{ width: '65%', height: '4px', background: 'rgba(99, 102, 241, 0.4)', borderRadius: '2px', marginBottom: '12px' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div className="preview-bar" style={{ width: '100%', height: '6px', background: '#10b981', borderRadius: '3px' }}></div>
                  <div className="preview-bar" style={{ width: '100%', height: '6px', background: '#f59e0b', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to analyze and understand your data</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: '📊',
                title: 'Real-Time Dashboards',
                description: 'Monitor your metrics with live updates and beautiful visualizations'
              },
              {
                icon: '🤖',
                title: 'AI Insights',
                description: 'Get intelligent recommendations powered by advanced machine learning'
              },
              {
                icon: '📈',
                title: 'Advanced Analytics',
                description: 'Deep dive into your data with powerful analysis tools and reports'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Process millions of data points in seconds with our optimized engine'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level encryption and compliance with industry standards'
              },
              {
                icon: '🌍',
                title: 'Global Scale',
                description: 'Access your data from anywhere with our cloud infrastructure'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get started in three simple steps</p>
          </div>

          <div className="steps-grid">
            {[
              {
                step: '01',
                title: 'Upload Your Data',
                description: 'Import your data from CSV, JSON, or connect directly to your database'
              },
              {
                step: '02',
                title: 'Explore & Analyze',
                description: 'Create custom dashboards and explore your data with our tools'
              },
              {
                step: '03',
                title: 'Get Insights & Act',
                description: 'Discover patterns, trends, and actionable insights from your data'
              }
            ].map((item, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Loved by Teams Worldwide</h2>
            <p className="section-subtitle">See what our customers are saying</p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                text: 'DataPulse transformed how we make decisions. The AI insights are incredibly accurate.',
                author: 'Sarah Johnson',
                role: 'Data Scientist',
                company: 'Tech Co.'
              },
              {
                text: 'Best analytics platform we have used. Simple, powerful, and actually helpful.',
                author: 'Michael Chen',
                role: 'Product Manager',
                company: 'StartUp Inc.'
              },
              {
                text: 'The real-time dashboards give us the competitive edge we needed.',
                author: 'Emily Rodriguez',
                role: 'CEO',
                company: 'Growth Labs'
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 10.26 24 10.27 17.51 15.14 20.16 23.41 12 18.65 3.84 23.41 6.49 15.14 0 10.27 8.91 10.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div>
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your Data?</h2>
          <p className="cta-subtitle">Start analyzing your data with AI-powered insights today</p>
          <button
            className="cta-button"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">DataPulse</h3>
              <p className="footer-description">Transform your data into insights</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
                <li><a href="#security">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 DataPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
