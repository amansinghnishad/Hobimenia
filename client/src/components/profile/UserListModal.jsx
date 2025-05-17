import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import "../../css/componentCSS/profile/UserListModal.css";

const UserListModal = ({ isOpen, onClose, title, users, isLoading }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const initiateClose = () => {
    if (!isOpen || isAnimatingOut) {
      return;
    }

    setIsAnimatingOut(true);

    setTimeout(() => {
      onClose();
      setIsAnimatingOut(false);
    }, 300);
  };

  if (!isOpen && !isAnimatingOut) {
    return null;
  }

  const overlayClassName = `user-list-modal-overlay ${
    isAnimatingOut ? "closing" : ""
  }`;
  const contentClassName = `user-list-modal-content ${
    isAnimatingOut ? "closing" : ""
  }`;

  return (
    <div className={overlayClassName} onClick={initiateClose}>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()}>
        <div className="user-list-modal-header">
          <h3>{title}</h3>
          <button onClick={initiateClose} className="user-list-modal-close-btn">
            &times;
          </button>
        </div>
        <div className="user-list-modal-body">
          {isLoading ? (
            <Loader />
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="user-list-item">
                <img
                  src={user.profilePic || "/assets/default-avatar.png"}
                  alt={user.username}
                  className="user-list-item-avatar"
                />
                <Link
                  to={`/profile/${user._id}`}
                  className="user-list-item-username-link"
                  onClick={initiateClose}
                >
                  <span>{user.username}</span>
                </Link>
              </div>
            ))
          ) : (
            <p>No users to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
