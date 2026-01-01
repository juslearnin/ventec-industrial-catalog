const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Ensure this path is correct based on your folder structure
const Product = require('./models/productModel');

console.log('1. Script started...');

dotenv.config({ path: './config.env' });
console.log('2. Config loaded.');

// --- PASTE BASE64 STRING HERE ---
const UNIVERSAL_FAN_IMG = "data:image/jpeg;base64,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"; 
// -------------------------------

// FIX: Data now matches your Strict Schema perfectly
const products = [
  {
    name: "Inline Duct Fan CK-315",
    category: "Inline Fan", // Matches Enum
    summary: "High-efficiency circular duct fan for everyday ventilation.",
    imageCover: UNIVERSAL_FAN_IMG, // Renamed from 'image'
    technicalSpecs: { // Renamed from 'specs'
      airFlow: "1500 m³/h", // Capital F
      pressure: "450 Pa"
    }
  },
  {
    name: "Rectangular Channel Fan",
    category: "Inline Fan", // Matches Enum
    summary: "Low-profile rectangular fan designed for tight ceiling spaces.",
    imageCover: UNIVERSAL_FAN_IMG,
    technicalSpecs: {
      airFlow: "2200 m³/h",
      pressure: "600 Pa"
    }
  },
  {
    name: "Heavy Duty Axial Fan",
    category: "Wall Fan", // Mapped to 'Wall Fan' Enum
    summary: "Industrial-grade axial fan for high-volume air movement.",
    imageCover: UNIVERSAL_FAN_IMG,
    technicalSpecs: {
      airFlow: "5000 m³/h",
      pressure: "200 Pa"
    }
  },
  {
    name: "Roof Extractor TKS",
    category: "Roof Fan", // Matches Enum
    summary: "Vertical discharge roof fan with weather-resistant casing.",
    imageCover: UNIVERSAL_FAN_IMG,
    technicalSpecs: {
      airFlow: "1200 m³/h",
      pressure: "350 Pa"
    }
  },
  {
    name: "Industrial Centrifugal Blower",
    category: "Air Handling Unit", // Mapped to closest Enum
    summary: "High-pressure blower for material handling and cooling.",
    imageCover: UNIVERSAL_FAN_IMG,
    technicalSpecs: {
      airFlow: "800 m³/h",
      pressure: "150 Pa"
    }
  },
  {
    name: "Sound Insulated Box Fan",
    category: "Inline Fan", // Matches Enum
    summary: "Silent-running cabinet fan for noise-sensitive environments.",
    imageCover: UNIVERSAL_FAN_IMG,
    technicalSpecs: {
      airFlow: "3000 m³/h",
      pressure: "500 Pa"
    }
  }
];

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log('3. Connecting to DB...');

mongoose
  .connect(DB)
  .then(() => {
    console.log('4. ✅ DB Connected!');
    seedData();
  })
  .catch(err => {
    console.log('❌ DB Error:', err.message);
  });

const seedData = async () => {
  try {
    console.log('5. Deleting old data...');
    await Product.deleteMany();
    console.log('6. Injecting new data...');
    await Product.create(products);
    console.log('7. ✅ Data Successfully Loaded!');
    process.exit();
  } catch (err) {
    console.log('❌ Error:', err);
    process.exit();
  }
};