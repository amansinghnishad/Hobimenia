import React from "react";
import { FaCamera } from "react-icons/fa";
import Loader from "../Loader";
import "../../css/componentCSS/profile/ProfileCoverPhoto.css";

const ProfileCoverPhoto = ({
  profile,
  currentUser,
  isUploadingCoverPhoto,
  onCoverPhotoClick,
  coverPhotoInputRef,
  onCoverPhotoChange,
}) => {
  if (!profile) return null;

  return (
    <div className="profilepage-cover-photo-container">
      <img
        src={profile.coverPhoto || "/assets/default-cover.jpg"}
        alt="Cover"
        className="profilepage-cover-photo"
      />
      {currentUser?._id === profile._id && (
        <button
          className="profilepage-cover-edit-btn"
          onClick={onCoverPhotoClick}
          disabled={isUploadingCoverPhoto}
          title="Change cover photo"
        >
          {isUploadingCoverPhoto ? <Loader size="small" /> : <FaCamera />}
          <span className="profilepage-cover-edit-btn-text">Change Cover</span>
        </button>
      )}
      <input
        type="file"
        ref={coverPhotoInputRef}
        onChange={onCoverPhotoChange}
        accept="image/*"
        style={{ display: "none" }}
        disabled={isUploadingCoverPhoto}
      />
    </div>
  );
};

export default ProfileCoverPhoto;
