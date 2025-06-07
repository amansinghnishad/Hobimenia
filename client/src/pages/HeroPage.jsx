import React, { useEffect } from "react";
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
} from "react-icons/fa";
import { Button, Card } from "../components/ui";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";

const HeroPage = () => {
  const location = useLocation();

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

  const benefits = [
    {
      icon: FaUsers,
      text: "Connect with Peers",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Development Banner */}
      <motion.div
        className="bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-4 text-center shadow-lg"
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
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hobimenia
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The place to{" "}
                <span className="font-semibold text-blue-600">connect</span>,{" "}
                <span className="font-semibold text-purple-600">share</span>,
                and{" "}
                <span className="font-semibold text-green-600">discover</span>{" "}
                hobbies with a vibrant community.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/signup">
                    Get Started
                    <FaArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                >
                  <Link to="/login">Log In</Link>
                </Button>
              </motion.div>

              {/* Benefits Grid */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center`}
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

            {/* Hero Media */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-2">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Header */}
      <motion.section
        className="py-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Hobimenia's Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how our platform helps you connect, share, and grow your
            hobbies.
          </p>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16">
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
                  <Card className="p-8 h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group cursor-pointer">
                      <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                      <span>Watch Demo</span>
                    </div>
                  </Card>
                </div>

                {/* Feature Media */}
                <div className={`${feature.reversed ? "lg:col-start-1" : ""}`}>
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
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
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us & Contact Sections */}
      <div id="about-us-section">
        <AboutUs />
      </div>
      <div id="contact-us-section">
        <ContactUs />
      </div>
    </div>
  );
};

export default HeroPage;
