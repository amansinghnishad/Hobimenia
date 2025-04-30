import Comment from '../models/Comment.js';

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
