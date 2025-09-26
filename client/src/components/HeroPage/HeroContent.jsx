import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaHeart,
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
  FaUsers,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";
import { Button } from "../ui";

const hobbyIcons = [
  { icon: FaPalette, color: "text-pink-500", delay: 0 },
  { icon: FaCamera, color: "text-blue-500", delay: 0.2 },
  { icon: FaGamepad, color: "text-green-500", delay: 0.4 },
  { icon: FaGuitar, color: "text-purple-500", delay: 0.6 },
  { icon: FaCoffee, color: "text-amber-500", delay: 0.8 },
  { icon: FaCode, color: "text-indigo-500", delay: 1.0 },
  { icon: FaRunning, color: "text-red-500", delay: 1.2 },
  { icon: FaPlane, color: "text-sky-500", delay: 1.4 },
  { icon: FaBook, color: "text-emerald-500", delay: 1.6 },
  { icon: FaGem, color: "text-violet-500", delay: 1.8 },
];

const benefits = [
  {
    icon: FaUsers,
    text: "Connect with Hobbyists",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: FaLightbulb,
    text: "Share Your Creations",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: FaBook,
    text: "Learn New Skills",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: FaHandshake,
    text: "Collaborate on Projects",
    color: "from-orange-500 to-red-600",
  },
];

const HeroContent = () => {
  return (
    <motion.div
      className="text-center lg:text-left"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hobby Icons Circle */}
      <motion.div
        className="relative mb-8 lg:mb-12"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="relative w-32 h-32 mx-auto lg:mx-0">
          {hobbyIcons.slice(0, 8).map((hobby, index) => {
            const angle = index * 45 - 90;
            const radius = 60;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: hobby.delay,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.3, rotate: 360 }}
              >
                <div
                  className={`w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center ${hobby.color}`}
                >
                  <hobby.icon className="text-lg" />
                </div>
              </motion.div>
            );
          })}

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-xl">
              <FaHeart className="text-white text-xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Welcome to{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Hobimenia
          </span>
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </span>
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Where <span className="font-semibold text-blue-600">passions</span> meet{" "}
        <span className="font-semibold text-purple-600">community</span>.
        Discover, share, and grow your hobbies with fellow enthusiasts from
        around the world.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Button
          asChild
          size="lg"
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <Link to="/signup">
            <span className="relative z-10">Start Your Journey</span>
            <FaArrowRight className="ml-2 w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            {/* Button Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
        >
          <Link to="/login">Explore Now</Link>
        </Button>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}
            >
              <benefit.icon className="text-white text-sm" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {benefit.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
