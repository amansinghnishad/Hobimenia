import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "../css/pagesCSS/ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, token, login: loginContext } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleImageClick = () => {
    if (user?._id === profile?._id && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (user?._id !== profile._id) return;
    const formData = new FormData();
    formData.append("profilePic", file);
    setIsUploading(true);
    try {
      const res = await api.patch("/users/profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      if (user._id === res.data._id) {
        loginContext(res.data, token);
      }
      toast.success("Profile picture updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
      <div className="profilepage-outer">
        <div className="profilepage-card">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            disabled={isUploading || user?._id !== profile._id}
          />
          <div
            className={`profilepage-avatar-wrapper${
              user?._id === profile?._id ? " editable" : ""
            }`}
            onClick={handleImageClick}
          >
            <img
              src={profile.profilePic || "/assets/default-avatar.png"}
              alt="avatar"
              className={`profilepage-avatar${isUploading ? " uploading" : ""}`}
            />
            {user?._id === profile._id && !isUploading && (
              <div className="profilepage-avatar-overlay">
                <span className="profilepage-avatar-editicon">✏️</span>
              </div>
            )}
            {isUploading && (
              <div className="profilepage-avatar-loader">
                <Loader />
              </div>
            )}
          </div>
          <h2 className="profilepage-username">@{profile.username}</h2>
          <p className="profilepage-email">{profile.email}</p>
          {user?._id === profile._id && (
            <button className="profilepage-edit-btn">Edit Profile</button>
          )}
        </div>
        <div>
          <h3 className="profilepage-section-title">
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
            <p className="profilepage-noposts">No posts yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
