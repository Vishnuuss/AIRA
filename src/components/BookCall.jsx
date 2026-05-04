import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';

export default function BookCall() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', needs: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            company: formData.company, 
            needs: formData.needs,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', needs: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="book-call" className="section-container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
            INITIATE <span className="text-gradient">SEQUENCE</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
            Ready to deploy autonomous intelligence into your operations? Secure a consultation with our engineering team to architect your AI roadmap.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(111, 168, 122, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>
                ⚡
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Rapid Prototyping</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Deploy in weeks, not months.</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(111, 168, 122, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>
                🔒
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Enterprise Security</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Military-grade data protection.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-panel"
          style={{ padding: '3rem' }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Corporate Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Company</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', outline: 'none' }} 
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Intelligence Requirements</label>
              <textarea 
                required
                rows="4" 
                value={formData.needs}
                onChange={(e) => setFormData({...formData, needs: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }} 
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'submitting'}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              {status === 'idle' ? 'Request Access' : 
               status === 'submitting' ? 'Transmitting...' : 
               status === 'success' ? 'Transmission Received ✓' : 
               'Error - Try Again'}
            </button>
          </form>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #book-call > div {
            grid-template-columns: 1fr !important;
          }
          #book-call form > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
