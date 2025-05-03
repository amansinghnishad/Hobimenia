import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "./PostCard";
import Loader from "./Loader";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts"); // Backend should return all visible posts
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  if (loading) return <Loader />;

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No posts yet. Start by creating your first one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDeleted={handlePostDeleted} />
      ))}
    </div>
  );
};

export default PostFeed;
