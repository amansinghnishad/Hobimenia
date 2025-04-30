import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import CommentSection from "../components/CommentSection";
import Loader from "../components/Loader";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <Loader />;

  if (!post) return <div className="text-center py-10">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">{post.author.username}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post" className="rounded mb-4" />
        )}
        <p className="text-sm text-gray-600 mb-2">
          Likes: {post.likes?.length || 0}
        </p>

        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

export default PostDetailPage;
