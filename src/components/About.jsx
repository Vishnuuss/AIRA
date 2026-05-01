import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Zap, TrendingUp } from 'lucide-react';
import './About.css';

const stats = [
  { value: 150, suffix: '+', label: 'Systems Deployed', icon: '⚡' },
  { value: 50, suffix: '+', label: 'Enterprise Partners', icon: '🏢' },
  { value: 10, suffix: 'M+', label: 'Automated Operations', icon: '🔄' },
  { value: 99.9, suffix: '%', label: 'Infrastructure Uptime', icon: '🟢' },
];

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const end = value;
    const duration = 2000;
    const isDecimal = value % 1 !== 0;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * end;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span>{count}{suffix}</span>;
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-glow"></div>
      
      <div className="about-container">
        <div className="about-content">
          <motion.div className="about-text"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}>
            
            <div className="section-label-wrapper">
              <span className="section-label">THE AIRA ADVANTAGE</span>
            </div>
            
            <h2 className="section-title">
              We Don't Just Build AI.<br />
              <span className="text-gradient">We Architect Intelligence.</span>
            </h2>
            
            <p className="about-description">
              AIRA AI is an elite intelligence agency specializing in enterprise-grade automation, autonomous reasoning agents, and production-ready RAG architectures. We partner with forward-thinking organizations to transform their operational friction into compounding velocity.
            </p>
            
            <p className="about-description">
              Our engineering team merges deep expertise in machine learning, distributed systems, and business strategy to deliver deterministic, secure AI infrastructure that generates measurable ROI from day one.
            </p>
            
            <div className="about-badges">
              <div className="about-badge">
                <Shield size={16} className="badge-icon" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="about-badge">
                <Zap size={16} className="badge-icon" />
                <span>Zero-Latency Execution</span>
              </div>
              <div className="about-badge">
                <TrendingUp size={16} className="badge-icon" />
                <span>Compounding ROI</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-visual-container"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="about-stats-grid">
              {stats.map((stat, i) => (
                <motion.div key={i} className="stat-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}>
                  <div className="stat-glow"></div>
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-value">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
