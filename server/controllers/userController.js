import User from "../models/User.js";
import Post from "../models/Post.js";
import logger from "../config/logger.js"; // Assuming you have a logger

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      logger.warn('User profile not found', { userId });
      return res.status(404).json({ message: "User not found" });
    }

    const postCount = await Post.countDocuments({ author: userId });

    res.status(200).json({
      ...user.toObject(),
      postsCount: postCount,
    });

  } catch (err) {
    logger.error("Get User Profile Error:", { error: err.message, stack: err.stack, userId: req.params.id });
    res.status(500).json({ message: "Failed to fetch user profile", error: err.message });
  }
};

// Update User Profile (Bio, Interests)
export const updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const { bio, interests } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      logger.warn('User not found for profile update', { userId });
      return res.status(404).json({ message: "User not found" });
    }

    if (bio !== undefined) user.bio = bio;
    if (interests !== undefined) {
      if (Array.isArray(interests) && interests.every(i => typeof i === 'string')) {
        user.interests = interests.map(interest => interest.trim()).filter(interest => interest !== "");
      } else if (typeof interests === 'string') { // Handle comma-separated string for simplicity from client
        user.interests = interests.split(',').map(interest => interest.trim()).filter(interest => interest !== "");
      } else if (interests === null || interests === '') {
        user.interests = [];
      }
    }

    const updatedUser = await user.save();
    logger.info('User profile updated', { userId });
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      bio: updatedUser.bio,
      interests: updatedUser.interests,
      coverPhoto: updatedUser.coverPhoto,
      followersCount: updatedUser.followersCount,
      followingCount: updatedUser.followingCount,
      postsCount: await Post.countDocuments({ author: userId }),
    });
  } catch (err) {
    logger.error("Update User Profile Error:", { error: err.message, stack: err.stack, userId });
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};

// Update Profile Picture
export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.file) {
      logger.warn('No image uploaded for profile pic', { userId });
      return res.status(400).json({ message: "No image uploaded" });
    }
    const user = await User.findById(userId);
    if (!user) {
      logger.warn('User not found for profile pic update', { userId });
      return res.status(404).json({ message: "User not found" });
    }
    user.profilePic = req.file.path; // Assuming path comes from multer/cloudinary middleware
    const updatedUser = await user.save();
    logger.info('Profile picture updated', { userId });
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      bio: updatedUser.bio,
      interests: updatedUser.interests,
      coverPhoto: updatedUser.coverPhoto,
      followersCount: updatedUser.followersCount,
      followingCount: updatedUser.followingCount,
      postsCount: await Post.countDocuments({ author: userId }),
    });
  } catch (err) {
    logger.error("Update Profile Pic Error:", { error: err.message, stack: err.stack, userId: req.user._id });
    res.status(500).json({ message: "Failed to update profile picture", error: err.message });
  }
};

// Update Cover Photo
export const updateCoverPhoto = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.file) {
      logger.warn('No image uploaded for cover photo', { userId });
      return res.status(400).json({ message: "No image uploaded" });
    }
    const user = await User.findById(userId);
    if (!user) {
      logger.warn('User not found for cover photo update', { userId });
      return res.status(404).json({ message: "User not found" });
    }
    user.coverPhoto = req.file.path; // Assuming path comes from multer/cloudinary middleware
    const updatedUser = await user.save();
    logger.info('Cover photo updated', { userId });
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      bio: updatedUser.bio,
      interests: updatedUser.interests,
      coverPhoto: updatedUser.coverPhoto,
      followersCount: updatedUser.followersCount,
      followingCount: updatedUser.followingCount,
      postsCount: await Post.countDocuments({ author: userId }),
    });
  } catch (err) {
    logger.error("Update Cover Photo Error:", { error: err.message, stack: err.stack, userId: req.user._id });
    res.status(500).json({ message: "Failed to update cover photo", error: err.message });
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const userIdToFollow = req.params.id;
  const currentUserId = req.user._id;

  if (userIdToFollow === currentUserId.toString()) {
    logger.warn('User cannot follow themselves', { currentUserId });
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      logger.warn('User not found for follow action', { userIdToFollow, currentUserId });
      return res.status(404).json({ message: "User not found." });
    }

    // Check if already following
    if (currentUser.following.includes(userIdToFollow)) {
      logger.info('User already followed', { currentUserId, userIdToFollow });
      return res.status(400).json({ message: "You are already following this user." });
    }

    currentUser.following.push(userIdToFollow);
    userToFollow.followers.push(currentUserId);

    await currentUser.save();
    await userToFollow.save();

    logger.info('User followed successfully', { currentUserId, userIdToFollow });
    res.status(200).json({ message: "User followed successfully." });

  } catch (err) {
    logger.error("Follow User Error:", { error: err.message, stack: err.stack, currentUserId, userIdToFollow });
    res.status(500).json({ message: "Failed to follow user", error: err.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  const userIdToUnfollow = req.params.id;
  const currentUserId = req.user._id;

  try {
    const userToUnfollow = await User.findById(userIdToUnfollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      logger.warn('User not found for unfollow action', { userIdToUnfollow, currentUserId });
      return res.status(404).json({ message: "User not found." });
    }

    // Check if not following
    if (!currentUser.following.includes(userIdToUnfollow)) {
      logger.info('User not currently followed', { currentUserId, userIdToUnfollow });
      return res.status(400).json({ message: "You are not following this user." });
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== userIdToUnfollow);
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId.toString());

    await currentUser.save();
    await userToUnfollow.save();

    logger.info('User unfollowed successfully', { currentUserId, userIdToUnfollow });
    res.status(200).json({ message: "User unfollowed successfully." });

  } catch (err) {
    logger.error("Unfollow User Error:", { error: err.message, stack: err.stack, currentUserId, userIdToUnfollow });
    res.status(500).json({ message: "Failed to unfollow user", error: err.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'followers',
      select: '_id username profilePic', // Select fields you want to return
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.followers);
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUserFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'following',
      select: '_id username profilePic', // Select fields you want to return
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.following);
  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ message: 'Server error' });
  }
};