import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "./PostCard";
import Loader from "./Loader";
import "../css/componentCSS/PostFeed.css";

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

  return (
    <div className="post-feed-container">
      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <div className="post-feed-empty">
          No posts yet. Be the first to share something!
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} onDeleted={handlePostDeleted} />
        ))
      )}
    </div>
  );
};

export default PostFeed;
