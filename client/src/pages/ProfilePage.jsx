import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await api.get(`/posts/user/${id}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [id]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={profile.profilePic || "/assets/default-avatar.png"}
          alt="avatar"
          className="profile-pic"
        />
        <h2>@{profile.username}</h2>
        {user?._id === id && <button>Edit Profile</button>}
      </div>

      <div className="user-posts">
        <h3>Posts by @{profile.username}</h3>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
