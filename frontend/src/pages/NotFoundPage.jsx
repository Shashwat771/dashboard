import { Link } from 'react-router-dom';
import './NotFoundPage.css';

/**
 * NotFoundPage (404)
 * Error page displayed when a route doesn't exist
 */
export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        
        <h1 className="not-found-code">404</h1>
        
        <h2 className="not-found-title">Page Not Found</h2>
        
        <p className="not-found-description">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="not-found-button">
            Go Back Home
          </Link>
          <Link to="/dashboards/executive-summary" className="not-found-button secondary">
            Explore Dashboards
          </Link>
        </div>
      </div>
    </div>
  );
}
