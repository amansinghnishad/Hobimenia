import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import logger from "../config/logger.js"; // Import the logger

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @route POST /api/auth/signup
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  logger.info('Signup attempt', { email, username }); // Log signup attempt

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn('Signup failed - Email already in use', { email });
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({ username, email, password });
    logger.info('User created successfully', { userId: user._id, email });

    const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjusted sameSite
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } catch (err) {
    // Replace console.error with logger.error
    logger.error('Signup failed', { error: err.message, stack: err.stack, email });
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// @route POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  logger.info('Login attempt', { email }); // Log login attempt

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Login failed - User not found', { email });
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn('Login failed - Invalid password', { email });
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    logger.info('Login successful', { userId: user._id, email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjusted sameSite
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    // Replace console.error with logger.error
    logger.error('Login server error', { error: err.message, stack: err.stack, email });
    res.status(500).json({ message: "Server error" });
  }
};

// @route POST /api/auth/logout
export const logout = (req, res) => {
  // Log logout attempt, include user if available (e.g., from req.user if middleware ran)
  const userId = req.user?._id;
  logger.info('Logout attempt', { userId: userId || 'N/A' });
  res.clearCookie("token").status(200).json({ message: "Logged out" });
};
