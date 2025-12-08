const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wellness-store';
    
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI not found in .env file, using default: mongodb://localhost:27017/wellness-store');
      console.warn('⚠️  Please create a .env file in the server folder with MONGODB_URI');
    }

    const conn = await mongoose.connect(mongoURI, {
      // Mongoose 6+ no longer needs these options, but keeping for compatibility
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Make sure MongoDB is running (for local): Get-Service -Name MongoDB');
    console.error('   2. Check MONGODB_URI in your .env file');
    console.error('   3. For local MongoDB, use: mongodb://localhost:27017/wellness-store');
    console.error('   4. For MongoDB Atlas, use connection string from Atlas dashboard');
    console.error('');
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;

