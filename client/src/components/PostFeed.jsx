import { useEffect, useState } from "react";
import api from "../api/axios";
import PostCard from "./PostCard";
import Loader from "./Loader";
import "../css/componentCSS/PostFeed.css";

const CATEGORIES = [
  "All",
  "Tech",
  "Photography",
  "Designing",
  "Drawing",
  "Music",
  "Writing",
  "Gaming",
  "Travel",
  "Food",
  "Lifestyle",
  "Other",
];

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchPosts = async (category) => {
    setLoading(true);
    try {
      let url = "/posts";
      if (category && category !== "All") {
        url += `?category=${encodeURIComponent(category)}`;
      }
      const res = await api.get(url);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  const handlePostDeleted = (deletedPostId) => {
    setDeletingPostId(deletedPostId);
    setTimeout(() => {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== deletedPostId)
      );
      setDeletingPostId(null);
    }, 700);
  };

  return (
    <div className="post-feed-container">
      {/* Category Filter Dropdown */}
      <div className="post-feed-category-filter">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="post-feed-category-select"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : posts.length === 0 ? (
        <div className="post-feed-empty">
          No posts yet. Be the first to share something!
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDeleted={handlePostDeleted}
            isDeleting={deletingPostId === post._id}
          />
        ))
      )}
    </div>
  );
};

export default PostFeed;
