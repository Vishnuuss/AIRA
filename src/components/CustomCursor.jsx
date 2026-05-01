import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [bursts, setBursts] = useState([]);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Create a new burst of particles on click
      const newBurst = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        particles: Array.from({ length: 8 }).map((_, i) => ({
          id: i,
          angle: (i * 360) / 8, // 8 particles in a circle
        }))
      };
      setBursts(prev => [...prev, newBurst]);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    const addListeners = () => {
      const els = document.querySelectorAll('a, button, input, textarea, [data-cursor-pointer]');
      const enter = () => setIsPointer(true);
      const leave = () => setIsPointer(false);
      els.forEach(el => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
      return () => els.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
    const cleanup = addListeners();
    const observer = new MutationObserver(() => { cleanup(); addListeners(); });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { cleanup(); observer.disconnect(); };
  }, []);

  const removeBurst = useCallback((id) => {
    setBursts(prev => prev.filter(b => b.id !== id));
  }, []);

  return (
    <>
      <motion.div className={`cursor-dot ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ x: cursorX, y: cursorY }} />
      <motion.div className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ x: cursorXSpring, y: cursorYSpring }} />
      
      {bursts.map(burst => (
        <div key={burst.id} className="burst-container" style={{ left: burst.x, top: burst.y }}>
          {burst.particles.map(particle => {
            const distance = 40;
            const rad = (particle.angle * Math.PI) / 180;
            const destX = Math.cos(rad) * distance;
            const destY = Math.sin(rad) * distance;

            return (
              <motion.div
                key={particle.id}
                className="burst-particle"
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: destX, y: destY, scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onAnimationComplete={() => {
                  if (particle.id === 7) removeBurst(burst.id); // clean up after last particle
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
