import express from "express";
import parser from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  updateProfilePic,
  updateCoverPhoto,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserProfile);

router.put("/profile", protect, updateUserProfile);
router.patch("/profile-pic", protect, parser.single("profilePic"), updateProfilePic);
router.patch("/cover-photo", protect, parser.single("coverPhoto"), updateCoverPhoto);

router.post("/:id/follow", protect, followUser);
router.delete("/:id/unfollow", protect, unfollowUser);

export default router;
