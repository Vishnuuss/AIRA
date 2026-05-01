import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "AIRA AI didn't just automate our workflows; they fundamentally re-architected how our data moves. The multi-agent system they built replaced three entire departments of manual data entry while reducing errors to zero.",
    author: "Sarah Jenkins",
    role: "CTO, TechVision Global",
    company: "TechVision"
  },
  {
    quote: "The Enterprise RAG solution provided by AIRA is mind-blowing. Our legal team can now query millions of documents securely and get perfect, hallucination-free answers in seconds. It's a game-changer.",
    author: "David Chen",
    role: "Managing Partner, Elevate Law",
    company: "Elevate Law"
  },
  {
    quote: "We brought them a logistical nightmare involving five different legacy systems. Within weeks, AIRA's automation pipeline had them communicating flawlessly. Their engineers are top-tier.",
    author: "Michael Ross",
    role: "VP Operations, Nexus Logistics",
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
    const interval = setInterval(() => autoPlayRef.current(), 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <div className="test-header">
          <span className="section-label">CLIENT SUCCESS</span>
          <h2 className="section-title">Trusted by <span className="text-gradient">Industry Leaders</span></h2>
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
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="quote-mark">"</div>
                <p className="testimonial-quote">{testimonials[currentIndex].quote}</p>
                <div className="testimonial-author-area">
                  <div className="author-avatar">
                    {testimonials[currentIndex].author.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[currentIndex].author}</h4>
                    <p className="author-role">{testimonials[currentIndex].role}</p>
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
