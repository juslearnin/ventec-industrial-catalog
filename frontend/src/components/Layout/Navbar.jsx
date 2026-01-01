import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Industrial Fans', href: '#products' },
    { name: 'Exhaust & Axial', href: '#products' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* BRANDING */}
        <a href="#" className="logo">
          COMVENT<span style={{ fontWeight: '300', color: 'var(--color-secondary)' }}>ENGINEERING</span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          
          <button className="btn btn-primary desktop-quote">
            <FiPhone style={{ marginRight: '8px' }} /> Get Quote
          </button>

          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="mobile-link" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;