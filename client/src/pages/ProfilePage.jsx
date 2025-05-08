import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { FaCamera, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "../css/pagesCSS/ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, token, login: loginContext } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [isUploadingProfilePic, setIsUploadingProfilePic] = useState(false);
  const profilePicInputRef = useRef(null);

  const [isUploadingCoverPhoto, setIsUploadingCoverPhoto] = useState(false);
  const coverPhotoInputRef = useRef(null);

  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempBio, setTempBio] = useState("");
  const [tempInterests, setTempInterests] = useState("");

  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await api.get(`/users/${id}`);
      const profileData = res.data;
      setProfile(profileData);
      setBio(profileData.bio || "");
      setInterests(profileData.interests || []);

      if (
        user &&
        profileData.followers &&
        profileData.followers.some((followerId) => followerId === user._id)
      ) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
      toast.error(err.response?.data?.message || "Failed to load profile.");
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

  const handleProfilePicClick = () => {
    if (user?._id === profile?._id && profilePicInputRef.current) {
      profilePicInputRef.current.click();
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (user?._id !== profile._id) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    setIsUploadingProfilePic(true);
    try {
      const res = await api.patch("/users/profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      if (user._id === res.data._id) {
        loginContext({ ...user, profilePic: res.data.profilePic }, token);
      }
      toast.success("Profile picture updated!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Profile picture upload failed"
      );
    } finally {
      setIsUploadingProfilePic(false);
      if (profilePicInputRef.current) profilePicInputRef.current.value = "";
    }
  };

  const handleCoverPhotoClick = () => {
    if (user?._id === profile?._id && coverPhotoInputRef.current) {
      coverPhotoInputRef.current.click();
    }
  };

  const handleCoverPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (user?._id !== profile?._id) return;

    const formData = new FormData();
    formData.append("coverPhoto", file);
    setIsUploadingCoverPhoto(true);
    try {
      const res = await api.patch("/users/cover-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile((prev) => ({ ...prev, coverPhoto: res.data.coverPhoto }));
      if (user._id === res.data._id) {
        loginContext({ ...user, coverPhoto: res.data.coverPhoto }, token);
      }
      toast.success("Cover photo updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cover photo upload failed");
    } finally {
      setIsUploadingCoverPhoto(false);
      if (coverPhotoInputRef.current) coverPhotoInputRef.current.value = "";
    }
  };

  const handleEditProfile = () => {
    setTempBio(profile.bio || "");
    setTempInterests((profile.interests || []).join(", "));
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    const interestsArray = tempInterests
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");
    const payload = {
      bio: tempBio,
      interests: interestsArray,
    };
    try {
      const res = await api.put("/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile((prev) => ({ ...prev, ...res.data }));
      setBio(res.data.bio);
      setInterests(res.data.interests);

      if (user._id === res.data._id) {
        loginContext(
          { ...user, bio: res.data.bio, interests: res.data.interests },
          token
        );
      }
      setIsEditingProfile(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const handleFollowToggle = async () => {
    if (!user) {
      toast.info("Please login to follow users.");
      return;
    }
    if (user._id === profile._id) {
      toast.info("You cannot follow yourself.");
      return;
    }

    setFollowLoading(true);
    const action = isFollowing ? "unfollow" : "follow";
    try {
      if (isFollowing) {
        await api.delete(`/users/${profile._id}/unfollow`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile((prev) => ({
          ...prev,
          followersCount: Math.max(0, (prev.followersCount || 0) - 1),
          followers: prev.followers
            ? prev.followers.filter((fId) => fId !== user._id)
            : [],
        }));
        setIsFollowing(false);
        toast.success(`Unfollowed @${profile.username}`);
      } else {
        await api.post(
          `/users/${profile._id}/follow`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile((prev) => ({
          ...prev,
          followersCount: (prev.followersCount || 0) + 1,
          followers: prev.followers
            ? [...prev.followers, user._id]
            : [user._id],
        }));
        setIsFollowing(true);
        toast.success(`Followed @${profile.username}`);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || `Failed to ${action} @${profile.username}.`
      );
    } finally {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [id, user?._id]);

  if (loadingProfile) {
    return (
      <div className="page-loader-container">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profilepage-outer">
        <p className="profilepage-not-found">User not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="profilepage-outer">
        <div className="profilepage-cover-photo-container">
          <img
            src={profile.coverPhoto || "/assets/default-cover.jpg"}
            alt="Cover"
            className="profilepage-cover-photo"
          />
          {user?._id === profile._id && (
            <button
              className="profilepage-cover-edit-btn"
              onClick={handleCoverPhotoClick}
              disabled={isUploadingCoverPhoto}
              title="Change cover photo"
            >
              {isUploadingCoverPhoto ? <Loader size="small" /> : <FaCamera />}
              <span className="profilepage-cover-edit-btn-text">
                Change Cover
              </span>
            </button>
          )}
          <input
            type="file"
            ref={coverPhotoInputRef}
            onChange={handleCoverPhotoChange}
            accept="image/*"
            style={{ display: "none" }}
            disabled={isUploadingCoverPhoto}
          />
        </div>

        <div className="profilepage-main-content">
          <div className="profilepage-header-section">
            <div
              className={`profilepage-avatar-wrapper${
                user?._id === profile._id ? " editable" : ""
              }`}
              onClick={handleProfilePicClick}
              title={user?._id === profile._id ? "Change profile picture" : ""}
            >
              <img
                src={profile.profilePic || "/assets/default-avatar.png"}
                alt={`${profile.username}'s avatar`}
                className={`profilepage-avatar${
                  isUploadingProfilePic ? " uploading" : ""
                }`}
              />
              {user?._id === profile._id && !isUploadingProfilePic && (
                <div className="profilepage-avatar-overlay">
                  <FaCamera className="profilepage-avatar-editicon" />
                </div>
              )}
              {isUploadingProfilePic && (
                <div className="profilepage-avatar-loader">
                  <Loader size="medium" />
                </div>
              )}
            </div>
            <input
              type="file"
              ref={profilePicInputRef}
              onChange={handleProfilePicChange}
              accept="image/*"
              style={{ display: "none" }}
              disabled={isUploadingProfilePic || user?._id !== profile._id}
            />

            <div className="profilepage-user-details">
              <h2 className="profilepage-username">@{profile.username}</h2>
            </div>

            <div className="profilepage-actions">
              {user?._id === profile._id ? (
                !isEditingProfile && (
                  <button
                    onClick={handleEditProfile}
                    className="profilepage-action-btn edit-profile-btn"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                )
              ) : (
                <button
                  onClick={handleFollowToggle}
                  className={`profilepage-action-btn follow-btn ${
                    isFollowing ? "following" : ""
                  }`}
                  disabled={followLoading || !user}
                  title={
                    !user
                      ? "Login to follow"
                      : isFollowing
                      ? `Unfollow @${profile.username}`
                      : `Follow @${profile.username}`
                  }
                >
                  {followLoading ? (
                    <Loader size="small" />
                  ) : isFollowing ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="profilepage-stats">
            <div className="profilepage-stat-item">
              <strong>
                {profile.postsCount !== undefined
                  ? profile.postsCount
                  : posts.length}
              </strong>{" "}
              Posts
            </div>
            <div className="profilepage-stat-item">
              <strong>{profile.followersCount || 0}</strong> Followers
            </div>
            <div className="profilepage-stat-item">
              <strong>{profile.followingCount || 0}</strong> Following
            </div>
          </div>

          {isEditingProfile && user?._id === profile?._id ? (
            <div className="profilepage-edit-form">
              <div className="profilepage-form-group">
                <label htmlFor="bio">Bio (Max 250 characters)</label>
                <textarea
                  id="bio"
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  maxLength={250}
                  rows={3}
                />
              </div>
              <div className="profilepage-form-group">
                <label htmlFor="interests">Interests (comma-separated)</label>
                <input
                  type="text"
                  id="interests"
                  value={tempInterests}
                  onChange={(e) => setTempInterests(e.target.value)}
                  placeholder="e.g., Photography, Gaming, Tech"
                />
              </div>
              <div className="profilepage-edit-actions">
                <button
                  onClick={handleSaveProfile}
                  className="profilepage-action-btn save-btn"
                >
                  <FaSave /> Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="profilepage-action-btn cancel-btn"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profilepage-bio-interests">
              {profile.bio && (
                <p className="profilepage-bio">{profile.bio}</p>
              )}
              {!profile.bio && user?._id !== profile?._id && (
                <p className="profilepage-bio-empty">No bio yet.</p>
              )}
              {!profile.bio && user?._id === profile?._id && (
                <p className="profilepage-bio-empty">
                  No bio yet.{" "}
                  <button
                    onClick={handleEditProfile}
                    className="link-style"
                  >
                    Add bio
                  </button>
                </p>
              )}

              {profile.interests && profile.interests.length > 0 && (
                <div className="profilepage-interests">
                  <strong>Interests:</strong>
                  <div className="profilepage-interests-tags">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="profilepage-interest-tag"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(!profile.interests || profile.interests.length === 0) &&
                user?._id === profile?._id && (
                  <p className="profilepage-interests-empty">
                    No interests listed.{" "}
                    <button
                      onClick={handleEditProfile}
                      className="link-style"
                    >
                      Add interests
                    </button>
                  </p>
                )}
            </div>
          )}
        </div>

        <div className="profilepage-posts-section">
          <h3 className="profilepage-section-title">Posts</h3>
          {loadingPosts ? (
            <div className="profilepage-loader-container">
              <Loader />
            </div>
          ) : posts.length > 0 ? (
            <div className="profilepage-posts-grid">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDeleted={handlePostDeleted}
                />
              ))}
            </div>
          ) : (
            <p className="profilepage-noposts">
              @{profile.username} hasn't shared any posts yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
