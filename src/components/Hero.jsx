import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, Activity, Cpu } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const floatingCardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Core elements entrance
      tl.fromTo('.hero-micro-label', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.5
      )
      .fromTo('.hero-title-line',
        { y: 50, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, transformOrigin: 'bottom center' },
        "-=0.8"
      )
      .fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.hero-ctas',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );

      // Floating spatial cards entrance
      tl.fromTo('.spatial-card',
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' },
        "-=1"
      );

      // Mouse Parallax for Spatial Cards
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        gsap.to('.spatial-card-1', { x: xPos * 40, y: yPos * 40, duration: 1, ease: 'power2.out' });
        gsap.to('.spatial-card-2', { x: xPos * -30, y: yPos * -50, duration: 1, ease: 'power2.out' });
        gsap.to('.spatial-card-3', { x: xPos * 50, y: yPos * -30, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-bg-glow', { x: xPos * 100, y: yPos * 100, duration: 2, ease: 'power1.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-bg-glow"></div>
      <div className="hero-grid-overlay"></div>

      {/* Floating Spatial UI Modules */}
      <div className="spatial-cards-container" ref={floatingCardsRef}>
        <div className="spatial-card spatial-card-1">
          <div className="sc-header">
            <Activity size={16} color="var(--accent)" />
            <span>System Status</span>
          </div>
          <div className="sc-body">
            <div className="sc-value text-gradient">Online</div>
            <div className="sc-graph">
              <div className="bar b1"></div>
              <div className="bar b2"></div>
              <div className="bar b3"></div>
              <div className="bar b4"></div>
            </div>
          </div>
        </div>

        <div className="spatial-card spatial-card-2">
          <div className="sc-header">
            <Cpu size={16} color="var(--accent)" />
            <span>Agents Active</span>
          </div>
          <div className="sc-body">
            <div className="sc-value">1,402</div>
            <div className="sc-subtext">+12% this week</div>
          </div>
        </div>

        <div className="spatial-card spatial-card-3">
          <div className="sc-header">
            <ShieldAlert size={16} color="var(--accent)" />
            <span>Threats Blocked</span>
          </div>
          <div className="sc-body">
            <div className="sc-value">Zero</div>
            <div className="sc-badge">Secure</div>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-micro-label">
          <span className="pulsing-dot"></span>
          Enterprise AI Infrastructure
        </div>
        
        <h1 className="hero-title" ref={titleRef}>
          <div className="hero-title-line">AI That Does The</div>
          <div className="hero-title-line">Work <span className="text-gradient">For You</span>.</div>
        </h1>
        
        <p className="hero-subtitle">
          We build smart AI agents that automate your daily tasks, 
          save you time, and help your business grow fast.
        </p>

        <div className="hero-ctas">
          <button className="btn-primary" data-cursor-pointer
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="btn-glow"></div>
            <span>Initialize Systems</span>
          </button>
          <button className="btn-secondary" data-cursor-pointer
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            View Architecture
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
