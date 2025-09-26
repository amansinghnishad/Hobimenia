import React from "react";
import { motion } from "framer-motion";

const PostContent = ({ caption, imageUrl }) => {
  return (
    <>
      {caption && (
        <div className="px-6 py-4">
          <p className="text-gray-800 leading-relaxed">{caption}</p>
        </div>
      )}
      {imageUrl && (
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={imageUrl}
            alt="Post"
            className="w-full h-auto max-h-[600px] object-contain bg-gray-50"
          />
        </motion.div>
      )}
    </>
  );
};

export default PostContent;
