import { motion } from 'framer-motion';
import { FiWind, FiActivity } from 'react-icons/fi';
import './ProductCard.css';

const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/2857/2857433.png"; 

const ProductCard = ({ product }) => {
  // FIX: Check for 'imageCover' (Real DB) OR 'image' (Mock Data)
  const finalImage = product.imageCover || product.image || DEFAULT_IMG;

  // FIX: Check for 'technicalSpecs' (Real DB) OR 'specs' (Mock Data)
  const specs = product.technicalSpecs || product.specs || {};

  return (
    <motion.div 
      className="product-card"
      layout 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-image-container">
        <img 
          src={finalImage} 
          alt={product.name} 
          className="product-image" 
        />
        
        <div className="card-overlay">
          <button className="view-btn">View Datasheet</button>
        </div>
      </div>

      <div className="card-details">
        <div>
          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.name}</h3>
        </div>

        <div className="tech-specs">
          <div className="spec-item">
            <span className="spec-label"><FiWind /> Airflow</span>
            <span className="spec-value">{specs.airFlow || specs.airflow || 'N/A'}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label"><FiActivity /> Pressure</span>
            <span className="spec-value">{specs.pressure || 'N/A'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;