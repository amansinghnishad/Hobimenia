import { Link } from "react-router-dom";
import "../css/componentCSS/ProfileCard.css";

const ProfileCard = ({ user, onEdit, isSimplified }) => {
  // Add a check for the user prop
  if (!user) {
    return null; // Or a loading spinner, or some placeholder
  }

  if (isSimplified) {
    return (
      <Link to={`/profile/${user._id}`} className="profile-list-item-link">
        <div className="profile-list-item">
          <img
            src={user.profilePic || "/assets/default-avatar.png"}
            alt={`${user.username}'s avatar`}
            className="profile-list-item-avatar"
          />
          <div className="profile-list-item-info">
            <h4 className="profile-list-item-username">@{user.username}</h4>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="profile-card">
      <img
        src={user.profilePic || "/assets/default-avatar.png"}
        alt="avatar"
        className="profile-card-avatar"
      />
      <h2 className="profile-card-username">@{user.username}</h2>
      <p className="profile-card-email">{user.email}</p>
      {onEdit && (
        <button onClick={onEdit} className="profile-card-edit-btn">
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
