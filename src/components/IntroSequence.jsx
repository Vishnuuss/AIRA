import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSequence({ onComplete }) {
  const [text, setText] = useState('');
  const fullText = "INITIALIZING CORE SYSTEMS...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1500); // Hold for a moment then complete
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Grid Lines */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundSize: '50px 50px',
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
        zIndex: 0
      }} />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '2rem' }}>
          <motion.img 
            src="/logo-transparent.png" 
            alt="AIRA Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            initial={{ filter: 'brightness(0) invert(1) blur(10px)' }}
            animate={{ filter: 'brightness(1) invert(0) blur(0px)' }}
            transition={{ duration: 2 }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '-10%', left: '-10%', right: '-10%', bottom: '-10%',
              border: '1px dashed rgba(111, 168, 122, 0.4)',
              borderRadius: '50%'
            }}
          />
        </div>

        <div style={{
          fontFamily: 'monospace',
          color: 'var(--accent-color)',
          fontSize: '1rem',
          letterSpacing: '0.2em',
          textShadow: '0 0 10px rgba(111,168,122,0.5)',
          height: '24px'
        }}>
          {text}<span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '300px' }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          style={{
            height: '1px',
            background: 'var(--accent-color)',
            marginTop: '2rem',
            position: 'relative',
            boxShadow: '0 0 10px var(--accent-color)'
          }}
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 300 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: '-2px',
              left: 0,
              width: '5px',
              height: '5px',
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 0 10px #fff'
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </motion.div>
  );
}
