import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'AI Automation',
    subtitle: 'End-to-End Workflow Intelligence',
    desc: 'We design and deploy intelligent automation pipelines that eliminate manual bottlenecks, reduce operational costs, and scale your business processes infinitely.',
    features: ['Cross-platform orchestration', 'Intelligent document processing', 'Automated decision engines', 'Real-time data sync'],
    image: '/ai-automation.png',
    color: 'var(--primary)'
  },
  {
    id: '02',
    title: 'Autonomous Agents',
    subtitle: 'Digital Workers that Think',
    desc: 'Custom-built autonomous agents that understand context, make decisions, and execute complex multi-step tasks across your entire digital ecosystem.',
    features: ['Multi-agent systems', 'Natural language task execution', 'Adaptive learning', 'API integration'],
    image: '/ai-agents.png',
    color: 'var(--tertiary)'
  },
  {
    id: '03',
    title: 'Enterprise RAG',
    subtitle: 'Knowledge-Augmented Intelligence',
    desc: 'Production-grade Retrieval Augmented Generation systems that give your AI secure access to your proprietary data with absolute accuracy.',
    features: ['Vector database architecture', 'Hybrid semantic search', 'Multi-modal ingestion', 'Zero-hallucination guardrails'],
    image: '/rag-system.png',
    color: 'var(--secondary)'
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 80%'
          }
        }
      );

      // Service rows animation
      const rows = gsap.utils.toArray('.service-row');
      rows.forEach((row, i) => {
        const isEven = i % 2 === 0;
        const img = row.querySelector('.service-image-container');
        const content = row.querySelector('.service-content');
        
        gsap.fromTo(img,
          { x: isEven ? -100 : 100, opacity: 0, rotationY: isEven ? -15 : 15 },
          { x: 0, opacity: 1, rotationY: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 75%' }
          }
        );

        gsap.fromTo(content,
          { x: isEven ? 100 : -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: row, start: 'top 75%' }
          }
        );

        // Image parallax effect inside container
        gsap.to(row.querySelector('.service-img'), {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, targetRef) => {
    const { left, top, width, height } = targetRef.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(targetRef, {
      rotationY: x * 20,
      rotationX: -y * 20,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.5
    });
  };

  const handleMouseLeave = (targetRef) => {
    gsap.to(targetRef, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'power1.out' });
  };

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="services-container">
        
        <div className="services-header">
          <span className="section-label">WHAT WE BUILD</span>
          <h2 className="section-title">High-End <span className="text-gradient">AI Solutions</span></h2>
          <p className="section-subtitle">
            Leveraging cutting-edge AI architecture to solve complex enterprise challenges.
          </p>
        </div>

        <div className="services-list">
          {servicesData.map((service, i) => (
            <div key={i} className={`service-row ${i % 2 === 0 ? '' : 'reverse'}`}>
              
              <div 
                className="service-image-container"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <div className="service-image-glow" style={{ background: service.color }}></div>
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.title} className="service-img" />
                  <div className="service-image-overlay"></div>
                </div>
              </div>

              <div className="service-content">
                <div className="service-num" style={{ color: service.color }}>{service.id}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-subtitle" style={{ color: service.color }}>{service.subtitle}</p>
                <p className="service-desc">{service.desc}</p>
                
                <ul className="service-features-list">
                  {service.features.map((f, idx) => (
                    <li key={idx}>
                      <span className="feature-icon" style={{ backgroundColor: service.color }}></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="service-btn" data-cursor-pointer>
                  <span>Explore Module</span>
                  <div className="service-btn-arrow">↗</div>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
