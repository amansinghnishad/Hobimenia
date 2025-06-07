import React, { useContext, useState, memo, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import ReactMarkdown from "react-markdown";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaEdit,
  FaTrash,
  FaEllipsisH,
} from "react-icons/fa";
import { Card, Avatar, Button } from "./ui";
import { toast } from "react-toastify";

const PostCard = memo(({ post, onDeleted, onUpdated }) => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentsCount, setCommentsCount] = useState(post.comments?.length || 0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Memoize computed values
  const isOwnPost = useMemo(
    () => user?._id === post.author?._id,
    [user?._id, post.author?._id]
  );  const formattedDate = useMemo(
    () => new Date(post.createdAt).toLocaleDateString(),
    [post.createdAt]
  );

  // Update comment count when post changes
  useEffect(() => {
    setCommentsCount(post.comments?.length || 0);
  }, [post.comments]);

  const handleLike = useCallback(async () => {
    try {
      const res = await api.put(
        `/posts/${post._id}/like`,
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
    }
  }, [post._id, token]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setIsDeleting(true);
    try {
      await api.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post deleted successfully");
      onDeleted?.(post._id);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  }, [post._id, token, onDeleted]);

  const handleEdit = useCallback(() => {
    navigate(`/edit-post/${post._id}`, { state: { post } });
  }, [navigate, post]);

  const handleProfileClick = useCallback(() => {
    navigate(`/profile/${post.author?._id}`);
  }, [navigate, post.author?._id]);

  const handleViewComments = useCallback(() => {
    navigate(`/post/${post._id}`);
  }, [navigate, post._id]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDeleting ? 0 : 1,
        y: isDeleting ? -20 : 0,
        scale: isDeleting ? 0.95 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-md transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <Avatar
              src={post.author?.profilePic}
              fallback={post.author?.username?.[0]?.toUpperCase() || "?"}
              size="md"
              onClick={handleProfileClick}
              className="cursor-pointer ring-2 ring-white shadow-sm"
            />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.author?._id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {post.author?.username}
              </Link>
              {post.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100/80 text-gray-700 mt-1">
                  {post.category}
                </span>
              )}
            </div>
          </div>

          {isOwnPost && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-full"
                title="Edit post"
              >
                <FaEdit size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50/50 rounded-full"
                title="Delete post"
                loading={isDeleting}
              >
                <FaTrash size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-4">
          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
            <ReactMarkdown>{post.caption}</ReactMarkdown>
          </div>
        </div>

        {/* Image */}
        {post.imageUrl && (
          <motion.div
            className="relative overflow-hidden mx-6 rounded-2xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between p-6 pt-4">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-200 ${
                liked
                  ? "text-red-500 hover:text-red-600 bg-red-50/50"
                  : "text-gray-500 hover:text-red-500 hover:bg-red-50/30"
              }`}
              title={liked ? "Unlike" : "Like"}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {liked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
              </motion.div>
              <span className="font-medium text-sm">{likesCount}</span>
            </Button>            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewComments}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50/30 p-2 rounded-full transition-all duration-200"
              title="View comments"
            >
              <FaRegCommentDots size={18} />
              <span className="text-sm font-medium">{commentsCount}</span>
            </Button>
          </div>

          <div className="text-xs text-gray-400 font-medium">
            {formattedDate}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Add display name for debugging
PostCard.displayName = "PostCard";

export default PostCard;
