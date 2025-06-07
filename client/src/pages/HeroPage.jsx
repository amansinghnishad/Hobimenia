import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaLightbulb,
  FaBook,
  FaHandshake,
  FaPlay,
  FaArrowRight,
  FaStar,
  FaPalette,
  FaCamera,
  FaGamepad,
  FaGuitar,
  FaCoffee,
  FaCode,
  FaRunning,
  FaPlane,
  FaHeart,
  FaGem,
} from "react-icons/fa";
import { Button, Card } from "../components/ui";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";

const HeroPage = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const hobbyIcons = [
    { icon: FaPalette, color: "text-pink-500", size: "text-4xl", delay: 0 },
    { icon: FaCamera, color: "text-blue-500", size: "text-3xl", delay: 0.2 },
    { icon: FaGamepad, color: "text-green-500", size: "text-5xl", delay: 0.4 },
    { icon: FaGuitar, color: "text-purple-500", size: "text-4xl", delay: 0.6 },
    { icon: FaCoffee, color: "text-amber-500", size: "text-3xl", delay: 0.8 },
    { icon: FaCode, color: "text-indigo-500", size: "text-4xl", delay: 1.0 },
    { icon: FaRunning, color: "text-red-500", size: "text-3xl", delay: 1.2 },
    { icon: FaPlane, color: "text-sky-500", size: "text-4xl", delay: 1.4 },
    { icon: FaBook, color: "text-emerald-500", size: "text-3xl", delay: 1.6 },
    { icon: FaGem, color: "text-violet-500", size: "text-4xl", delay: 1.8 },
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

  const features = [
    {
      title: "Share Your Passion",
      description:
        "Post about your hobbies, projects, and connect with like-minded people. Showcase your journey and inspire others.",
      video: "/assets/sharePassion.mp4",
      poster: "/assets/sharePassion.svg",
      reversed: false,
    },
    {
      title: "Discover New Interests",
      description:
        "Explore trending hobbies and find inspiration from a diverse community. Dive into new activities and broaden your horizons.",
      video: "/assets/discoverInterest.mp4",
      poster: "/assets/InterestsFeature.svg",
      reversed: true,
    },
    {
      title: "Collaborate & Learn",
      description:
        "Join groups, participate in discussions, comment on posts, and learn together with fellow enthusiasts.",
      video: "/assets/collaborationFeature.mp4",
      poster: "/assets/collaboratefeature.svg",
      reversed: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Artistic Background */}
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

      {/* Development Banner */}
      <motion.div
        className="relative z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-4 text-center shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2">
          <FaStar className="text-white animate-pulse" />
          <span className="font-medium">
            🚧 Some features are currently under development! Stay tuned. 🚧
          </span>
          <FaStar className="text-white animate-pulse" />
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
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
                Where{" "}
                <span className="font-semibold text-blue-600">passions</span>{" "}
                meet{" "}
                <span className="font-semibold text-purple-600">community</span>
                . Discover, share, and grow your hobbies with fellow enthusiasts
                from around the world.
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
          </div>
        </div>
      </section>

      {/* Features Header with Artistic Touch */}
      <motion.section
        className="relative z-10 py-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          {/* Decorative Line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Your Creative Universe
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every hobby tells a story. Let Hobimenia be the canvas for yours.
          </p>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  feature.reversed ? "lg:grid-flow-col-dense" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Feature Content */}
                <div className={`${feature.reversed ? "lg:col-start-2" : ""}`}>
                  <Card className="p-8 h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <motion.div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                      <FaHeart className="text-white" />
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                      <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                      <span>Experience the Magic</span>
                    </div>
                  </Card>
                </div>

                {/* Feature Media */}
                <div className={`${feature.reversed ? "lg:col-start-1" : ""}`}>
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <video
                      src={feature.video}
                      className="w-full h-auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={feature.poster}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-white/60 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us & Contact Sections */}
      <div id="about-us-section" className="relative z-10">
        <AboutUs />
      </div>
      <div id="contact-us-section" className="relative z-10">
        <ContactUs />
      </div>
    </div>
  );
};

export default HeroPage;
