import React from "react";
import PostCard from "../PostCard";
import Loader from "../Loader";
import "../../css/componentCSS/profile/ProfilePostsGrid.css";

const ProfilePostsGrid = ({ username, posts, loadingPosts, onPostDeleted }) => {
  return (
    <div className="profilepage-posts-section">
      <h3 className="profilepage-section-title">Posts</h3>
      {loadingPosts ? (
        <div className="profilepage-loader-container">
          <Loader />
        </div>
      ) : posts.length > 0 ? (
        <div className="profilepage-posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDeleted={onPostDeleted} />
          ))}
        </div>
      ) : (
        <p className="profilepage-noposts">
          @{username} hasn't shared any posts yet.
        </p>
      )}
    </div>
  );
};

export default ProfilePostsGrid;
