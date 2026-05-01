import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import FloatingTools from './components/FloatingTools';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Problem from './components/Problem';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const LoadingScreen = ({ onComplete }) => (
  <motion.div className="loading-screen"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.05 }} 
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    style={{ backgroundColor: 'var(--black)' }}>
    
    <div className="loading-content-wrapper">
      <motion.div className="loading-logo-wrapper"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
        <img src="/logo-icon.png" alt="AIRA AI Symbol" className="loading-logo" />
        <motion.div 
          className="loading-logo-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          AIRA <span className="text-gradient">AI</span>
        </motion.div>
      </motion.div>
      
      <motion.div className="loading-bar-wrapper"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}>
        <motion.div className="loading-bar"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 300);
          }} />
      </motion.div>
    </div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto';
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}>
          <ParticleField />
          <Navbar />
          <main>
            <Hero />
            <Services />
            <FloatingTools />
            <About />
            <Process />
            <Testimonials />
            <Problem />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
