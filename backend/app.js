require('dotenv').config();  // Load environment variables

const { MongoClient, ServerApiVersion } = require('mongodb');

// Retrieve the full MongoDB URI from the .env file
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MongoDB URI in environment variables");
  process.exit(1);  // Exit if the Mongo URI is missing
}

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,  // 30 seconds timeout
  socketTimeoutMS: 45000,   // 45 seconds socket timeout
});

async function run() {
  try {
    await client.connect(); // Connect to MongoDB
    console.log("✅ Connected to MongoDB successfully");

    // Check if the connection works
    const db = client.db("sample_mflix");
    await db.command({ ping: 1 });
    console.log("✅ Ping successful - Connection is active");
  } catch (err) {
    // Handle MongoDB connection error
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);  // Exit on connection failure
  }
}

run();