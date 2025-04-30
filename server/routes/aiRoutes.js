const express = require("express");
const { generateText } = require("../controllers/aiController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateText);

module.exports = router;
