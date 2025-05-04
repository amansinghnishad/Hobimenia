import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import CommentSection from "../components/CommentSection";
import Navbar from "../components/Navbar";
import "../css/pagesCSS/PostDetailPage.css";

const PostDetailPage = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
        setLiked(res.data.likes.includes(user?._id));
        setLikesCount(res.data.likes.length);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };
    fetchPost();
  }, [id, user]);

  const handleLike = async () => {
    try {
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
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <div className="postdetail-outer">
        <div className="postdetail-card">
          <div className="postdetail-header">
            {post.author?.profilePic ? (
              <img
                src={post.author.profilePic}
                alt={post.author.username}
                className="postdetail-avatar"
              />
            ) : (
              <div className="postdetail-avatar-fallback">
                {post.author?.username?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <span className="postdetail-username">{post.author?.username}</span>
            <span className="postdetail-date">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="postdetail-caption">{post.caption}</div>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              className="postdetail-img"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "384px",
                objectFit: "contain",
              }}
            />
          )}
          <div className="postdetail-like-row">
            <button
              onClick={handleLike}
              className={`postdetail-like-btn${liked ? " liked" : ""}`}
            >
              {liked ? "❤️" : "🤍"} {likesCount}
            </button>
          </div>
          <div className="postdetail-comment-section">
            <CommentSection postId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
