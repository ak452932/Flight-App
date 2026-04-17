import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- SIGNUP LOGIC ---
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup Request for:", email);

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save to Database (AWAIT zaroori hai)
    const user = await User.create({ 
      name, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });

    console.log("✅ User saved to DB:", user._id);

    res.status(201).json({ 
      message: "User created successfully", 
      user: { id: user._id, name: user.name, email: user.email } 
    });

  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// --- LOGIN LOGIC ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Find User
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate Token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'fallback_secret_key', 
      { expiresIn: '1d' }
    );

    console.log("🔑 Login successful for:", email);

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};
