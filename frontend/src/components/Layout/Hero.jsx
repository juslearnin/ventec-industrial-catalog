import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top } = heroRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        heroRef.current.style.setProperty('--x', `${x}px`);
        heroRef.current.style.setProperty('--y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-spotlight"></div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Clean Tagline */}
          <span style={{ 
            color: 'var(--color-primary)', 
            fontWeight: '600', 
            letterSpacing: '3px', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            Precision Air Systems
          </span>
          
          <h1 className="hero-title">
            COMVENT <br />
            <span style={{ color: 'var(--color-primary)', WebkitTextFillColor: 'initial' }}>ENGINEERING</span>
          </h1>

          <p className="hero-subtitle">
            Committed to providing technical support & quality products at competitive prices. 
            We ensure <strong>short-term delivery</strong> and superior <strong>after-sales service</strong>.
          </p>

          <div className="hero-buttons">
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              View Products <FiArrowRight />
            </motion.button>
            
            <motion.button 
              className="btn glass-panel"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{ color: 'var(--color-text)' }}
            >
              Contact Owner
            </motion.button>
          </div>

          {/* OFFICIAL PARTNERSHIP BADGE */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ 
              marginTop: '60px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '12px 25px',
              background: 'var(--color-panel)',
              border: '1px solid var(--color-border)',
              borderRadius: '50px',
              backdropFilter: 'blur(5px)'
            }}
          >
            <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }} />
            <span style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--color-text)' }}>
              In Association with <strong>OSTBERG: The Fan Company</strong>
            </span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;