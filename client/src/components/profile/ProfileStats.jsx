import React, { useState, useEffect, useContext } from "react";
import UserListModal from "./UserListModal"; // We will create this component
import api from "../../api/axios"; // Assuming you have a configured axios instance
import { AuthContext } from "../../contexts/AuthContext";
import "../../css/componentCSS/profile/ProfileStats.css";

const ProfileStats = ({ profile, postsCountFromParent }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUsers, setModalUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { token } = useContext(AuthContext);

  if (!profile) return null;

  const fetchUsers = async (type) => {
    if (!profile._id || !token) return;
    setIsLoadingUsers(true);
    setModalUsers([]);
    try {
      const response = await api.get(`/users/${profile._id}/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalUsers(response.data || []);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setModalUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleOpenModal = (type) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    setModalTitle(title);
    fetchUsers(type);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalTitle("");
    setModalUsers([]);
  };

  return (
    <>
      <div className="profilepage-stats">
        <div className="profilepage-stat-item">
          <strong>
            {profile.postsCount !== undefined
              ? profile.postsCount
              : postsCountFromParent}
          </strong>{" "}
          Posts
        </div>
        <div
          className="profilepage-stat-item clickable"
          onClick={() => handleOpenModal("followers")}
        >
          <strong>{profile.followersCount || 0}</strong> Followers
        </div>
        <div
          className="profilepage-stat-item clickable"
          onClick={() => handleOpenModal("following")}
        >
          <strong>{profile.followingCount || 0}</strong> Following
        </div>
      </div>
      <UserListModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        users={modalUsers}
        isLoading={isLoadingUsers}
      />
    </>
  );
};

export default ProfileStats;
