import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import CommentSection from "../components/CommentSection";
import { Card, Avatar, Button, Loader } from "../components/ui";
import { toast } from "react-toastify";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
        setLiked(res.data.likes.includes(user?._id));
        setLikesCount(res.data.likes.length);
      } catch (err) {
        console.error("Failed to fetch post", err);
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, user, navigate]);

  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like posts");
      return;
    }

    try {
      setLikeLoading(true);
      const res = await api.put(
        `/posts/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.error("Like failed", err);
      toast.error("Failed to like post");
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="hover:bg-white/80 mb-4"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Main Post Card */}
          <Card className="overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={post.author?.profilePic}
                    alt={post.author?.username}
                    size="lg"
                    fallback={post.author?.username?.[0]?.toUpperCase() || "?"}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      @{post.author?.username}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                {/* Category Tag */}
                {post.category && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    <FaTag className="w-3 h-3" />
                    {post.category}
                  </div>
                )}
              </div>
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="px-6 py-4">
                <p className="text-gray-800 leading-relaxed">{post.caption}</p>
              </div>
            )}

            {/* Image */}
            {post.imageUrl && (
              <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-auto max-h-[600px] object-contain bg-gray-50"
                />
              </motion.div>
            )}

            {/* Actions */}
            <div className="p-6 border-t border-gray-100">
              <Button
                onClick={handleLike}
                disabled={likeLoading || !token}
                variant="ghost"
                className={`
                  transition-all duration-200 hover:scale-105
                  ${
                    liked
                      ? "text-red-600 hover:text-red-700"
                      : "text-gray-600 hover:text-red-600"
                  }
                  ${!token ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  {likeLoading ? (
                    <Loader size="sm" />
                  ) : liked ? (
                    <FaHeart className="w-5 h-5" />
                  ) : (
                    <FaRegHeart className="w-5 h-5" />
                  )}
                  <span className="font-medium">{likesCount}</span>
                </motion.div>
              </Button>
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-6">
            <CommentSection postId={id} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetailPage;
