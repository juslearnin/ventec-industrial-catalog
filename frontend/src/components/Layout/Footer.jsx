import { FiMapPin, FiPhone, FiMail, FiShield } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* COLUMN 1: BRAND INFO */}
        <div className="footer-brand">
          <h2>COMVENT<span>ENG.</span></h2>
          <div className="trust-badge">Est. 2011 • Kolkata</div>
          <p className="footer-desc">
            Authorized partners of <strong>OSTBERG</strong>. Providing world-class industrial ventilation systems, 
            sales, and after-sales service with technical precision.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
            <strong>CEO:</strong> Ravi Pandey
          </p>
        </div>

        {/* COLUMN 2: PRODUCTS */}
        <div className="footer-col">
          <h3 className="footer-title">Products</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Industrial Fans</a></li>
            <li><a href="#" className="footer-link">Axial Flow Fans</a></li>
            <li><a href="#" className="footer-link">Exhaust Systems</a></li>
            <li><a href="#" className="footer-link">Centrifugal Blowers</a></li>
            <li><a href="#" className="footer-link">Roof Extractors</a></li>
          </ul>
        </div>

        {/* COLUMN 3: COMPANY */}
        <div className="footer-col">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Projects</a></li>
            <li><a href="#" className="footer-link">Certifications</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* COLUMN 4: CONTACT DETAILS */}
        <div className="footer-col">
          <h3 className="footer-title">Head Office</h3>
          
          <div className="contact-item">
            <FiMapPin className="contact-icon" />
            <div className="contact-text">
              <h4>Address</h4>
              <p>Comvent House, 1196 Madurdaha,<br />Kolkata-700100, West Bengal</p>
            </div>
          </div>

          <div className="contact-item">
            <FiShield className="contact-icon" />
            <div className="contact-text">
              <h4>GST Registration</h4>
              <p>19AAHFC5031A1ZZ</p>
            </div>
          </div>

          <div className="contact-item">
            <FiPhone className="contact-icon" />
            <div className="contact-text">
              <h4>Contact</h4>
              <p>+91 98XXX XXXXX (Ravi Pandey)</p>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="footer-bottom">
        <p>© 2025 Comvent Engineering. All Rights Reserved.</p>
        <p>Partnered with OSTBERG Sweden.</p>
      </div>
    </footer>
  );
};

export default Footer;