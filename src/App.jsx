import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from './components/Background3D';
import IntroSequence from './components/IntroSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import BookCall from './components/BookCall';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto';
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <IntroSequence onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ position: 'relative' }}
        >
          <Background3D />
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Pricing />
            <BookCall />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
