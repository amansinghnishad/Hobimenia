// server/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// Keep the export of the cloudinary object
export default cloudinary;

// Export an initialization function
export const initializeCloudinary = () => {
  console.log("--- Initializing Cloudinary ---");
  console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "MISSING");
  console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Loaded" : "MISSING");
  console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "MISSING");

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Optional: Check if config is set after calling .config()
  if (cloudinary.config().cloud_name) {
    console.log("✅ Cloudinary configured successfully.");
  } else {
    console.error("❌ Cloudinary configuration failed.");
  }
};
