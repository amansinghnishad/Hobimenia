import Post from "../models/Post.js";
import mongoose from 'mongoose';
import logger from "../config/logger.js"; // Import the logger

// CREATE Post
export const createPost = async (req, res) => {
  const userId = req.user?._id;
  const { caption, category } = req.body;
  logger.info('Create post attempt', { userId, caption: caption?.substring(0, 30) + '...', category, hasImage: !!req.file });

  try {
    if (!userId) {
      logger.warn('Create post failed - Unauthorized', { caption, category });
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!caption || caption.trim() === "") {
      logger.warn('Create post failed - Caption required', { userId, category });
      return res.status(400).json({ message: "Caption is required" });
    }
    if (!category) {
      logger.warn('Create post failed - Category required', { userId, caption });
      return res.status(400).json({ message: "Category is required" });
    }

    const imageUrl = req.file?.path || "";
    const newPost = new Post({
      caption,
      imageUrl,
      author: userId,
      category,
    });
    await newPost.save();
    await newPost.populate("author", "username profilePic");
    logger.info('Post created successfully', { postId: newPost._id, userId, category });
    res.status(201).json(newPost);
  } catch (error) {
    logger.error('Create Post Error', { error: error.message, stack: error.stack, userId, caption, category });
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};

// LIKE/UNLIKE Post
export const toggleLikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  logger.info('Toggle like attempt', { postId, userId });

  try {
    if (!userId) {
      logger.warn('Toggle like failed - Unauthorized', { postId });
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      logger.warn('Toggle like failed - Post not found', { postId, userId });
      return res.status(404).json({ message: "Post not found" });
    }

    const liked = post.likes.includes(userId);
    if (liked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }
    await post.save();
    logger.info(`Post ${liked ? 'unliked' : 'liked'} successfully`, { postId, userId, newLikeState: !liked, likesCount: post.likes.length });
    res.status(200).json({ liked: !liked, likesCount: post.likes.length });
  } catch (err) {
    logger.error('Failed to toggle like', { error: err.message, stack: err.stack, postId, userId });
    res.status(500).json({ message: "Failed to toggle like", error: err.message });
  }
};

// EDIT Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  const { caption, category } = req.body;
  logger.info('Update post attempt', { postId, userId, caption: caption?.substring(0, 30) + '...', category, hasNewImage: !!req.file });

  try {
    if (!userId) {
      logger.warn('Update post failed - Unauthorized (no user ID)', { postId });
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      logger.warn('Update post failed - Post not found', { postId, userId });
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== userId.toString()) {
      logger.warn('Update post failed - Unauthorized (user mismatch)', { postId, userId, postAuthor: post.author.toString() });
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (caption) post.caption = caption;
    if (category) post.category = category;

    if (req.file?.path) {
      post.imageUrl = req.file.path;
    }
    await post.save();
    logger.info('Post updated successfully', { postId, userId, category });
    res.status(200).json(post);
  } catch (err) {
    logger.error('Failed to update post', { error: err.message, stack: err.stack, postId, userId, category });
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
};

// DELETE Post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?._id;
  logger.info('[Delete Post] Attempt', { postId, userId });

  if (!userId) {
    logger.warn('[Delete Post] Auth error - User ID missing', { postId });
    return res.status(401).json({ message: "Authentication error: User ID missing" });
  }
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    logger.warn('[Delete Post] Invalid Post ID format', { postId, userId });
    return res.status(400).json({ message: "Invalid Post ID format" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      logger.warn('[Delete Post] Post not found', { postId, userId });
      return res.status(404).json({ message: "Post not found" });
    }
    logger.debug('[Delete Post] Post found', { postId, authorId: post.author });

    if (post.author.toString() !== userId.toString()) {
      logger.error('[Delete Post] Auth Failure', { userId, postAuthor: post.author, postId });
      return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
    }

    await post.deleteOne();
    logger.info('[Delete Post] Success', { postId, userId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    logger.error("[Delete Post] Server Error", { error: err.message, stack: err.stack, postId, userId });
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};

// GET Post By ID
export const getPostById = async (req, res) => {
  const postId = req.params.id;
  logger.info('Get post by ID attempt', { postId });

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    logger.warn('Get post by ID failed - Invalid Post ID format', { postId });
    return res.status(400).json({ message: "Invalid Post ID format" });
  }

  try {
    const post = await Post.findById(postId).populate("author", "username profilePic");
    if (!post) {
      logger.warn('Get post by ID failed - Post not found', { postId });
      return res.status(404).json({ message: "Post not found" });
    }
    logger.info('Post fetched successfully by ID', { postId });
    res.status(200).json(post);
  } catch (err) {
    logger.error("Get Post By ID Error", { error: err.message, stack: err.stack, postId });
    res.status(500).json({ message: "Failed to fetch post", error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  const { category } = req.query;
  logger.info('Get all posts attempt', { category });
  try {
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic");
    logger.info(`Fetched all posts successfully. Count: ${posts.length}`, { category });
    res.json(posts);
  } catch (err) {
    logger.error("Get All Posts Error", { error: err.message, stack: err.stack, category });
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostsByUser = async (req, res) => {
  const userId = req.params.id;
  const { category } = req.query;
  logger.info('Get posts by user attempt', { userId, category });

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    logger.warn('Get posts by user failed - Invalid User ID format', { userId });
    return res.status(400).json({ message: "Invalid User ID format" });
  }

  try {
    const filter = { author: userId };
    if (category) {
      filter.category = category;
    }
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic");
    logger.info(`Fetched posts for user successfully. User ID: ${userId}, Count: ${posts.length}`, { category });
    res.status(200).json(posts);
  } catch (err) {
    logger.error("Get Posts By User Error", { error: err.message, stack: err.stack, userId, category });
    res.status(500).json({ message: "Failed to fetch user posts", error: err.message });
  }
};
