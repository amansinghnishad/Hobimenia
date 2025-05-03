import express from "express";
import {
  createPost,
  deletePost,
  toggleLikePost,
  updatePost,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import parser from "../middlewares/uploadMiddleware.js";
import { getPostsByUser } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", protect, getPostById);
router.post("/", protect, parser.single("image"), createPost);
router.put("/:id/like", protect, toggleLikePost);
router.put("/:id", protect, parser.single("image"), updatePost);
router.delete("/:id", protect, deletePost);
router.get("/user/:id", protect, getPostsByUser);

export default router;
