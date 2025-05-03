import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the server directory
const dotenvResult = dotenv.config({ path: path.resolve(__dirname, '.env') }); // Store the result

// Add logging to confirm dotenv path and result
console.log(`Attempting to load .env file from: ${path.resolve(__dirname, '.env')}`);
if (dotenvResult.error) {
  console.error('❌ Error loading .env file:', dotenvResult.error);
} else {
  console.log('✅ .env file loaded successfully. Parsed variables:', Object.keys(dotenvResult.parsed || {}));
}

// Import Cloudinary and the initializer
import cloudinary, { initializeCloudinary } from "./utils/cloudinary.js"; // Import default and named export

// Initialize Cloudinary *after* dotenv has run
initializeCloudinary();

import express from "express";
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
import aiRoutes from "./routes/aiRoutes.js";

// Init
const app = express();
const PORT = process.env.PORT || 5000;

// DB Connect
connectDB();

// Security & Logging
app.use(helmet());

// Determine allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(morgan("dev"));
app.use(cookieParser());

// Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const isDev = process.env.NODE_ENV !== 'production';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: isDev ? 1000 : 100, // Much higher limit in development
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);

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
