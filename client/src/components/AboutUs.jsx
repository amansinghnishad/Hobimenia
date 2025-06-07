import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaHeart, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: FaUsers,
      title: "Community First",
      description: "Connect with like-minded creators and share your passion",
    },
    {
      icon: FaLightbulb,
      title: "Learn & Grow",
      description: "Discover new skills and expand your creative horizons",
    },
    {
      icon: FaHeart,
      title: "Share Your Story",
      description: "Express yourself through your hobbies and inspire others",
    },
    {
      icon: FaRocket,
      title: "Innovation Hub",
      description: "Push boundaries and explore the latest in hobby technology",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-20"
          src="/assets/AboutMe.mp4"
          loop
          muted
          playsInline
          autoPlay
          poster="/assets/about-poster.png"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              About Hobimenia
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8" />
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Hobimenia is built for hobbyists, makers, and lifelong learners.
              Our mission is to foster a welcoming space for everyone to share,
              learn, and grow together.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Join Our Creative Community
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Whether you're a seasoned maker or just starting your creative
                journey, Hobimenia provides the tools and community to help you
                thrive.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
