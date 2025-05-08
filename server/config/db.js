import mongoose from "mongoose";
import logger from "./logger.js"; // Import the logger

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "hobimenia",
    });

    // Replace console.log with logger.info
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Replace console.error with logger.error
    logger.error("❌ MongoDB connection failed:", { message: error.message, stack: error.stack });
    process.exit(1);
  }
};

export default connectDB;
