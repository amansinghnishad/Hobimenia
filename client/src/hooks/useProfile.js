import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

export const useProfile = () => {
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
      setIsFollowing(
        user &&
        profileData.followers &&
        profileData.followers.some((followerId) => followerId === user._id)
      );
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

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [id, user?._id]);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
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
    if (!file || user?._id !== profile._id) return;

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
    if (!file || user?._id !== profile?._id) return;

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

  const handleCancelEdit = () => setIsEditingProfile(false);

  const handleSaveProfile = async () => {
    const interestsArray = tempInterests
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    const payload = { bio: tempBio, interests: interestsArray };
    try {
      const res = await api.put("/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    if (!user) return toast.info("Please login to follow users.");
    if (user._id === profile._id) return toast.info("You cannot follow yourself.");

    setFollowLoading(true);
    const action = isFollowing ? "unfollow" : "follow";
    try {
      const res = isFollowing
        ? await api.delete(`/users/${profile._id}/unfollow`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        : await api.post(
          `/users/${profile._id}/follow`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

      setProfile(res.data.targetUser);
      setIsFollowing(res.data.targetUser.followers.includes(user._id));

      if (res.data.currentUser) {
        loginContext(res.data.currentUser, token);
      }
      toast.success(
        `${action === "follow" ? "Followed" : "Unfollowed"} @${res.data.targetUser.username
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

  return {
    id,
    user,
    profile,
    posts,
    loadingProfile,
    loadingPosts,
    isUploadingProfilePic,
    profilePicInputRef,
    isUploadingCoverPhoto,
    coverPhotoInputRef,
    isEditingProfile,
    tempBio,
    setTempBio,
    tempInterests,
    setTempInterests,
    isFollowing,
    followLoading,
    handlePostDeleted,
    handleProfilePicClick,
    handleProfilePicChange,
    handleCoverPhotoClick,
    handleCoverPhotoChange,
    handleEditProfile,
    handleCancelEdit,
    handleSaveProfile,
    handleFollowToggle,
  };
};
