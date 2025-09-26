import React from "react";
import { motion } from "framer-motion";
import { FaPalette, FaCamera } from "react-icons/fa";

const HeroIllustration = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-4 border-t-4 border-purple-500 rounded-tr-lg"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-4 border-b-4 border-green-500 rounded-bl-lg"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-4 border-b-4 border-pink-500 rounded-br-lg"></div>

        <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 p-1">
          <video
            className="w-full h-auto rounded-xl"
            src="/assets/hero-illustration.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
        </div>

        {/* Floating Hobby Badges */}
        <motion.div
          className="absolute -top-8 -right-8 bg-white rounded-full p-3 shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaPalette className="text-pink-500 text-xl" />
        </motion.div>
        <motion.div
          className="absolute -bottom-6 -left-6 bg-white rounded-full p-3 shadow-lg"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        >
          <FaCamera className="text-blue-500 text-xl" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroIllustration;
