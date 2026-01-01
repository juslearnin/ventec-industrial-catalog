import './PartnerStrip.css';

const PartnerStrip = () => {
  // Real Data from Comvent Engineering Profile
  const items = [
    "INDUSTRIAL FANS",
    "AXIAL FLOW FANS",
    "CENTRIFUGAL BLOWERS",
    "EXHAUST SYSTEMS",
    "ROOF EXTRACTORS",
    "INLINE DUCT FANS",
    "AIR HANDLING UNITS",
    "HIGH PRESSURE FANS",
    "INDUSTRIAL FANS", // Repeat to ensure smooth infinite scroll
    "AXIAL FLOW FANS",
    "CENTRIFUGAL BLOWERS",
    "EXHAUST SYSTEMS"
  ];

  return (
    <div className="partner-strip">
      <div className="partner-track">
        {items.map((item, index) => (
          <span key={index} className="partner-logo">
            {/* The separator dot */}
            <span style={{ 
              color: 'var(--color-primary)', 
              marginRight: '15px',
              fontSize: '1.2rem' 
            }}>•</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PartnerStrip;