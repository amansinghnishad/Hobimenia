import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import "../css/componentCSS/CommentSection.css";

const CommentSection = ({ postId }) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.post(
        `/comments`,
        { postId: postId, text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="comment-section-container">
      <form onSubmit={handleCommentSubmit} className="comment-section-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-section-input"
        />
        <button type="submit" className="comment-section-submit-btn">
          Post
        </button>
      </form>
      {loading ? (
        <div className="comment-section-loader-wrapper">
          <Loader />
        </div>
      ) : error ? (
        <div className="comment-section-error">{error}</div>
      ) : (
        <ul className="comment-section-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-section-list-item">
              <span className="comment-section-list-item-content">
                <span className="comment-section-list-item-username">
                  {comment.author.username}
                </span>
                <span className="comment-section-list-item-text">
                  : {comment.text}
                </span>
              </span>
              {comment.author._id === user._id && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="comment-section-delete-btn"
                  title="Delete"
                >
                  🗑️
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
