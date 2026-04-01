import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      color: 'var(--text-primary)',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 12px 0', fontWeight: 800 }}>404</h1>
      <p style={{ fontSize: '1.25rem', margin: '0 0 24px 0', color: 'var(--text-secondary)' }}>
        Page not found
      </p>
      <Link 
        to="/"
        style={{
          padding: '12px 32px',
          background: 'linear-gradient(135deg, var(--primary), #06b6d4)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          transition: 'all var(--transition-normal)',
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
