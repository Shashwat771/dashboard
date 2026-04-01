const mongoose = require('mongoose');

async function connectDB() {
    try {
      const mongodbUri = process.env.MONGODB_URI;
      
      if (!mongodbUri) {
        console.warn('⚠️ MONGODB_URI not set in .env file');
        console.warn('ℹ️ Features requiring database will not work');
        return;
      }
      
      await mongoose.connect(mongodbUri);
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('❌ Error connecting to MongoDB:', err.message);
      console.warn('⚠️ Server will continue without database - features that require DB will not work');
    }
}

module.exports = connectDB;