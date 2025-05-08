import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import "../../css/componentCSS/profile/ProfileBioInterests.css";

const ProfileBioInterests = ({
  profile,
  currentUser,
  isEditingProfile,
  tempBio,
  setTempBio,
  tempInterests,
  setTempInterests,
  onSaveProfile,
  onCancelEdit,
  onEditProfile, // For "Add bio/interests" links
}) => {
  if (!profile) return null;
  const isOwnProfile = currentUser?._id === profile._id;

  return isEditingProfile && isOwnProfile ? (
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
          onClick={onSaveProfile}
          className="profilepage-action-btn save-btn"
        >
          <FaSave /> Save Changes
        </button>
        <button
          onClick={onCancelEdit}
          className="profilepage-action-btn cancel-btn"
        >
          <FaTimes /> Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="profilepage-bio-interests">
      {profile.bio && <p className="profilepage-bio">{profile.bio}</p>}
      {!profile.bio && !isOwnProfile && (
        <p className="profilepage-bio-empty">No bio yet.</p>
      )}
      {!profile.bio && isOwnProfile && (
        <p className="profilepage-bio-empty">
          No bio yet.{" "}
          <button onClick={onEditProfile} className="link-style">
            Add bio
          </button>
        </p>
      )}

      {profile.interests && profile.interests.length > 0 && (
        <div className="profilepage-interests">
          <strong>Interests:</strong>
          <div className="profilepage-interests-tags">
            {profile.interests.map((interest, index) => (
              <span key={index} className="profilepage-interest-tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      {(!profile.interests || profile.interests.length === 0) &&
        isOwnProfile && (
          <p className="profilepage-interests-empty">
            No interests listed.{" "}
            <button onClick={onEditProfile} className="link-style">
              Add interests
            </button>
          </p>
        )}
    </div>
  );
};

export default ProfileBioInterests;
