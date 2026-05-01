import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const buttonRef = useRef(null);

  // Magnetic Button Effect
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const xMove = x * 0.2;
      const yMove = y * 0.2;

      btn.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = `translate(0px, 0px) scale(1)`;
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-glow-bg" />
      <div className="contact-grid-overlay" />
      
      <div className="contact-container">
        <motion.div className="contact-content-centered"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          
          <div className="terminal-badge">
            <Terminal size={14} />
            <span>INITIATE_PROTOCOL</span>
          </div>
          
          <h2 className="contact-headline">
            Ready to <span className="text-gradient">Automate?</span>
          </h2>
          
          <p className="contact-description">
            Partner with AIRA AI to architect intelligent systems that eliminate inefficiency and compound your business advantage.
          </p>

          <a href="mailto:elevatexvishnu@gmail.com" className="contact-email-link" data-cursor-pointer>
            elevatexvishnu@gmail.com
          </a>

          <div className="contact-cta-wrapper">
            <button ref={buttonRef} className="contact-cta-btn" data-cursor-pointer>
              <span>Initialize System Discovery</span>
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
