import React, { useContext, useState } from "react";
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
} from "react-icons/fa";
import "../css/componentCSS/PostCard.css";

const PostCard = ({ post, onDeleted, onUpdated }) => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);
    try {
      await api.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleted?.(post._id);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${post._id}`, { state: { post } });
  };

  return (
    <div className={`post-card${isDeleting ? " evaporate-dot" : ""}`}>
      <div className="post-card-header">
        <div className="post-card-userinfo">
          {post.author?.profilePic ? (
            <img
              src={post.author.profilePic}
              alt={post.author.username}
              className="post-card-avatar"
            />
          ) : (
            <div className="post-card-avatar">
              {post.author?.username?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <Link
              to={`/profile/${post.author?._id}`}
              className="post-card-username"
            >
              {post.author?.username}
            </Link>
            {/* Display Category */}
            {post.category && (
              <span className="post-card-category-badge">{post.category}</span>
            )}
          </div>
        </div>
        {user?._id === post.author?._id && (
          <div className="post-card-controls">
            <button
              onClick={handleEdit}
              className="post-card-btn-edit"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="post-card-btn-delete"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <div className="post-card-caption">
        <ReactMarkdown>{post.caption}</ReactMarkdown>
      </div>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="post-card-img"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "384px",
            objectFit: "contain",
          }}
        />
      )}
      <div className="post-card-actions">
        <button
          onClick={handleLike}
          className={`post-card-like-btn${liked ? " liked" : ""}`}
          title={liked ? "Unlike" : "Like"}
        >
          {liked ? <FaHeart color="#e11d48" /> : <FaRegHeart />} {likesCount}
        </button>
        <button
          onClick={() => navigate(`/post/${post._id}`)}
          className="post-card-comment-btn"
          title="Comments"
        >
          comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;
