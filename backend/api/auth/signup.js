const connectDB = require("../../database"); // Import database connection

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await connectDB(); // Connect to MongoDB
    const users = db.collection("users"); // Collection name

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