import { v2 as cloudinary } from "cloudinary";

export default cloudinary;

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

  if (cloudinary.config().cloud_name) {
    console.log("✅ Cloudinary configured successfully.");
  } else {
    console.error("❌ Cloudinary configuration failed.");
  }
};
