import express from "express";
import {
  createPost,
  deletePost,
  toggleLikePost,
  updatePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import parser from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/create", protect, parser.single("image"), createPost);
router.put("/:id/like", protect, toggleLikePost);
router.put("/:id", protect, parser.single("image"), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
