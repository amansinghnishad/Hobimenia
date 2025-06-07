import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaPen } from "react-icons/fa";

const CreatePostButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-30 w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group backdrop-blur-sm border border-white/20"
      onClick={() => navigate("/create-post")}
      title="Create new post"
      aria-label="Create new post"
    >
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="flex items-center justify-center"
      >
        <FaPlus className="text-xl" />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-gray-900/90 backdrop-blur-sm text-white text-sm px-4 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap font-medium">
        Create Post
        <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900/90 border-y-4 border-y-transparent"></div>
      </div>

      {/* Floating ring animation */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-400/30 animate-pulse"></div>
    </motion.button>
  );
};

export default CreatePostButton;
