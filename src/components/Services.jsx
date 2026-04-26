import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';

const services = [
  {
    icon: '⚡',
    title: 'AI Automation',
    subtitle: 'End-to-End Workflow Intelligence',
    description: 'We design and deploy intelligent automation pipelines that eliminate manual bottlenecks, reduce operational costs, and scale your business processes infinitely.',
    features: ['Multi-platform workflow orchestration', 'Intelligent document processing', 'Automated decision engines', 'Real-time data synchronization'],
    gradient: 'linear-gradient(135deg, rgba(82,140,94,0.15), rgba(46,77,54,0.05))',
  },
  {
    icon: '🤖',
    title: 'AI Agents',
    subtitle: 'Autonomous Digital Workers',
    description: 'Custom-built autonomous agents that understand context, make decisions, and execute complex multi-step tasks across your entire digital ecosystem.',
    features: ['Multi-agent orchestration systems', 'Natural language task execution', 'Adaptive learning & self-improvement', 'Cross-platform integration'],
    gradient: 'linear-gradient(135deg, rgba(143,209,157,0.12), rgba(82,140,94,0.05))',
  },
  {
    icon: '🧠',
    title: 'Enterprise RAG',
    subtitle: 'Knowledge-Augmented Intelligence',
    description: 'Production-grade Retrieval Augmented Generation systems that give your AI access to your proprietary knowledge with enterprise security and accuracy.',
    features: ['Custom vector database architecture', 'Hybrid search (semantic + keyword)', 'Multi-modal document ingestion', 'Hallucination-free responses'],
    gradient: 'linear-gradient(135deg, rgba(82,140,94,0.1), rgba(143,209,157,0.08))',
  },
];

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
    const glow = card.querySelector('.service-card-glow');
    if (glow) {
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <motion.div ref={ref} className="service-card"
      style={{ background: service.gradient }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-pointer>
      <div className="service-card-glow" />
      <div className="service-card-shine" />
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-subtitle">{service.subtitle}</p>
      <p className="service-description">{service.description}</p>
      <ul className="service-features">
        {service.features.map((f, i) => (
          <motion.li key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3 + i * 0.08, duration: 0.5 }}>
            <span className="feature-dot" />
            {f}
          </motion.li>
        ))}
      </ul>
      <motion.div className="service-cta" whileHover={{ x: 5 }} data-cursor-pointer>
        Learn more <span>→</span>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <motion.div ref={headingRef} className="services-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <span className="section-label">WHAT WE BUILD</span>
          <h2 className="section-title">Enterprise AI <span className="text-gradient">Solutions</span></h2>
          <p className="section-subtitle">
            From intelligent automation to autonomous agents — we build AI systems that deliver measurable business impact.
          </p>
        </motion.div>
        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
