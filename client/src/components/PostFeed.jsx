import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import PostCard from "./PostCard";
import { Loader, Card, Button } from "./ui";
import { FaFilter, FaSearch, FaRedo } from "react-icons/fa";
import { toast } from "react-toastify";

const CATEGORIES = [
  "All",
  "Tech",
  "Photography",
  "Designing",
  "Drawing",
  "Music",
  "Writing",
  "Gaming",
  "Travel",
  "Food",
  "Lifestyle",
  "Other",
];

const PostFeed = memo(() => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch posts from API
  const fetchPosts = useCallback(async (category, showRefreshing = false) => {
    if (showRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      let url = "/posts";
      if (category && category !== "All") {
        url += `?category=${encodeURIComponent(category)}`;
      }
      const res = await api.get(url);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);
  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory, fetchPosts]);

  // Handle post deletion with animation
  const handlePostDeleted = useCallback((deletedPostId) => {
    setDeletingPostId(deletedPostId);
    setTimeout(() => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== deletedPostId)
      );
      setDeletingPostId(null);
    }, 700);
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    fetchPosts(selectedCategory, true);
  }, [fetchPosts, selectedCategory]);

  // Handle category change
  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  // Memoize posts display text
  const postsCountText = useMemo(() => {
    return `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;
  }, [posts.length]);
  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FaFilter className="text-white text-sm" />
            </div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm font-medium min-w-[120px]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="text-sm font-medium text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full">
              {postsCountText}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            loading={refreshing}
            className="flex items-center space-x-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl px-4 py-2.5 font-medium"
          >
            <FaRedo className={refreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden animate-pulse"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-2xl mx-6"></div>
                <div className="flex items-center justify-between pt-6">
                  <div className="flex space-x-6">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100/50 p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              No posts found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
              {selectedCategory === "All"
                ? "Be the first to share something amazing with the community!"
                : `No posts in ${selectedCategory} category yet. Try exploring other categories or be the first to post!`}
            </p>
            {selectedCategory !== "All" && (
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory("All")}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl px-6 py-3 font-medium"
              >
                View all posts
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard
                  post={post}
                  onDeleted={handlePostDeleted}
                  isDeleting={deletingPostId === post._id}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
});

// Add display name for debugging
PostFeed.displayName = "PostFeed";

export default PostFeed;
