import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaCamera, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { Avatar, Button, Loader } from "../ui";

const ProfileHeader = ({
  profile,
  currentUser,
  isUploadingProfilePic,
  onProfilePicClick,
  profilePicInputRef,
  onProfilePicChange,
  isEditingProfile,
  onEditProfile,
  isFollowing,
  onFollowToggle,
  followLoading,
}) => {
  if (!profile) return null;

  const isOwnProfile = currentUser?._id === profile._id;
  return (
    <motion.div
      className="relative px-4 sm:px-6 pb-8 -mt-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {" "}
      {/* Action Buttons - Top Right */}
      {isOwnProfile && !isEditingProfile && (
        <motion.div
          className="absolute top-4 right-4 sm:right-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            onClick={onEditProfile}
            className="bg-white/90 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-white hover:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 font-medium px-4 py-2 text-sm"
          >
            <FaEdit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </motion.div>
      )}
      {/* Follow Button - Top Right */}
      {!isOwnProfile && (
        <motion.div
          className="absolute top-4 right-4 sm:right-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            onClick={onFollowToggle}
            disabled={followLoading || !currentUser}
            className={`
              transition-all duration-200 font-medium px-4 py-2 text-sm shadow-lg hover:shadow-xl
              ${
                isFollowing
                  ? "bg-white/90 backdrop-blur-sm border border-red-500/30 text-red-600 hover:bg-white hover:border-red-500 hover:text-red-700"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border border-transparent"
              }
              ${!currentUser ? "opacity-50 cursor-not-allowed" : ""}
            `}
            title={
              !currentUser
                ? "Login to follow"
                : isFollowing
                ? `Unfollow @${profile.username}`
                : `Follow @${profile.username}`
            }
          >
            {followLoading ? (
              <Loader size="sm" className="mr-2" />
            ) : isFollowing ? (
              <FaUserCheck className="w-4 h-4 mr-2" />
            ) : (
              <FaUserPlus className="w-4 h-4 mr-2" />
            )}
            {followLoading
              ? "Loading..."
              : isFollowing
              ? "Following"
              : "Follow"}
          </Button>
        </motion.div>
      )}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
        {/* Avatar Section */}
        <motion.div
          className="relative group"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative">
            <Avatar
              src={profile.profilePic}
              alt={`${profile.username}'s avatar`}
              size="2xl"
              className={`
                ring-6 ring-white shadow-2xl transition-all duration-300
                ${isOwnProfile ? "cursor-pointer hover:ring-blue-200" : ""}
                ${isUploadingProfilePic ? "opacity-60" : ""}
              `}
              onClick={isOwnProfile ? onProfilePicClick : undefined}
            />

            {/* Camera Overlay */}
            {isOwnProfile && !isUploadingProfilePic && (
              <motion.div
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={onProfilePicClick}
              >
                <FaCamera className="text-white text-xl" />
              </motion.div>
            )}

            {/* Upload Loader */}
            {isUploadingProfilePic && (
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                <Loader size="md" className="text-white" />
              </div>
            )}
          </div>

          {/* Hidden File Input */}
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
        </motion.div>{" "}
        {/* User Info & Actions */}
        <div className="flex-1 text-center sm:text-left mt-6 sm:mt-0">
          <motion.div
            className="relative inline-block group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Elegant background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent backdrop-blur-md rounded-2xl -mx-3 -my-1 group-hover:from-black/40 group-hover:via-black/30 transition-all duration-300"></div>

            {/* Decorative elements */}
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full opacity-80"></div>

            <motion.h2
              className="relative text-3xl md:text-4xl lg:text-5xl font-extrabold text-white px-6 py-3 tracking-wide"
              style={{
                textShadow:
                  "3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5), 2px 2px 0px rgba(0,0,0,0.8)",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{
                scale: 1.02,
                textShadow:
                  "4px 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6), 3px 3px 0px rgba(0,0,0,0.8)",
              }}
            >
              <span className="relative">
                @{profile.username}
                {/* Subtle gradient underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h2>

            {/* Floating particles effect */}
            <motion.div
              className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full opacity-60"
              animate={{
                y: [-10, -20, -10],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50"
              animate={{
                y: [-5, -15, -5],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
