import express from "express";
import { generateText } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateText);

export default router;
