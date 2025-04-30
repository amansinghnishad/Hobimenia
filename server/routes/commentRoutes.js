import express from 'express';
import { createComment, getCommentsByPost } from '../controllers/commentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createComment);
router.get('/:postId', protect, getCommentsByPost);

export default router;
