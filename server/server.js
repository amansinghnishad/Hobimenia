import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the logger first to ensure it's available
import logger from "./config/logger.js";

const dotenvResult = dotenv.config({ path: path.resolve(__dirname, '.env') });

logger.info(`Attempting to load .env file from: ${path.resolve(__dirname, '.env')}`);
if (dotenvResult.error) {
  logger.error('❌ Error loading .env file:', dotenvResult.error);
} else {
  logger.info('✅ .env file loaded successfully. Parsed variables:', Object.keys(dotenvResult.parsed || {}));
}

import cloudinary, { initializeCloudinary } from "./utils/cloudinary.js";

initializeCloudinary();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      logger.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream: logger.stream }));
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

const isDev = process.env.NODE_ENV !== 'production';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 1000 : 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/contact', contactRoutes);

app.get("/", (req, res) => {
  res.send("Hobimenia API is running 🚀");
});

app.use((req, res) => {
  logger.warn(`404 Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: "API route not found" });
});

// Add a generic error handler to log unhandled errors
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  logger.info(`✅ Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
