import Comment from '../models/Comment.js';
import mongoose from 'mongoose'; // Import mongoose

export const createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const comment = await Comment.create({
      postId,
      text,
      author: req.user._id,
    });
    await comment.populate('author', 'username');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Comment creation failed' });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Invalid Comment ID format" });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the author of the comment
    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own comments" });
    }

    await comment.deleteOne(); // Use deleteOne() on the document

    res.status(200).json({ message: "Comment deleted successfully" });

  } catch (err) {
    console.error("Delete Comment Error:", err);
    res.status(500).json({ message: "Failed to delete comment", error: err.message });
  }
};
