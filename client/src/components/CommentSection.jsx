import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { Card, Avatar, Button, Input, Loader } from "./ui";
import { FaTrash, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const CommentSection = ({ postId }) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch comments from API
  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      setError("Failed to load comments");
      setComments([]);
      console.error("Failed to load comments", err);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Submit new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await api.post(
        `/comments`,
        { postId: postId, text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
      toast.success("Comment posted!");
    } catch (err) {
      console.error("Failed to post comment", err);
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
      toast.success("Comment deleted");
    } catch (err) {
      console.error("Failed to delete comment", err);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="space-y-4">
      {/* Comment Form */}
      <Card className="p-4">
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <div className="flex items-start space-x-3">
            <Avatar
              src={user?.profilePic}
              fallback={user?.username?.[0]?.toUpperCase()}
              size="sm"
              className="flex-shrink-0 mt-1"
            />
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full"
                disabled={submitting}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!newComment.trim() || submitting}
              loading={submitting}
              className="flex items-center space-x-2"
            >
              <FaPaperPlane size={14} />
              <span>Post</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Comments List */}
      {loading ? (
        <Card className="p-4">
          <Loader variant="spinner" />
        </Card>
      ) : error ? (
        <Card className="p-4">
          <div className="text-center text-red-600 text-sm">{error}</div>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start space-x-3">
                    <Avatar
                      src={comment.author?.profilePic}
                      fallback={comment.author?.username?.[0]?.toUpperCase()}
                      size="sm"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {comment.author?.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                    {comment.author?._id === user?._id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment._id)}
                        className="p-2 text-gray-400 hover:text-red-500 flex-shrink-0"
                        title="Delete comment"
                      >
                        <FaTrash size={14} />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {comments.length === 0 && (
            <Card className="p-8">
              <div className="text-center text-gray-500">
                <p className="text-sm">No comments yet.</p>
                <p className="text-xs mt-1">Be the first to comment!</p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
