import { motion } from 'framer-motion';
import { FiCheckCircle, FiAward, FiClock, FiTool } from 'react-icons/fi';
import './AboutSection.css';

const AboutSection = () => {
  // Features based on your IndiaMART profile
  const features = [
    { icon: <FiAward />, text: "Authorized Ostberg Partner" },
    { icon: <FiClock />, text: "Short Term Delivery" },
    { icon: <FiTool />, text: "After-Sales Service" },
    { icon: <FiCheckCircle />, text: "Competitive Pricing" },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        
        {/* LEFT: Image with Badge */}
        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://4.imimg.com/data4/AM/DS/NSDMERP-9904392/1473497251board-1000x1000.png" 
            alt="Comvent Engineering Warehouse" 
            className="about-img" 
          />
          
          <div className="experience-badge">
            <span className="exp-number">12+</span>
            <span className="exp-text">Years of Excellence</span>
          </div>
        </motion.div>

        {/* RIGHT: Text Content */}
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '1px' }}>
            WHO WE ARE
          </span>
          
          <h2 className="about-title">
            Engineering the Future of <br />
            <span style={{ color: 'var(--color-primary)' }}>Industrial Ventilation</span>
          </h2>

          <p className="about-description">
            Since 2011, <strong>Comvent Engineering</strong> has been a trusted leader in air flow systems. 
            Based in Kolkata, we combine technical expertise with world-class products to serve 
            industrial giants across India.
          </p>

          <p className="about-description">
            Our association with <strong>OSTBERG</strong> ensures you get Swedish engineering quality 
            backed by our local support and rapid delivery network.
          </p>

          <div className="feature-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="check-icon">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>

          <button className="btn btn-primary" style={{ width: 'fit-content', marginTop: '20px' }}>
            Learn More About Us
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;