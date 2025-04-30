import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/axios";
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";

const PostCard = ({ post, onDeleted }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes || []);
  const [deleting, setDeleting] = useState(false);

  const isLiked = likes.includes(user?._id);
  const isAuthor = user?._id === post.author._id;

  const toggleLike = async () => {
    try {
      const res = await api.put(`/posts/${post._id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      setDeleting(true);
      await api.delete(`/posts/${post._id}`);
      onDeleted?.(post._id);
    } catch (err) {
      console.error("Failed to delete post", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => navigate(`/edit-post/${post._id}`);
  const openDetail = () => navigate(`/post/${post._id}`);

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{post.author.username}</h3>
        {isAuthor && (
          <div className="flex gap-3 text-sm text-gray-500">
            <FaEdit className="cursor-pointer" onClick={handleEdit} />
            <FaTrash className="cursor-pointer" onClick={handleDelete} />
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div onClick={openDetail} className="cursor-pointer my-3">
        <p>{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="post" className="rounded mt-2" />
        )}
      </div>

      <div className="flex items-center gap-2 text-red-500 mt-2">
        {isLiked ? (
          <FaHeart onClick={toggleLike} className="cursor-pointer" />
        ) : (
          <FaRegHeart onClick={toggleLike} className="cursor-pointer" />
        )}
        <span>{likes.length}</span>
      </div>
    </div>
  );
};

export default PostCard;
