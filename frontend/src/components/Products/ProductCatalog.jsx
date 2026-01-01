import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import './ProductCatalog.css';

// 1. Keep Mock Data as Backup
const UNIVERSAL_FAN_IMG = "https://cdn-icons-png.flaticon.com/512/2857/2857433.png"; 

const MOCK_PRODUCTS = [
  { id: 1, name: "Inline Duct Fan CK-315", category: "Inline Fans", image: UNIVERSAL_FAN_IMG, specs: { airflow: "1500 m³/h", pressure: "450 Pa" } },
  { id: 2, name: "Rectangular Channel Fan", category: "Industrial", image: UNIVERSAL_FAN_IMG, specs: { airflow: "2200 m³/h", pressure: "600 Pa" } },
  { id: 3, name: "Heavy Duty Axial Fan", category: "Axial Fans", image: UNIVERSAL_FAN_IMG, specs: { airflow: "5000 m³/h", pressure: "200 Pa" } },
  { id: 4, name: "Roof Extractor TKS", category: "Exhaust", image: UNIVERSAL_FAN_IMG, specs: { airflow: "1200 m³/h", pressure: "350 Pa" } },
  { id: 5, name: "Industrial Centrifugal Blower", category: "Industrial", image: UNIVERSAL_FAN_IMG, specs: { airflow: "800 m³/h", pressure: "150 Pa" } },
  { id: 6, name: "Sound Insulated Box Fan", category: "Inline Fans", image: UNIVERSAL_FAN_IMG, specs: { airflow: "3000 m³/h", pressure: "500 Pa" } }
];

const FILTER_CATEGORIES = ["All", "Inline Fan", "Wall Fan", "Roof Fan", "Air Handling Unit"];

const ProductCatalog = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [backendStatus, setBackendStatus] = useState("disconnected");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("📡 Frontend: Calling Backend...");
        const response = await fetch('http://localhost:8000/api/v1/products');
        console.log("📡 Frontend: Response Status:", response.status);

        if (!response.ok) throw new Error('Failed to connect');

        const jsonData = await response.json();
        console.log("📦 Frontend: Received Data:", jsonData);

        // --- SMART UNWRAPPING LOGIC ---
        let realProducts = [];

        if (Array.isArray(jsonData)) {
          // Case 1: The API returns just the array [ ... ]
          realProducts = jsonData;
        } else if (jsonData.data && Array.isArray(jsonData.data)) {
          // Case 2: { status: 'success', data: [ ... ] }
          realProducts = jsonData.data;
        } else if (jsonData.data && jsonData.data.products && Array.isArray(jsonData.data.products)) {
          // Case 3: { status: 'success', data: { products: [ ... ] } }  <-- MOST LIKELY YOUR CASE
          realProducts = jsonData.data.products;
        } else if (jsonData.products && Array.isArray(jsonData.products)) {
           // Case 4: { products: [ ... ] }
           realProducts = jsonData.products;
        }

        if (realProducts.length > 0) {
          console.log("✅ Frontend: Found", realProducts.length, "products!");
          setProducts(realProducts); 
          setBackendStatus("connected");
        } else {
          console.warn("⚠️ Frontend: Data structure empty or unrecognizable. Using Mock.");
        }

      } catch (err) {
        console.error("❌ Frontend Error:", err);
        setBackendStatus("error");
      }
    };

    fetchProducts();
  }, []);

  // Safe Filtering Logic (Handle missing categories gracefully)
  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => (p.category || "").includes(activeFilter.split(" ")[0]));

  return (
    <section id="products" className="catalog-section">
      <div className="container">
        <div className="catalog-header">
          <h2 className="section-title">Our Product Range</h2>
          <p className="section-subtitle">
            Engineered for efficiency. Built for durability.
            <span style={{ 
              fontSize: '0.6rem', 
              marginLeft: '10px', 
              color: backendStatus === 'connected' ? 'green' : 'red',
              fontWeight: 'bold'
            }}>
              ● {backendStatus === 'connected' ? 'Live DB' : 'Demo Mode'}
            </span>
          </p>
        </div>

        <div className="filter-bar">
          {FILTER_CATEGORIES.map((category) => (
            <button 
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div className="product-grid" layout>
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCatalog;