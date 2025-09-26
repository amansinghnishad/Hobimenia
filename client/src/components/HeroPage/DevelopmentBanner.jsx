import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const DevelopmentBanner = () => {
  return (
    <motion.div
      className="relative z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-4 text-center shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2">
        <FaStar className="text-white animate-pulse" />
        <span className="font-medium">
          🚧 Some features are currently under development! Stay tuned. 🚧
        </span>
        <FaStar className="text-white animate-pulse" />
      </div>
    </motion.div>
  );
};

export default DevelopmentBanner;
