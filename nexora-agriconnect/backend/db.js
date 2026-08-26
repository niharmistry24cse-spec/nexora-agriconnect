const mongoose = require('mongoose');
const dns = require('dns');

// Disable buffering so queries fail or fallback immediately instead of hanging when disconnected
mongoose.set('bufferCommands', false);

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.log('ℹ️  No MONGO_URI provided in environment. Running in in-memory mode.');
    return false;
  }

  try {
    try {
      // Set default DNS servers to avoid querySrv ECONNREFUSED issues with local/ISP DNS resolvers
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (dnsErr) {
      // Ignore if DNS server override fails
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 4000
    });
    console.log('✓ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.warn('⚠️  MongoDB connection notice:', error.message);
    console.log('ℹ️  Backend will operate seamlessly with fallback in-memory data store.');
    return false;
  }
}

module.exports = connectDB;
