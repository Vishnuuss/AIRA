import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: 0.8 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }),
  };

  const title = 'AIRA';

  return (
    <section id="hero" className="hero">
      {/* Gradient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grid lines background */}
      <div className="hero-grid" />

      {/* Floating geometric shapes */}
      <motion.div className="hero-shape hex-1" animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="hero-shape hex-2" animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="hero-shape circle-1" animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="hero-shape line-1" animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />

      <div className="hero-content">
        {/* Logo animation */}
        <motion.div className="hero-logo-wrapper"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <img src="/logo.svg" alt="AIRA AI" className="hero-logo" />
          <div className="hero-logo-glow" />
          <motion.div className="hero-logo-ring"
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="hero-logo-ring ring-2"
            animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
        </motion.div>

        {/* Title */}
        <div className="hero-title-wrapper">
          <div className="hero-title-line">
            {title.split('').map((char, i) => (
              <motion.span key={i} className="hero-title-char" custom={i}
                variants={letterVariants} initial="hidden" animate="visible"
                style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
            <motion.span className="hero-title-ai" initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              AI
            </motion.span>
          </div>
        </div>

        {/* Tagline */}
        <motion.p className="hero-tagline"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          Intelligent Automation · Autonomous Agents · Enterprise RAG
        </motion.p>

        <motion.p className="hero-description"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}>
          We architect AI systems that transform how enterprises operate.
          From autonomous agent workflows to retrieval-augmented knowledge systems.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-ctas"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}>
          <motion.button className="hero-cta-primary" data-cursor-pointer
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(82,140,94,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Solutions
            <span className="cta-arrow">→</span>
          </motion.button>
          <motion.button className="hero-cta-secondary" data-cursor-pointer
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Book a Strategy Call
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="hero-scroll-indicator"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}>
          <motion.div className="scroll-mouse"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div className="scroll-wheel" />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
