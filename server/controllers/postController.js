import Post from "../models/Post.js";

// CREATE Post
export const createPost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { caption } = req.body;
    const imageUrl = req.file?.path; // Cloudinary uploads via uploadMiddleware

    const newPost = new Post({
      caption,
      imageUrl,
      author: userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
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
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};


