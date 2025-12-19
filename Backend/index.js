// backend/server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();

// --- 1. MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// --- 2. DATABASE CONFIGURATION ---
// I added "HigherEdPlatform" after .net/ so your data goes to the right place
const MONGO_URI = "mongodb+srv://Sakshi:I1lmFpFhjL46Rs8D@cluster0.rqun4c6.mongodb.net/HigherEdPlatform?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = 'HigherEdPlatform';

let db;

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ Connected to MongoDB via MongoClient");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

connectDB();

// --- 3. API ROUTE (Register Student) ---
app.post('/api/users/register', async (req, res) => {
  try {
    const userData = req.body;

    // Basic Validation
    if (!userData.email || !userData.name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const usersCollection = db.collection('users');

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert User
    const newUser = { ...userData, createdAt: new Date() };
    const result = await usersCollection.insertOne(newUser);

    console.log("User Saved:", result.insertedId);
    res.status(201).json({ message: "Student Profile Created Successfully!", userId: result.insertedId });

  } catch (error) {
    console.error("Error in Register Route:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- 4. START SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});