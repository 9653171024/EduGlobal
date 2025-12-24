const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const axios = require('axios'); // Ensure this is correct
const path = require('path');

// Load College Data Safely
let college_list = [];
try {
  college_list = require('./data/colleges.json');
  console.log(college_list)
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

// --- SMART RECOMMENDATION ROUTE ---
// --- RECOMMENDATION ROUTE (Anti-Hang Version) ---
app.post('/api/colleges/recommend', async (req, res) => {
  console.log("📩 Recommendation Request Received..."); // Log when request hits

  try {
    const { country, type, specialization } = req.body || {};

    let result = college_list;

    // 1. Strict Filter
    let strictMatches = result.filter(c => 
      (!country || c.country === country) &&
      (!type || c.type === type) &&
      (!specialization || c.specialization === specialization)
    );

    if (strictMatches.length > 0) {
      result = strictMatches;
    } else {
      console.log("⚠️ Fallback Logic Triggered");
      // Fallback: Priority to Specialization
      let fallbackSpec = result.filter(c => c.specialization === specialization);
      if (fallbackSpec.length > 0) result = fallbackSpec;
      else if (country) result = result.filter(c => c.country === country);
    }

    if (result.length === 0) result = college_list.slice(0, 4);

    // 2. Currency Conversion (WITH TIMEOUT)
    let exchangeRate = 84; 
    try {
      console.log("💱 Fetching Currency...");
      const rateRes = await axios.get('https://api.exchangerate-api.com/v4/latest/USD', {
        timeout: 2000 // 🛑 Stop waiting after 2 seconds
      });
      exchangeRate = rateRes.data.rates.INR;
      console.log("✅ Currency Fetched:", exchangeRate);
    } catch (e) {
      console.log("⚠️ Currency API Slow/Failed. Using Default 84.");
    }

    // 3. Enrich Data
    const finalData = result.map(col => ({
      ...col,
      liveFees: ((col.feesUSD * exchangeRate) / 100000).toFixed(2) + " Lakhs",
      isTopTier: col.ranking <= 10
    }));

    console.log("🚀 Sending Response back to Frontend");
    res.json({ success: true, data: finalData, meta: { liveRate: exchangeRate } });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- KEEP YOUR USER ROUTES ---
app.post('/api/users/register', async (req, res) => { /* Keeping existing logic */ }); 
app.post('/api/users/login', async (req, res) => { /* Keeping existing logic */ });



const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));