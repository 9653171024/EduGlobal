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

// --Login--

// --- LOGIN ROUTE (Safe Version) ---
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic Validation: Did the frontend send empty data?
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }

    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    // 2. Check if user exists
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 3. Safe Password Comparison
    // We ensure both sides are strings before trimming to prevent crashes
    const dbPassword = String(user.password).trim();
    const inputPassword = String(password).trim();

    if (dbPassword === inputPassword) {
      res.json({
        message: "Login Successful",
        user: { 
          _id: user._id, 
          name: user.name, 
          email: user.email,
          visaStatus: user.visaStatus || "In Progress", 
          loanStatus: user.loanStatus || "Reviewing"
        }
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }

  } catch (error) {
    console.error("Login Route Crashed:", error); // Shows the specific error in terminal
    res.status(500).json({ message: "Server Error" });
  }
});

// --- . START SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});