import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui";
import { FaHeart, FaPlay } from "react-icons/fa";

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

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
