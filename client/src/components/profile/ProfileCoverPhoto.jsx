import React from "react";
import { motion } from "framer-motion";
import { FaCamera, FaEdit, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { Loader, Button, LazyImage, Avatar } from "../ui";

const ProfileCoverPhoto = ({
  profile,
  currentUser,
  isUploadingCoverPhoto,
  onCoverPhotoClick,
  coverPhotoInputRef,
  onCoverPhotoChange,
  isFollowing,
  onFollowToggle,
  followLoading,
  onEditProfile,
  onProfilePicClick,
  profilePicInputRef,
  onProfilePicChange,
  isUploadingProfilePic,
}) => {
  if (!profile) return null;

  const isOwnProfile = currentUser?._id === profile._id;
  return (
    <motion.div
      className="relative h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-4 sm:mb-6 lg:mb-8"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Cover Photo with Lazy Loading */}
      <LazyImage
        src={profile.coverPhoto}
        alt={`${profile.username}'s cover photo`}
        className="w-full h-full object-cover"
        placeholder={
          <div className="w-full h-full bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <FaCamera className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">No cover photo</p>
            </div>
          </div>
        }
      />
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />{" "}
      {/* Action Buttons - Responsive positioning */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-20 flex items-center space-x-2 sm:space-x-3">
        {/* Cover Photo Edit Button */}
        {isOwnProfile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Button
              onClick={onCoverPhotoClick}
              disabled={isUploadingCoverPhoto}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm font-medium rounded-full shadow-lg min-h-[32px] sm:min-h-[36px] lg:min-h-[40px]"
            >
              {isUploadingCoverPhoto ? (
                <>
                  <Loader size="sm" className="mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Uploading...</span>
                </>
              ) : (
                <>
                  <FaCamera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Edit Cover</span>
                  <span className="xs:hidden">Edit</span>
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Follow/Edit Profile Button */}
        {!isOwnProfile ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button
              onClick={onFollowToggle}
              disabled={followLoading}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-md border text-xs sm:text-sm min-h-[32px] sm:min-h-[36px] lg:min-h-[40px] ${
                isFollowing
                  ? "bg-white/20 border-white/30 text-white hover:bg-red-500/80 hover:border-red-400"
                  : "bg-blue-500/80 border-blue-400 text-white hover:bg-blue-600/80"
              }`}
            >
              {followLoading ? (
                <Loader size="sm" />
              ) : isFollowing ? (
                <>
                  <FaUserCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Following</span>
                  <span className="xs:hidden">✓</span>
                </>
              ) : (
                <>
                  <FaUserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Follow</span>
                  <span className="xs:hidden">+</span>
                </>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button
              onClick={onEditProfile}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 font-medium rounded-full shadow-lg text-xs sm:text-sm min-h-[32px] sm:min-h-[36px] lg:min-h-[40px]"
            >
              <FaEdit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Edit Profile</span>
              <span className="xs:hidden">Edit</span>
            </Button>
          </motion.div>
        )}
      </div>{" "}
      {/* Profile Info - Bottom Center with proper spacing */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 text-center">
        {/* Avatar */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div className="relative group">
            <Avatar
              src={profile.profilePic}
              fallback={profile.username?.[0]?.toUpperCase()}
              size="2xl"
              onClick={isOwnProfile ? onProfilePicClick : undefined}
              className={`ring-4 ring-white/50 shadow-2xl backdrop-blur-sm transition-all duration-300 ${
                isOwnProfile ? "cursor-pointer hover:ring-white/70" : ""
              } ${isUploadingProfilePic ? "opacity-60" : ""}`}
            />

            {/* Camera Overlay for Profile Picture */}
            {isOwnProfile && !isUploadingProfilePic && (
              <motion.div
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={onProfilePicClick}
              >
                <FaCamera className="text-white text-xl" />
              </motion.div>
            )}

            {/* Upload Loader for Profile Picture */}
            {isUploadingProfilePic && (
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                <Loader size="md" className="text-white" />
              </div>
            )}

            {/* Floating particles effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm animate-pulse" />
          </div>
        </motion.div>

        {/* Username with enhanced styling */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20" />

          {/* Username text */}
          <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-white py-4 px-6">
            {" "}
            {/* Multiple text shadows for enhanced readability */}
            <span
              style={{
                textShadow: `
                  0 1px 3px rgba(0,0,0,0.8),
                  0 2px 6px rgba(0,0,0,0.6),
                  0 4px 12px rgba(0,0,0,0.4),
                  0 8px 24px rgba(0,0,0,0.3)
                `,
              }}
            >
              @{profile.username}
            </span>
          </h1>

          {/* Decorative accent line */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />

          {/* Animated underline */}
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white/60 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>
      {/* Decorative gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />{" "}
      {/* Hidden Inputs */}
      <input
        type="file"
        ref={coverPhotoInputRef}
        onChange={onCoverPhotoChange}
        accept="image/*"
        className="hidden"
        disabled={isUploadingCoverPhoto}
      />
      {isOwnProfile && (
        <input
          type="file"
          ref={profilePicInputRef}
          onChange={onProfilePicChange}
          accept="image/*"
          className="hidden"
          disabled={isUploadingProfilePic}
        />
      )}
    </motion.div>
  );
};

export default ProfileCoverPhoto;
