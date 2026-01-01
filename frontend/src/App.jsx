import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/UI/CustomCursor';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Layout/Hero';
import PartnerStrip from './components/Layout/PartnerStrip';
import ProductCatalog from './components/Products/ProductCatalog';
import AboutSection from './components/Layout/AboutSection';
import ContactSection from './components/Layout/ContactSection'; // <--- Import
import Footer from './components/Layout/Footer';

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <PartnerStrip />
        <ProductCatalog />
        <AboutSection />
        <ContactSection /> {/* <--- Add here */}
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;