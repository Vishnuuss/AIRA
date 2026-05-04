import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 100%)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="/logo.svg" alt="AIRA AI Logo" style={{ height: '40px', width: 'auto' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          AIRA <span className="text-gradient">AI</span>
        </span>
      </div>

      <div style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }} className="desktop-menu">
        {['AI Systems', 'AI Agents', 'RAG', 'Automations'].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#fff'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            {item}
          </a>
        ))}
        <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
          Get Started
        </button>
      </div>

      <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} className="mobile-menu">
        <Menu size={28} />
      </button>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-menu { display: flex !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
