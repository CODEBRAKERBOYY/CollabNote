import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ====================== REGISTER ======================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    // ✅ Use fallback secret
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ====================== LOGIN ======================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Use fallback secret
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
