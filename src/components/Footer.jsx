import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '4rem 2rem',
      marginTop: '4rem',
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="section-container" style={{
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.svg" alt="AIRA AI Logo" style={{ height: '32px', width: 'auto', opacity: 0.8 }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
            AIRA <span className="text-gradient">AI</span>
          </span>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px', fontSize: '0.9rem' }}>
          Building the future of autonomous systems and enterprise-grade artificial intelligence.
        </p>

        <div style={{ 
          width: '100%', 
          height: '1px', 
          background: 'linear-gradient(90deg, transparent, var(--glass-border), transparent)',
          margin: '2rem 0'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} AIRA AI Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8rem' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
