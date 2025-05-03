import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../css/componentCSS/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand">
        <span className="navbar-brand-logo">H</span>
        Hobimenia
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to={`/profile/${user._id}`} className="navbar-link">
              <span className="navbar-avatar">
                {user.username?.[0]?.toUpperCase() || "U"}
              </span>
              My Profile
            </Link>
            <button onClick={handleLogout} className="navbar-btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn-login">
              Login
            </Link>
            <Link to="/signup" className="navbar-btn-signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
