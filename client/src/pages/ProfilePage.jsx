import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "../css/pagesCSS/ProfilePage.css";

import ProfileCoverPhoto from "../components/profile/ProfileCoverPhoto";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileBioInterests from "../components/profile/ProfileBioInterests";
import ProfilePostsGrid from "../components/profile/ProfilePostsGrid";

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
    // Optionally, update profile.postsCount if it's being strictly managed
    if (profile && profile.postsCount !== undefined) {
      setProfile((prev) => ({
        ...prev,
        postsCount: Math.max(0, prev.postsCount - 1),
      }));
    }
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
      // The response from PUT /users/profile should be the complete updated user object
      setProfile(res.data);

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
      // The backend should return the updated target user's profile data
      const res = isFollowing
        ? await api.delete(`/users/${profile._id}/unfollow`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await api.post(
            `/users/${profile._id}/follow`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

      // Update profile state with the data returned from the backend
      setProfile(res.data.targetUser);
      setIsFollowing(!isFollowing);

      toast.success(
        `${isFollowing ? "Unfollowed" : "Followed"} @${
          res.data.targetUser.username
        }`
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          `Failed to ${action} @${profile.username}.`
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
        <ProfileCoverPhoto
          profile={profile}
          currentUser={user}
          isUploadingCoverPhoto={isUploadingCoverPhoto}
          onCoverPhotoClick={handleCoverPhotoClick}
          coverPhotoInputRef={coverPhotoInputRef}
          onCoverPhotoChange={handleCoverPhotoChange}
        />

        <div className="profilepage-main-content">
          <ProfileHeader
            profile={profile}
            currentUser={user}
            isUploadingProfilePic={isUploadingProfilePic}
            onProfilePicClick={handleProfilePicClick}
            profilePicInputRef={profilePicInputRef}
            onProfilePicChange={handleProfilePicChange}
            isEditingProfile={isEditingProfile}
            onEditProfile={handleEditProfile}
            isFollowing={isFollowing}
            onFollowToggle={handleFollowToggle}
            followLoading={followLoading}
          />

          <ProfileStats profile={profile} postsCountFromParent={posts.length} />

          <ProfileBioInterests
            profile={profile}
            currentUser={user}
            isEditingProfile={isEditingProfile}
            tempBio={tempBio}
            setTempBio={setTempBio}
            tempInterests={tempInterests}
            setTempInterests={setTempInterests}
            onSaveProfile={handleSaveProfile}
            onCancelEdit={handleCancelEdit}
            onEditProfile={handleEditProfile}
          />
        </div>

        <ProfilePostsGrid
          username={profile.username}
          posts={posts}
          loadingPosts={loadingPosts}
          onPostDeleted={handlePostDeleted}
        />
      </div>
    </>
  );
};

export default ProfilePage;
