import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.hero-grid-bg', 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5 }
      )
      .fromTo(logoRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 },
        "-=1.5"
      )
      .fromTo('.hero-title-char',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.03 },
        "-=1"
      )
      .fromTo('.hero-tagline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-description',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-ctas',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );

      // Mouse parallax for floating elements
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to('.hero-motion-graphic', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const title = 'AIRA';

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Live Motion Graphic Background */}
      <div className="hero-grid-bg">
        <div className="grid-horizontal"></div>
        <div className="grid-vertical"></div>
      </div>
      <div className="hero-overlay"></div>

      {/* Code-based VFX */}
      <div className="hero-motion-graphic mg-1"></div>
      <div className="hero-motion-graphic mg-2"></div>
      <div className="hero-motion-graphic mg-3"></div>
      <div className="hero-orb hero-orb-green"></div>

      <div className="hero-content">
        {/* Logo */}
        <div className="hero-logo-container" ref={logoRef}>
          <img src="/logo-icon.png" alt="AIRA Logo" className="hero-logo-img" />
          <div className="hero-logo-glow"></div>
        </div>

        {/* Title */}
        <div className="hero-title-wrapper">
          <div className="hero-title-line" ref={titleRef}>
            {title.split('').map((char, i) => (
              <span key={i} className="hero-title-char" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
            <span className="hero-title-char text-gradient" style={{ marginLeft: '16px' }}>AI</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">
          Intelligent Automation <span className="dot">•</span> Autonomous Agents <span className="dot">•</span> Enterprise RAG
        </p>

        <p className="hero-description">
          We architect intelligent digital ecosystems that redefine how your enterprise operates. Highly realistic, production-ready AI solutions.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <button className="hero-cta-primary" data-cursor-pointer
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="cta-glow"></div>
            <span>Explore Solutions</span>
            <span className="cta-arrow">→</span>
          </button>
          <button className="hero-cta-secondary" data-cursor-pointer
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Strategy Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
