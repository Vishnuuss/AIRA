import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter Agent',
    price: '$2,500',
    desc: 'Perfect for small businesses looking to automate their first workflow.',
    features: ['1 Custom AI Agent', 'Basic RAG Integration', 'Email/Slack Automations', 'Standard Support'],
  },
  {
    name: 'Pro Systems',
    price: '$7,500',
    desc: 'Full-scale AI ecosystem for growing enterprises.',
    features: ['3 Specialized AI Agents', 'Advanced RAG Architecture', 'Multi-Platform Automations', 'Priority 24/7 Support', 'Custom Dashboard'],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Infinite scalability. Fully bespoke intelligence solutions.',
    features: ['Unlimited AI Agents', 'On-Premise / Secure Cloud RAG', 'Full Workflow Automation', 'Dedicated Engineering Team', 'SLA Guarantees'],
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '5rem', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
          INVESTMENT <span className="text-gradient">TIERS</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Transparent pricing for exponential ROI.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel"
            style={{
              padding: '3rem 2rem',
              position: 'relative',
              overflow: 'hidden',
              transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
              borderColor: plan.popular ? 'var(--accent-color)' : 'var(--glass-border)',
              boxShadow: plan.popular ? '0 0 40px rgba(111, 168, 122, 0.15)' : 'none',
              zIndex: plan.popular ? 2 : 1
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--accent-color)',
                color: '#000',
                padding: '0.25rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                Most Popular
              </div>
            )}
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--accent-color)' }}>
              {plan.price}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', minHeight: '48px' }}>
              {plan.desc}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#fff' }}>
                  <span style={{ color: 'var(--accent-color)' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
            <button className="btn-primary" style={{ width: '100%' }}>
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
