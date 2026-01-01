const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1. Safety Net for Crashes
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err.stack); // This will tell us WHICH line failed
  process.exit(1);
});

dotenv.config({ path: './config.env' });

// 2. Import App
console.log("⏳ Importing App...");
const app = require('./app');

// 3. Check if App is valid
if (typeof app.listen !== 'function') {
    console.error("❌ CRITICAL ERROR: 'app.js' is not exporting the express app correctly.");
    console.error("👉 ACTION: Open app.js and ensure 'module.exports = app;' is at the very bottom.");
    process.exit(1);
}

const DB = process.env.DATABASE;

// 4. Connect to Database
mongoose
  .connect(DB)
  .then(() => console.log('✅ DB connection successful!'))
  .catch(err => console.log('❌ DB Connection Error:', err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🚀 Comvent Backend running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});