import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import CommentSection from "../components/CommentSection";
import { Card } from "../components/ui";
import { toast } from "react-toastify";
import PostDetailLoader from "../components/PostDetailPage/PostDetailLoader";
import BackButton from "../components/PostDetailPage/BackButton";
import PostHeader from "../components/PostDetailPage/PostHeader";
import PostContent from "../components/PostDetailPage/PostContent";
import PostActions from "../components/PostDetailPage/PostActions";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post", err);
        toast.error("Failed to load post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return <PostDetailLoader />;
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <BackButton />

          <Card className="overflow-hidden">
            <PostHeader
              author={post.author}
              createdAt={post.createdAt}
              category={post.category}
            />
            <PostContent caption={post.caption} imageUrl={post.imageUrl} />
            <PostActions
              postId={id}
              initialLiked={post.likes.includes(user?._id)}
              initialLikesCount={post.likes.length}
            />
          </Card>

          <Card className="p-6">
            <CommentSection postId={id} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetailPage;
