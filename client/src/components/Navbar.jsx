import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import "../css/componentCSS/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link
        to={user ? "/home" : "/"}
        className="navbar-brand"
        onClick={closeMobileMenu}
      >
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
        <Link to="/home" className="navbar-link-item">
          <FaHome className="navbar-link-icon" /> Home
        </Link>
        {user ? (
          <>
            <Link to={`/profile/${user._id}`} className="navbar-link-item">
              <FaUser className="navbar-link-icon" /> Profile
            </Link>
            <button onClick={handleLogout} className="navbar-btn-logout">
              <FaSignOutAlt className="navbar-link-icon" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/about" className="navbar-link-item">
              <FaInfoCircle className="navbar-link-icon" /> About
            </Link>
            <Link to="/contact" className="navbar-link-item">
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
            </>
          ) : (
            <>
              <Link
                to="/about"
                className="navbar-link-item"
                onClick={closeMobileMenu}
              >
                <FaInfoCircle className="navbar-link-icon" /> About
              </Link>
              <Link
                to="/contact"
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
    </nav>
  );
};

export default Navbar;
