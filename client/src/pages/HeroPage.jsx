import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ArtisticBackground from "../components/HeroPage/ArtisticBackground";
import DevelopmentBanner from "../components/HeroPage/DevelopmentBanner";
import HeroContent from "../components/HeroPage/HeroContent";
import HeroIllustration from "../components/HeroPage/HeroIllustration";
import FeaturesSection from "../components/HeroPage/FeaturesSection";

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ArtisticBackground mousePosition={mousePosition} />
      <DevelopmentBanner />

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <HeroContent />
            <HeroIllustration />
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

      <FeaturesSection />
    </div>
  );
};

export default HeroPage;
