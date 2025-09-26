import React from "react";
import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";

const DevelopmentBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-10"
    >
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <FaCog className="animate-spin text-blue-500" />
            <p className="text-gray-600 font-medium">
              🚧 Some features are under development - Stay tuned! 🚧
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DevelopmentBanner;
