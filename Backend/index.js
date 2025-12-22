const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const axios = require('axios'); // Ensure this is correct
const path = require('path');

// Load College Data Safely
let college_list = [];
try {
  college_list = require('./data/colleges.json');
} catch (e) {
  console.error("⚠️ Could not load colleges.json. Check file path!");
  college_list = []; // Fallback empty array
}

const app = express();
app.use(express.json());
app.use(cors());


// --- DATABASE CONFIGURATION ---
const MONGO_URI = "mongodb+srv://Sakshi:I1lmFpFhjL46Rs8D@cluster0.rqun4c6.mongodb.net/HigherEdPlatform?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = 'HigherEdPlatform';

let db;
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ DB Error:", err.message);
  }
}
connectDB();

// --Logic Route
// --- 3. API ROUTE (Register Student) ---
app.post('/api/users/register', async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.email || !userData.name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const usersCollection = db.collection('users');
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { ...userData, createdAt: new Date() };
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "Student Profile Created Successfully!", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// --- 4. LOGIN ROUTE ---
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Please provide both" });

    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    if (String(user.password).trim() === String(password).trim()) {
      res.json({
        message: "Login Successful",
        user: { _id: user._id, name: user.name, email: user.email }
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// --- RECOMMENDATION ROUTE (The Fix) ---
// --- RECOMMENDATION ROUTE (DEBUG VERSION) ---
app.post('/api/colleges/recommend', async (req, res) => {
  try {
    const { country, type, specialization } = req.body || {};

    // 🛑 DEBUG LOG 1: Print what the backend received
    console.log("------------------------------------------------");
    console.log("🔍 REQUEST RECEIVED:");
    console.log("Country:", country);
    console.log("Type:", type);
    console.log("Specialization:", specialization);
    console.log("------------------------------------------------");

    let result = college_list;

    // FILTERING LOGIC
    // We strictly check if the variable exists AND is not empty
    if (country && country.trim() !== "") {
      result = result.filter(c => c.country === country);
    }

    if (type && type.trim() !== "") {
      result = result.filter(c => c.type === type);
    }

    if (specialization && specialization.trim() !== "") {
      // Use includes() for better matching (e.g. "CS" matches "CS/IT")
      result = result.filter(c => c.specialization === specialization);
    }

    // 🛑 DEBUG LOG 2: Print how many matches found
    console.log(`✅ Matches Found: ${result.length}`);

    // Fallback if empty
    if (result.length === 0) {
      console.log("⚠️ No matches. Returning default top 4.");
      result = college_list.slice(0, 4);
    }

    // ... (Keep your Currency and Response logic same as before) ...
    // Currency Logic
    let exchangeRate = 84;
    try {
      const rateRes = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      exchangeRate = rateRes.data.rates.INR;
    } catch (e) {
      console.log("Currency API failed");
    }

    const finalData = result.map(col => ({
      ...col,
      liveFees: ((col.feesUSD * exchangeRate) / 100000).toFixed(2) + " Lakhs",
      isTopTier: col.ranking <= 10
    }));

    res.json({ success: true, data: finalData, meta: { liveRate: exchangeRate } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));