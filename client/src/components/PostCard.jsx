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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-lg">{post.author?.username}</h4>
        {user?._id === post.author?._id && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="mb-2">{post.caption}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full rounded-md mb-2 max-h-96 object-cover"
        />
      )}
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-lg"
        >
          {liked ? "❤️" : "🤍"} {likesCount}
        </button>
        <button
          onClick={() => navigate(`/posts/${post._id}`)}
          className="text-blue-500 hover:underline text-sm"
        >
          Comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;
