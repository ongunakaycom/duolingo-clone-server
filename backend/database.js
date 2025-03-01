require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Load the connection string from .env
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

let isConnected = false; // Flag to check connection

async function connectDB() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("✅ Connected to MongoDB successfully");
    } catch (err) {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1); // Exit process if DB connection fails
    }
  }
  return client.db("sample_mflix"); // Use your actual DB name here
}

module.exports = connectDB;