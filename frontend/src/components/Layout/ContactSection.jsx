import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      // Sending data to your Backend
      const response = await fetch('http://localhost:8000/api/v1/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success!
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form

    } catch (err) {
      console.error("Submission Error:", err);
      setStatus('error');
      // If the backend sends a specific error message (like "Email required"), show it
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        {/* LEFT: INFO */}
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2>Let's Start a Project</h2>
          <p>Have a ventilation requirement? Need a custom airflow solution? Reach out to our engineering team directly.</p>

          <div className="info-item">
            <div className="info-icon"><FiMapPin /></div>
            <div className="info-text">
              <h4>Head Office</h4>
              <span>1196 Madurdaha, Kolkata-700100</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><FiPhone /></div>
            <div className="info-text">
              <h4>Call Us</h4>
              <span>+91 98300 12345 (Sales)</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><FiMail /></div>
            <div className="info-text">
              <h4>Email Us</h4>
              <span>sales@comvent.in</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: FORM */}
        <motion.div 
          className="contact-form-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-input" 
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                className="form-input" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                className="form-input" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea 
                name="message" 
                className="form-textarea" 
                required 
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project requirements..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="status-msg success">✅ Message sent! We will contact you soon.</div>
            )}
            
            {status === 'error' && (
              <div className="status-msg error">❌ Failed: {errorMsg || "Could not send message."}</div>
            )}

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;