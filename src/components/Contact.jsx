import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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
      
      // Limit the movement
      const xMove = x * 0.3;
      const yMove = y * 0.3;

      btn.style.transform = `translate(${xMove}px, ${yMove}px) scale(1.05)`;
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
      
      <div className="contact-container">
        <motion.div className="contact-content-centered"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          
          <span className="section-label">READY TO SCALE?</span>
          
          <h2 className="contact-headline">
            Start Your <span className="text-gradient">AI Transformation</span>
          </h2>
          
          <p className="contact-description">
            Partner with AIRA AI to architect intelligent systems that eliminate inefficiency and compound your business advantage.
          </p>

          <a href="mailto:elevatexvishnu@gmail.com" className="contact-email-link" data-cursor-pointer>
            elevatexvishnu@gmail.com
          </a>

          <div className="contact-cta-wrapper">
            <button ref={buttonRef} className="contact-cta-btn" data-cursor-pointer>
              <span>Book Strategy Call</span>
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
