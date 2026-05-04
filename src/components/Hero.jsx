import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="section-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: '8rem'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative' }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'var(--accent-glow)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: -1
        }} />
        
        <motion.h1 
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            marginBottom: '1.5rem',
            lineHeight: 1,
            fontWeight: 900
          }}
        >
          THE NEXT ERA OF <br />
          <span className="text-gradient">INTELLIGENCE</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}
        >
          We engineer enterprise-grade AI systems, autonomous agents, RAG architectures, and workflow automations to scale your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        >
          <button className="btn-primary">
            Deploy AI Now
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
