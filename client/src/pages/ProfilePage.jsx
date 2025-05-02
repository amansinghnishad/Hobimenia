import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      setUser(res.data);
      console.log("Fetching user ID:", userId);
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
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mb-8">
        <img
          src={profile.profilePic || "/assets/default-avatar.png"}
          alt="avatar"
          className="w-24 h-24 rounded-full mb-3 object-cover"
        />
        <h2 className="text-2xl font-bold mb-1">@{profile.username}</h2>
        {user?._id === user._id && (
          <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edit Profile
          </button>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          Posts by @{profile.username}
        </h3>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
