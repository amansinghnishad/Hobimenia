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
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaHome className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Welcome to Hobimenia
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium max-w-md mx-auto">
            Discover amazing content from our creative community
          </p>
        </motion.div>

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
