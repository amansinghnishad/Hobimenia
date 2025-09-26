import React from "react";
import { motion } from "framer-motion";
import {
  FaPalette,
  FaCamera,
  FaGamepad,
  FaGuitar,
  FaCoffee,
  FaCode,
  FaRunning,
  FaPlane,
  FaBook,
  FaGem,
} from "react-icons/fa";

const hobbyIcons = [
  { icon: FaPalette, color: "text-pink-500" },
  { icon: FaCamera, color: "text-blue-500" },
  { icon: FaGamepad, color: "text-green-500" },
  { icon: FaGuitar, color: "text-purple-500" },
  { icon: FaCoffee, color: "text-amber-500" },
  { icon: FaCode, color: "text-indigo-500" },
  { icon: FaRunning, color: "text-red-500" },
  { icon: FaPlane, color: "text-sky-500" },
  { icon: FaBook, color: "text-emerald-500" },
  { icon: FaGem, color: "text-violet-500" },
];

const ArtisticBackground = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      {/* Dynamic Hobby Icons Floating Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => {
          const Icon = hobbyIcons[i % hobbyIcons.length].icon;
          return (
            <motion.div
              key={i}
              className="absolute opacity-5 hover:opacity-20 transition-opacity duration-500"
              style={{
                left: `${(i * 23) % 100}%`,
                top: `${(i * 17) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              <Icon
                className={`text-6xl ${
                  hobbyIcons[i % hobbyIcons.length].color
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Cursor Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/10 to-purple-300/10 blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />

      {/* Artistic Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-green-200/25 to-emerald-200/25 rounded-2xl rotate-12 blur-2xl"></div>
    </div>
  );
};

export default ArtisticBackground;
