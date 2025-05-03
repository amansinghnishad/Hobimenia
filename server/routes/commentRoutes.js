import express from 'express';
import { createComment, getCommentsByPost, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createComment);
router.get('/:postId', protect, getCommentsByPost);
router.delete('/:commentId', protect, deleteComment);

export default router;
