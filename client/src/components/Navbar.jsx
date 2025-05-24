import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import NotificationsList from "./NotificationsList";
import { getNotifications } from "../services/api";
import "../css/componentCSS/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationsRef = useRef(null);

  const fetchUnreadCount = async () => {
    if (!user) return;
    try {
      const notifications = await getNotifications();
      const count = notifications.filter((n) => !n.isRead).length;
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch unread notifications count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        if (!event.target.closest(".navbar-notifications-btn")) {
          setShowNotifications(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsRef]);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setShowNotifications(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowNotifications(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      fetchUnreadCount();
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
        <span className="navbar-brand-logo">H</span> Hobimenia
      </Link>

      <button
        className="navbar-mobile-toggle" // Added class
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="navbar-links-desktop">
        <Link to={user ? "/home" : "/"} className="navbar-link-item">
          <FaHome className="navbar-link-icon" /> Home
        </Link>

        {user ? (
          <>
            <Link to={`/profile/${user._id}`} className="navbar-link-item">
              <FaUser className="navbar-link-icon" /> Profile
            </Link>

            <button
              className="navbar-link-item navbar-notifications-btn"
              onClick={toggleNotifications}
              aria-label="Toggle notifications"
            >
              <FaBell className="navbar-link-icon" />
              {unreadCount > 0 && (
                <span className="navbar-unread-badge">{unreadCount}</span>
              )}
              Notifications
            </button>
            <button onClick={handleLogout} className="navbar-btn-logout">
              <FaSignOutAlt className="navbar-link-icon" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/#about-us-section" className="navbar-link-item">
              <FaInfoCircle className="navbar-link-icon" /> About
            </Link>
            <Link to="/#contact-us-section" className="navbar-link-item">
              <FaEnvelope className="navbar-link-icon" /> Contact
            </Link>
            <Link to="/login" className="navbar-btn-login">
              <FaSignInAlt className="navbar-link-icon" /> Login
            </Link>
            <Link to="/signup" className="navbar-btn-signup">
              <FaUserPlus className="navbar-link-icon" /> Signup
            </Link>
          </>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="navbar-links-mobile">
          <Link
            to="/home"
            className="navbar-link-item"
            onClick={closeMobileMenu}
          >
            <FaHome className="navbar-link-icon" /> Home
          </Link>
          {user ? (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="navbar-link-item"
                onClick={closeMobileMenu}
              >
                <FaUser className="navbar-link-icon" /> Profile
              </Link>
              <button onClick={handleLogout} className="navbar-btn-logout">
                <FaSignOutAlt className="navbar-link-icon" /> Logout
              </button>
              <Link
                to="/notifications" // Or handle with dropdown logic similar to desktop
                className="navbar-link-item"
                onClick={() => {
                  closeMobileMenu();
                  /* setShowNotifications(true); */
                }}
              >
                <FaBell className="navbar-link-icon" /> Notifications
                {unreadCount > 0 && (
                  <span className="navbar-unread-badge-mobile">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/#about-us-section"
                className="navbar-link-item"
                onClick={closeMobileMenu}
              >
                <FaInfoCircle className="navbar-link-icon" /> About
              </Link>
              <Link
                to="/#contact-us-section"
                className="navbar-link-item"
                onClick={closeMobileMenu}
              >
                <FaEnvelope className="navbar-link-icon" /> Contact
              </Link>
              <Link
                to="/login"
                className="navbar-btn-login"
                onClick={closeMobileMenu}
              >
                <FaSignInAlt className="navbar-link-icon" /> Login
              </Link>
              <Link
                to="/signup"
                className="navbar-btn-signup"
                onClick={closeMobileMenu}
              >
                <FaUserPlus className="navbar-link-icon" /> Signup
              </Link>
            </>
          )}
        </div>
      )}

      {showNotifications && user && (
        <div className="navbar-notifications-dropdown" ref={notificationsRef}>
          <NotificationsList />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
