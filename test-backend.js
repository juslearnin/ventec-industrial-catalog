// A simple script to test your API without Postman
// Run this with: node test-backend.js

const API_URL = 'http://localhost:8000/api/v1';

async function runTests() {
  console.log('🤖 STARTING SYSTEM TESTS...\n');

  // ---------------------------------------------------------
  // TEST 1: Create a New Product (The "Admin" Action)
  // ---------------------------------------------------------
  console.log('1️⃣  Testing Product Creation...');
  
  const productData = {
    name: "Ostberg Inline Fan CK-100 " + Math.floor(Math.random() * 1000), // Random name to avoid duplicates
    category: "Inline Fan",
    summary: "High efficiency duct fan for industrial use.",
    description: "The CK-100 is a centrifugal duct fan with high capacity and excellent reliability.",
    imageCover: "fan-ck100.jpg",
    technicalSpecs: {
      airFlow: "500 m3/h",
      pressure: "300 Pa"
    }
  };

  try {
    const prodResponse = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    const prodJson = await prodResponse.json();

    if (prodResponse.ok) {
      console.log('✅ SUCCESS: Product Created!');
      console.log(`   ID: ${prodJson.data.product._id}`);
      console.log(`   Name: ${prodJson.data.product.name}\n`);
    } else {
      console.log('❌ FAILED to create product.');
      console.log(prodJson);
    }
  } catch (err) {
    console.log('❌ NETWORK ERROR on Product Test:', err.message);
  }

  // ---------------------------------------------------------
  // TEST 2: Fetch All Products (The "User" Action)
  // ---------------------------------------------------------
  console.log('2️⃣  Testing Product Fetching...');
  
  try {
    const getResponse = await fetch(`${API_URL}/products`);
    const getJson = await getResponse.json();

    if (getResponse.ok) {
      console.log('✅ SUCCESS: Retrieved Products!');
      console.log(`   Total Products Found: ${getJson.results}\n`);
    } else {
      console.log('❌ FAILED to fetch products.');
    }
  } catch (err) {
    console.log('❌ NETWORK ERROR on Fetch Test:', err.message);
  }

  // ---------------------------------------------------------
  // TEST 3: Send an Enquiry (The "Client" Action)
  // ---------------------------------------------------------
  console.log('3️⃣  Testing Enquiry Form...');

  const enquiryData = {
    name: "Test Client",
    email: "client@test.com",
    message: "I am interested in buying 50 Inline Fans. Please quote price."
  };

  try {
    const enqResponse = await fetch(`${API_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });

    const enqJson = await enqResponse.json();

    if (enqResponse.ok) {
      console.log('✅ SUCCESS: Enquiry Sent!');
      console.log(`   Status: ${enqJson.message}\n`);
    } else {
      console.log('❌ FAILED to send enquiry.');
      console.log(enqJson);
    }
  } catch (err) {
    console.log('❌ NETWORK ERROR on Enquiry Test:', err.message);
  }

  console.log('🤖 TESTS COMPLETED.');
}

runTests();