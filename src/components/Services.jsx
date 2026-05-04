import { motion } from 'framer-motion';

const services = [
  {
    title: 'AI Systems',
    desc: 'End-to-end artificial intelligence ecosystems engineered for enterprise-scale decision making and intelligence processing.',
    icon: '⬡'
  },
  {
    title: 'AI Agents',
    desc: 'Autonomous digital workers capable of reasoning, executing complex workflows, and interacting seamlessly with human operators.',
    icon: '⎔'
  },
  {
    title: 'RAG Architecture',
    desc: 'Retrieval-Augmented Generation pipelines linking your proprietary data securely directly to powerful LLM cognitive engines.',
    icon: '∰'
  },
  {
    title: 'Automations',
    desc: 'Intelligent process automation that eliminates manual bottlenecks, ensuring 24/7 operational efficiency with zero latency.',
    icon: '⚡'
  },
  {
    title: 'Custom AI Agents',
    desc: 'Bring your idea, and we build it from scratch. Completely tailored AI agents designed exactly to your specifications and use cases.',
    icon: '✧'
  }
];

export default function Services() {
  return (
    <section id="ai-systems" className="section-container" style={{ paddingTop: '4rem', paddingBottom: '8rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '5rem', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
          OUR <span className="text-gradient">CAPABILITIES</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Precision-engineered solutions. We build pure intelligence.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {services.map((svc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel"
            style={{
              padding: '3rem 2rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'transform 0.4s ease, border-color 0.4s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = 'rgba(111, 168, 122, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
          >
            <div style={{
              fontSize: '3rem',
              color: 'var(--accent-color)',
              marginBottom: '1.5rem',
              opacity: 0.8
            }}>
              {svc.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{svc.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{svc.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
