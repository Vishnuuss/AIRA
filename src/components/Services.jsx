import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, Cpu, Database } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'AI Automation',
    subtitle: 'End-to-End Workflow Intelligence',
    desc: 'We design and deploy intelligent automation pipelines that eliminate manual bottlenecks, reduce operational costs, and scale your business processes infinitely.',
    features: ['Cross-platform orchestration', 'Intelligent document processing', 'Automated decision engines', 'Real-time data sync'],
    icon: <Settings size={24} color="var(--accent)" />
  },
  {
    id: '02',
    title: 'Autonomous Agents',
    subtitle: 'Digital Workers that Think',
    desc: 'Custom-built autonomous agents that understand context, make decisions, and execute complex multi-step tasks across your entire digital ecosystem.',
    features: ['Multi-agent systems', 'Natural language task execution', 'Adaptive learning', 'API integration'],
    icon: <Cpu size={24} color="var(--accent)" />
  },
  {
    id: '03',
    title: 'Enterprise RAG',
    subtitle: 'Knowledge-Augmented Intelligence',
    desc: 'Production-grade Retrieval Augmented Generation systems that give your AI secure access to your proprietary data with absolute accuracy.',
    features: ['Vector database architecture', 'Hybrid semantic search', 'Multi-modal ingestion', 'Zero-hallucination guardrails'],
    icon: <Database size={24} color="var(--accent)" />
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.services-header > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 80%' }
        }
      );

      // Service cards staggered reveal
      gsap.fromTo('.service-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.7, 
          stagger: 0.08, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: '.services-grid', 
            start: 'top 80%' 
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="services-container">
        <div className="services-header">
          <span className="section-label">WHAT WE BUILD</span>
          <h2 className="section-title">High-End <span className="text-gradient">AI Solutions</span></h2>
          <p className="section-subtitle">
            Leveraging cutting-edge architecture to solve complex enterprise challenges.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-container">
                {service.icon}
              </div>
              <div className="service-num">{service.id}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-desc">{service.desc}</p>
              
              <ul className="service-features-list">
                {service.features.map((f, idx) => (
                  <li key={idx}>
                    <span className="feature-icon"></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="service-btn" data-cursor-pointer>
                <span>Explore Module</span>
                <div className="service-btn-arrow">↗</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
