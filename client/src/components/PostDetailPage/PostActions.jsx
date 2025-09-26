import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Loader } from "../ui";
import { toast } from "react-toastify";

const PostActions = ({ postId, initialLiked, initialLikesCount }) => {
  const { token } = useContext(AuthContext);
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like posts");
      return;
    }

    try {
      setLikeLoading(true);
      const res = await api.put(
        `/posts/${postId}/like`,
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

  return (
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
  );
};

export default PostActions;
