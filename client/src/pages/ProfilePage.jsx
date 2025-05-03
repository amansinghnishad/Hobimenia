import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await api.get(`/users/${id}`);
      setProfile(res.data);
      console.log("Fetching user ID:", id);
    } catch (err) {
      console.error("Failed to load profile", err);
      setProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await api.get(`/posts/user/${id}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [id]);

  if (loadingProfile) return <p>Loading profile...</p>;
  if (!profile) return <p>User not found.</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mb-8">
          <img
            src={profile.profilePic || "/assets/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full mb-3 object-cover border"
          />
          <h2 className="text-2xl font-bold mb-1">@{profile.username}</h2>
          {user?._id === profile._id && (
            <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Profile
            </button>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">
            Posts by @{profile.username}
          </h3>
          {loadingPosts ? (
            <p>Loading posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDeleted={handlePostDeleted}
              />
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
