import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Discovery & Analysis', desc: 'We deep-dive into your workflows, data architecture, and business objectives to identify high-impact automation opportunities.' },
  { num: '02', title: 'Architecture Design', desc: 'We design a scalable, secure AI system architecture tailored to your infrastructure, compliance needs, and growth trajectory.' },
  { num: '03', title: 'Development & Integration', desc: 'Our engineers build and integrate AI agents, automation pipelines, and RAG systems with your existing tools and platforms.' },
  { num: '04', title: 'Testing & Optimization', desc: 'Rigorous testing with real-world scenarios ensures reliability, accuracy, and performance before any production deployment.' },
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
        sections.forEach((sec, i) => {
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
        <span className="section-label">HOW WE WORK</span>
        <h2 className="section-title">Our <span className="text-gradient">Process</span></h2>
        <p className="section-subtitle">
          A proven methodology that delivers results on time and at scale.
        </p>
      </div>

      <div className="process-scroll-wrapper" ref={scrollWrapperRef}>
        <div className="process-horizontal-container" ref={containerRef}>
          <div className="process-connecting-line">
            <div className="process-connecting-line-fill" ref={lineRef}></div>
          </div>
          {steps.map((step, i) => (
            <div key={i} className="process-step-horizontal">
              <div className="step-connector-dot"></div>
              <div className="step-card">
                <div className="step-num">{step.num}</div>
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
