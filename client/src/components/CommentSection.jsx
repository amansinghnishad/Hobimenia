import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

const CommentSection = ({ postId }) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments", err);
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
        `/comments/${postId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/comments/${postId}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments(); // Refresh
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author.username}</strong>: {comment.text}
            {comment.author._id === user._id && (
              <button onClick={() => handleDelete(comment._id)}>🗑️</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
