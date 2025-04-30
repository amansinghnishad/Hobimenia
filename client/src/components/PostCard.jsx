import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const PostCard = ({ post, onDeleted, onUpdated }) => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = async () => {
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
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleted?.(post._id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${post._id}`, { state: { post } });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.author?.username}</h4>
        {user?._id === post.author?._id && (
          <div className="post-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        )}
      </div>
      <p>{post.caption}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="post-image" />
      )}
      <div className="post-footer">
        <button onClick={handleLike}>
          {liked ? "❤️" : "🤍"} {likesCount}
        </button>
        <button onClick={() => navigate(`/posts/${post._id}`)}>Comments</button>
      </div>
    </div>
  );
};

export default PostCard;
