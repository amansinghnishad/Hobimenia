import Post from "../models/Post.js";
import mongoose from 'mongoose'; // Import mongoose

// CREATE Post
export const createPost = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Validate caption
    const { caption } = req.body;
    if (!caption || caption.trim() === "") {
      return res.status(400).json({ message: "Caption is required" });
    }
    // Handle image (optional)
    const imageUrl = req.file?.path || "";

    // Use correct field names for Post model
    const newPost = new Post({
      caption,
      imageUrl,
      author: req.user._id,
    });
    await newPost.save();
    // Populate author for frontend compatibility
    await newPost.populate("author", "username profilePic");
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

// LIKE/UNLIKE Post
export const toggleLikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(userId);

    if (liked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ liked: !liked, likesCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle like", error: err.message });
  }
};

// EDIT Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { caption } = req.body;
    if (caption) post.caption = caption;

    // Optional: handle updated image
    if (req.file?.path) {
      post.imageUrl = req.file.path;
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
};

// DELETE Post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id; // Safely access _id

  // ✅ Log the user ID from the token
  console.log(`[Delete Post] Attempt by User ID: ${userId}`);

  // Basic check if user ID exists from middleware
  if (!userId) {
    return res.status(401).json({ message: "Authentication error: User ID missing" });
  }
  // Validate Post ObjectId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid Post ID format" });
  }


  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Log the post author ID
    console.log(`[Delete Post] Post ID: ${postId}, Author ID: ${post.author}`);

    // THE AUTHORIZATION CHECK:
    if (post.author.toString() !== userId.toString()) {
      console.error(`[Delete Post] Auth Failure: User ${userId} cannot delete post owned by ${post.author}`);
      return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
    }

    await post.deleteOne();
    console.log(`[Delete Post] Success: Post ${postId} deleted by User ${userId}`);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("[Delete Post] Server Error:", err);
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};

// GET Post By ID
export const getPostById = async (req, res) => {
  const postId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid Post ID format" });
  }

  try {
    const post = await Post.findById(postId).populate("author", "username profilePic"); // Populate author details

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("Get Post By ID Error:", err);
    res.status(500).json({ message: "Failed to fetch post", error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic"); // Ensure author is populated
    res.json(posts);
  } catch (err) {
    console.error("Get All Posts Error:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostsByUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from params

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  try {
    // ✅ Changed 'creator' to 'author' to match the Post model schema
    // ✅ Populate author details for consistency
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic");
    res.status(200).json(posts);
  } catch (err) {
    console.error("Get Posts By User Error:", err); // Add specific logging
    res.status(500).json({ message: "Failed to fetch user posts", error: err.message });
  }
};
