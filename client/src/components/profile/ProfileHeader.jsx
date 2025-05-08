import React from "react";
import { FaEdit, FaCamera } from "react-icons/fa";
import Loader from "../Loader";
import "../../css/componentCSS/profile/ProfileHeader.css";

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
    <div className="profilepage-header-section">
      <div
        className={`profilepage-avatar-wrapper${
          isOwnProfile ? " editable" : ""
        }`}
        onClick={isOwnProfile ? onProfilePicClick : undefined}
        title={isOwnProfile ? "Change profile picture" : ""}
      >
        <img
          src={profile.profilePic || "/assets/default-avatar.png"}
          alt={`${profile.username}'s avatar`}
          className={`profilepage-avatar${
            isUploadingProfilePic ? " uploading" : ""
          }`}
        />
        {isOwnProfile && !isUploadingProfilePic && (
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
      {isOwnProfile && (
        <input
          type="file"
          ref={profilePicInputRef}
          onChange={onProfilePicChange}
          accept="image/*"
          style={{ display: "none" }}
          disabled={isUploadingProfilePic || !isOwnProfile}
        />
      )}

      <div className="profilepage-user-details">
        <h2 className="profilepage-username">@{profile.username}</h2>
      </div>

      <div className="profilepage-actions">
        {isOwnProfile ? (
          !isEditingProfile && (
            <button
              onClick={onEditProfile}
              className="profilepage-action-btn edit-profile-btn"
            >
              <FaEdit /> Edit Profile
            </button>
          )
        ) : (
          <button
            onClick={onFollowToggle}
            className={`profilepage-action-btn follow-btn ${
              isFollowing ? "following" : ""
            }`}
            disabled={followLoading || !currentUser}
            title={
              !currentUser
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
  );
};

export default ProfileHeader;
