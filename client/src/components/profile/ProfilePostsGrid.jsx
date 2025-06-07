import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaImages, FaPlus } from "react-icons/fa";
import PostCard from "../PostCard";
import { Loader, Card } from "../ui";

const ProfilePostsGrid = ({ username, posts, loadingPosts, onPostDeleted }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);return (
    <motion.div
      className="space-y-4 sm:space-y-6 mx-2 sm:mx-4 lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 lg:px-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
          <FaImages className="text-white text-base sm:text-lg" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Posts
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>
      {/* Content */}{" "}      {loadingPosts ? (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
          <div className="flex-1 space-y-1 sm:space-y-2">
            {[...Array(isMobile ? 6 : 3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 p-4 sm:p-6 animate-pulse"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-full h-32 sm:h-48 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg sm:rounded-xl"></div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-3/4"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-1/2"></div>
                    <div className="h-2 sm:h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!isMobile && (
            <div className="flex-1 space-y-1 sm:space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i + 3}
                  className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 p-4 sm:p-6 animate-pulse"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-full h-32 sm:h-48 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg sm:rounded-xl"></div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-1/2"></div>
                      <div className="h-2 sm:h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>) : posts.length > 0 ? (
        <motion.div
          className="flex flex-col sm:flex-row gap-1 sm:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >          {/* Left Column */}
          <div className="flex-1 space-y-1 sm:space-y-2">
            {posts
              .filter((_, index) => isMobile ? true : index % 2 === 0)
              .map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-md sm:hover:shadow-lg hover:border-gray-200/50 transition-all duration-300">
                    <PostCard
                      post={post}
                      onDeleted={onPostDeleted}
                      className="h-full border-0 shadow-none bg-transparent"
                    />
                  </div>
                </motion.div>
              ))}
          </div>          {/* Right Column - Hidden on mobile */}
          {!isMobile && (
            <div className="flex-1 space-y-1 sm:space-y-2">
              {posts
                .filter((_, index) => index % 2 === 1)
                .map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="group"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-md sm:hover:shadow-lg hover:border-gray-200/50 transition-all duration-300">
                      <PostCard
                        post={post}
                        onDeleted={onPostDeleted}
                        className="h-full border-0 shadow-none bg-transparent"
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </motion.div>      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 text-center py-12 sm:py-16">
            <div className="space-y-4 sm:space-y-6 px-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto shadow-inner">
                <FaImages className="text-2xl sm:text-4xl text-gray-400" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                  No posts yet
                </h4>
                <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md mx-auto leading-relaxed">
                  @{username} hasn't shared any posts yet. Check back later to
                  see their creative work!
                </p>
              </div>
              <motion.div
                className="pt-1 sm:pt-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center mx-auto opacity-60 shadow-lg">
                  <FaPlus className="text-white text-lg sm:text-xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfilePostsGrid;
