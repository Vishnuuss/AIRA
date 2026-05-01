import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'System Discovery', desc: 'We execute a deep-dive analysis of your existing architecture to identify high-leverage automation nodes and operational bottlenecks.' },
  { num: '02', title: 'Intelligence Design', desc: 'Our engineers architect a zero-trust, highly scalable autonomous infrastructure tailored specifically to your data ecosystem.' },
  { num: '03', title: 'Pipeline Integration', desc: 'We deploy RAG systems, multi-agent orchestrators, and custom webhooks, seamlessly integrating them into your current stack.' },
  { num: '04', title: 'Deployment & Scale', desc: 'Rigorous testing precedes production deployment. We monitor latency and hallucination rates to ensure compounding ROI.' },
];

const Process = () => {
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 768;

      if (isDesktop) {
        const sections = gsap.utils.toArray('.process-step-horizontal');
        
        // Pinned horizontal scroll
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + containerRef.current.offsetWidth
          }
        });

        // Draw line
        gsap.fromTo(lineRef.current, 
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scrollWrapperRef.current,
              scrub: 1,
              start: "top top",
              end: () => "+=" + containerRef.current.offsetWidth
            }
          }
        );
      } else {
        // Mobile vertical scroll
        const sections = gsap.utils.toArray('.process-step-horizontal');
        sections.forEach((sec) => {
          gsap.fromTo(sec, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, scrollTrigger: { trigger: sec, start: "top 80%" } }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="process-section" ref={sectionRef}>
      <div className="process-header">
        <span className="section-label">DEPLOYMENT METHODOLOGY</span>
        <h2 className="section-title">Architecting <span className="text-gradient">Scale</span></h2>
        <p className="section-subtitle">
          A deterministic, phased rollout designed to mitigate risk and accelerate implementation velocity.
        </p>
      </div>

      <div className="process-scroll-wrapper" ref={scrollWrapperRef}>
        <div className="process-horizontal-container" ref={containerRef}>
          <div className="process-connecting-line">
            <div className="process-connecting-line-fill" ref={lineRef}></div>
            {/* Animated data packets running along the line */}
            <div className="data-packet dp-1"></div>
            <div className="data-packet dp-2"></div>
            <div className="data-packet dp-3"></div>
          </div>
          {steps.map((step, i) => (
            <div key={i} className="process-step-horizontal">
              <div className="step-connector-dot">
                <div className="dot-pulse"></div>
              </div>
              <div className="step-card">
                <div className="step-card-glow"></div>
                <div className="step-num">PHASE {step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
