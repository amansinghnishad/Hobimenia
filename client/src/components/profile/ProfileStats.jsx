import React from "react";
import "../../css/componentCSS/profile/ProfileStats.css";

const ProfileStats = ({ profile, postsCountFromParent }) => {
  if (!profile) return null;

  return (
    <div className="profilepage-stats">
      <div className="profilepage-stat-item">
        <strong>
          {profile.postsCount !== undefined
            ? profile.postsCount
            : postsCountFromParent}
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
  );
};

export default ProfileStats;
