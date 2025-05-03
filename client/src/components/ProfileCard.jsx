import "../css/componentCSS/ProfileCard.css";

const ProfileCard = ({ user, onEdit }) => (
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

export default ProfileCard;
