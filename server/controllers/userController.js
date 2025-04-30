const User = require("../models/User");
const Post = require("../models/Post");

exports.getUserProfile = async (req, res) => {
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