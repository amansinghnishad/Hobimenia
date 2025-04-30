import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import parser from "../middlewares/uploadMiddleware.js";
import { updateProfilePic } from "../controllers/userController.js";

const router = express.Router();
router.get("/:username", authMiddleware, getUserProfile);

router.patch("/profile-pic", protect, parser.single("image"), updateProfilePic);


export default router;
