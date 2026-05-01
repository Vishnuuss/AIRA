import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Zap, Cpu, Network } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Cpu size={32} className="service-icon-svg" />,
    title: 'Autonomous Agents',
    description: 'Deploy reasoning engines that autonomously execute multi-step workflows, bridging the gap between raw LLM intelligence and actionable business outcomes.',
    tags: ['LangChain', 'AutoGPT', 'Function Calling'],
    visual: 'nodes'
  },
  {
    icon: <Database size={32} className="service-icon-svg" />,
    title: 'Enterprise RAG Systems',
    description: 'Vector-native search architectures that ingest millions of internal documents, delivering hallucination-free intelligence instantly to your workforce.',
    tags: ['Pinecone', 'Embeddings', 'Semantic Search'],
    visual: 'radar'
  },
  {
    icon: <Zap size={32} className="service-icon-svg" />,
    title: 'Zero-Latency Automation',
    description: 'Event-driven orchestration that eradicates operational bottlenecks. We seamlessly connect disparate APIs into unified, intelligent pipelines.',
    tags: ['Make', 'n8n', 'Custom Webhooks'],
    visual: 'pulse'
  },
  {
    icon: <Network size={32} className="service-icon-svg" />,
    title: 'Strategic Architecture',
    description: 'We don\'t just deploy tools; we architect scalable AI infrastructure designed for enterprise security, compliance, and exponential growth.',
    tags: ['System Design', 'Security', 'Scalability'],
    visual: 'grid'
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-header > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          scrollTrigger: { trigger: '.services-header', start: 'top 80%' }
        }
      );

      const cards = gsap.utils.toArray('.service-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.services-grid', start: 'top 75%' }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderVisual = (type) => {
    switch(type) {
      case 'radar':
        return (
          <div className="svc-visual radar-visual">
            <div className="radar-circle rc-1"></div>
            <div className="radar-circle rc-2"></div>
            <div className="radar-circle rc-3"></div>
            <div className="radar-sweep"></div>
          </div>
        );
      case 'nodes':
        return (
          <div className="svc-visual nodes-visual">
            <div className="node n1"></div>
            <div className="node n2"></div>
            <div className="node n3"></div>
            <div className="node-line nl1"></div>
            <div className="node-line nl2"></div>
          </div>
        );
      case 'pulse':
        return (
          <div className="svc-visual pulse-visual">
            <div className="pulse-line"></div>
            <div className="pulse-dot"></div>
          </div>
        );
      case 'grid':
      default:
        return (
          <div className="svc-visual grid-visual">
            <div className="g-cell"></div>
            <div className="g-cell active"></div>
            <div className="g-cell"></div>
            <div className="g-cell"></div>
            <div className="g-cell"></div>
            <div className="g-cell active"></div>
          </div>
        );
    }
  };

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="services-container">
        
        <div className="services-header">
          <span className="section-label">OUR SOLUTIONS</span>
          <h2 className="section-title">Limitless <span className="text-gradient">Orchestration</span></h2>
          <p className="services-subtitle">
            We engineer high-fidelity AI systems that transform operational friction into compounding velocity.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc, i) => (
            <div key={i} className="service-card" data-cursor-pointer>
              <div className="service-card-glow"></div>
              
              <div className="service-visual-container">
                {renderVisual(svc.visual)}
                <div className="service-icon-wrapper">
                  {svc.icon}
                </div>
              </div>

              <div className="service-content">
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.description}</p>
                
                <div className="service-tags">
                  {svc.tags.map((tag, idx) => (
                    <span key={idx} className="service-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
