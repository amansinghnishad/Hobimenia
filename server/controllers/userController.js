import User from "../models/User.js";
import Post from "../models/Post.js";

export const updateProfilePic = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ user, posts });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user profile", error: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}