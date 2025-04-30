import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
// import aiRoutes from "./routes/aiRoutes.js";

// Init
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// DB Connect
connectDB();

// Security & Logging
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
// app.use("/api/ai", aiRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hobimenia API is running 🚀");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
