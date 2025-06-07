import React from "react";
import { motion } from "framer-motion";
import PostFeed from "../components/PostFeed";
import CreatePostButton from "../components/CreatePostButton";
import { Card } from "../components/ui";
import { FaCog, FaHome, FaHeart } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Development Banner */}
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

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Post Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <PostFeed />
        </motion.div>
      </div>

      {/* Floating Create Post Button */}
      <CreatePostButton />
    </div>
  );
};

export default HomePage;
