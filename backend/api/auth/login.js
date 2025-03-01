require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    await client.connect();
    const db = client.db("duolingo-vue-backend");
    const users = db.collection("users");

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await users.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};