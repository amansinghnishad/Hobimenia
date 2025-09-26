import React from "react";
import { motion } from "framer-motion";
import { useProfile } from "../hooks/useProfile";
import ProfileCoverPhoto from "../components/profile/ProfileCoverPhoto";
import ProfileDesktopLayout from "../components/profile/ProfileDesktopLayout";
import ProfileMobileLayout from "../components/profile/ProfileMobileLayout";
import ProfilePageLoader from "../components/profile/ProfilePageLoader";
import ProfileNotFound from "../components/profile/ProfileNotFound";

const ProfilePage = () => {
  const {
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
  } = useProfile();

  if (loadingProfile) {
    return <ProfilePageLoader />;
  }

  if (!profile) {
    return <ProfileNotFound />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
    >
      <div className="relative">
        <ProfileCoverPhoto
          profile={profile}
          currentUser={user}
          isUploadingCoverPhoto={isUploadingCoverPhoto}
          onCoverPhotoClick={handleCoverPhotoClick}
          coverPhotoInputRef={coverPhotoInputRef}
          onCoverPhotoChange={handleCoverPhotoChange}
          isFollowing={isFollowing}
          onFollowToggle={handleFollowToggle}
          followLoading={followLoading}
          onEditProfile={handleEditProfile}
          onProfilePicClick={handleProfilePicClick}
          profilePicInputRef={profilePicInputRef}
          onProfilePicChange={handleProfilePicChange}
          isUploadingProfilePic={isUploadingProfilePic}
        />
        <input
          type="file"
          ref={profilePicInputRef}
          onChange={handleProfilePicChange}
          accept="image/*"
          className="hidden"
          disabled={isUploadingProfilePic}
        />
        <input
          type="file"
          ref={coverPhotoInputRef}
          onChange={handleCoverPhotoChange}
          accept="image/*"
          className="hidden"
          disabled={isUploadingCoverPhoto}
        />
      </div>
      <div className="relative z-10">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <ProfileDesktopLayout
            profile={profile}
            posts={posts}
            loadingPosts={loadingPosts}
            onPostDeleted={handlePostDeleted}
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
          <ProfileMobileLayout
            profile={profile}
            posts={posts}
            loadingPosts={loadingPosts}
            onPostDeleted={handlePostDeleted}
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
      </div>
      <div className="h-20 sm:h-0" />
    </motion.div>
  );
};

export default ProfilePage;
