import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "AIRA didn't just automate workflows; they completely re-architected our data pipeline. The autonomous agents they deployed replaced entire legacy systems, driving our error rate to zero while accelerating execution by 10x.",
    author: "Sarah Jenkins",
    role: "CTO",
    company: "TechVision Global"
  },
  {
    quote: "Their Enterprise RAG architecture is unparalleled. Our analysts now query millions of compliance documents securely with zero-latency, hallucination-free intelligence. A definitive strategic advantage.",
    author: "David Chen",
    role: "Managing Partner",
    company: "Elevate Systems"
  },
  {
    quote: "Integrating our disparate APIs seemed impossible until AIRA built a custom automation infrastructure. Flawless execution, zero trust security, and absolute reliability from day one.",
    author: "Michael Ross",
    role: "VP Operations",
    company: "Nexus Logistics"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };
  });

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => autoPlayRef.current(), 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-bg-grid"></div>
      
      <div className="testimonials-container">
        <div className="test-header">
          <span className="section-label">PARTNER OUTCOMES</span>
          <h2 className="section-title">Verified <span className="text-gradient">Impact</span></h2>
        </div>

        <div 
          className="testimonials-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className="carousel-btn prev-btn" onClick={handlePrev} data-cursor-pointer>
            <ChevronLeft size={24} />
          </button>
          
          <div className="carousel-viewport">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="testimonial-card glass-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-top-glow"></div>
                <Quote size={40} className="quote-icon" />
                
                <p className="testimonial-quote">{testimonials[currentIndex].quote}</p>
                
                <div className="testimonial-author-area">
                  <div className="author-avatar">
                    {testimonials[currentIndex].author.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[currentIndex].author}</h4>
                    <p className="author-role">
                      <span className="role-text">{testimonials[currentIndex].role}</span>
                      <span className="role-divider">//</span>
                      <span className="company-text">{testimonials[currentIndex].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-btn next-btn" onClick={handleNext} data-cursor-pointer>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="carousel-indicators">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`indicator ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
