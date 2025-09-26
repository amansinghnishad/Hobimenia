import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import logger from "../config/logger.js"; // Import the logger
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
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
    logger.info('User created successfully', { userId: user._id, email }); const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjusted sameSite
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token,
      });
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  logger.info('Forgot password request', { email });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Forgot password failed - User not found', { email });
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email
    if (!process.env.FRONTEND_URL) {
      logger.error("FRONTEND_URL is not defined in .env file");
      return res
        .status(500)
        .json({ message: "Server configuration error: FRONTEND_URL not set" });
    }
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetUrl} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Token",
        message,
      });
      res.status(200).json({ message: "Email sent" });
    } catch (err) {
      logger.error('Email sending failed', { email, error: err.message });
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (err) {
    logger.error('Forgot password error', { error: err.message });
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  // Get token from params
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    logger.error('Reset password error', { error: err.message });
    res.status(500).json({ message: "Server error" });
  }
};
