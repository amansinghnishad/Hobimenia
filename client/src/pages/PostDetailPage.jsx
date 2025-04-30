import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import CommentSection from "../components/CommentSection";

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
    <div className="post-detail">
      <h3>{post.author?.username}'s Post</h3>
      <p>{post.caption}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      <div>
        <button onClick={handleLike}>
          {liked ? "❤️" : "🤍"} {likesCount}
        </button>
      </div>

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetailPage;
