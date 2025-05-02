import express from "express";
import parser from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserProfile, updateProfilePic } from "../controllers/userController.js";

const router = express.Router();
router.get("/:id", protect, getUserProfile);
router.patch("/profile-pic", protect, parser.single("image"), updateProfilePic);


export default router;
