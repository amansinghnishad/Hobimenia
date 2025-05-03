import User from "../models/User.js";
import Post from "../models/Post.js";

export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.profilePic = req.file.path;
    await user.save();
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile picture", error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // ✅ Use req.params.id
    // ✅ Find user by ID
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Get User Profile Error:", err); // Add specific logging
    res.status(500).json({ message: "Failed to fetch user profile", error: err.message });
  }
};