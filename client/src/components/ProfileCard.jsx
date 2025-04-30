const ProfileCard = ({ user, isOwnProfile }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <img
        src={user.profilePic || "/assets/default-avatar.png"}
        alt="Avatar"
        className="w-20 h-20 rounded-full mx-auto"
      />
      <h2 className="text-xl font-bold mt-2">{user.username}</h2>
      <p className="text-gray-600">{user.bio || "No bio provided."}</p>
      {isOwnProfile && (
        <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
