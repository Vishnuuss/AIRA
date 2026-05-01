import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Preloader simulation (if no global preloader, we animate hero entry)
      tl.fromTo('.hero-micro-label', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.5
      );

      const words1 = headlineLine1Ref.current.children;
      const words2 = headlineLine2Ref.current.children;

      tl.fromTo(words1,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power3.out' },
        "-=0.8"
      )
      .fromTo(words2,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power3.out' },
        "-=0.8"
      );

      tl.fromTo('.hero-subheading',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo('.hero-ctas',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.4"
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Advanced Particle Field (Option A)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 };
    
    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const count = window.innerWidth < 768 ? 150 : 400; // Less on mobile
      particles = [];
      for (let i = 0; i < count; i++) {
        const z = Math.random() * 100; // Depth
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: z,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: (1 - z/100) * 2.5 + 0.5,
          opacity: (1 - z/100) * 0.6 + 0.1,
        });
      }
    };
    
    initParticles();
    
    window.addEventListener('resize', initParticles);
    
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      
      const parallaxX = (mouse.x / canvas.width - 0.5) * 50;
      const parallaxY = (mouse.y / canvas.height - 0.5) * 50;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        const pX = p.x + parallaxX * (p.z / 100);
        const pY = p.y + parallaxY * (p.z / 100);

        ctx.beginPath();
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        
        // Electric Cyan: #6ee7ff (approx hsl(190, 100%, 71%))
        ctx.fillStyle = `hsla(190, 100%, 71%, ${p.opacity})`;
        
        // Depth of field blur simulation
        if (p.z > 70) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(190, 100%, 71%, ${p.opacity})`;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
      
      animId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const headlineWord = (text) => text.split(' ').map((word, i) => (
    <span key={i} className="hero-word" style={{ display: 'inline-block', paddingRight: '0.25em' }}>
      {word}
    </span>
  ));

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background FX */}
      <canvas ref={canvasRef} className="hero-particle-canvas" />
      <div className="hero-bg-gradient"></div>

      <div className="hero-content">
        <div className="hero-micro-label">[ AI-POWERED SOLUTIONS ]</div>
        
        <h1 className="hero-headline">
          <div className="hero-headline-line" ref={headlineLine1Ref}>
            {headlineWord("Intelligent Automation.")}
          </div>
          <div className="hero-headline-line" ref={headlineLine2Ref}>
            {headlineWord("Engineered for Growth.")}
          </div>
        </h1>
        
        <p className="hero-subheading">
          AIRA AI Solutions builds precision-crafted AI systems that eliminate inefficiency, accelerate decision-making, and compound your business advantage — all without the complexity.
        </p>

        <div className="hero-ctas">
          <button className="btn-primary" data-cursor-pointer
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Solutions
          </button>
          <button className="btn-secondary" data-cursor-pointer
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Watch Demo
          </button>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
