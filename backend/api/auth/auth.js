require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,  // 30 seconds timeout
  socketTimeoutMS: 45000,   // 45 seconds socket timeout
});

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await client.connect(); 
    const db = client.db("duolingo-vue-backend");
    const users = db.collection("users");

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert new user
    const newUser = { email, password };
    await users.insertOne(newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};