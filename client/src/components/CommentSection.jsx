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
    <div className="mt-6">
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>

      <ul className="space-y-2">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="bg-gray-100 rounded px-3 py-2 flex items-center justify-between"
          >
            <span>
              <strong className="text-blue-700">
                {comment.author.username}
              </strong>
              : {comment.text}
            </span>
            {comment.author._id === user._id && (
              <button
                onClick={() => handleDelete(comment._id)}
                className="ml-2 text-red-500 hover:underline text-sm"
                title="Delete"
              >
                🗑️
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
