import React from "react";
import { motion } from "framer-motion";
import PostFeed from "../PostFeed";

const MainContent = () => {
  return (
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
  );
};

export default MainContent;
