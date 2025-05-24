import React, { useContext, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../css/componentCSS/SideNavbar.css";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa";

const MOBILE_BREAKPOINT = 768;

const SideNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user || location.pathname === "/" || isMobile) {
    return null;
  }

  const navLinks = [
    { text: "Home", path: "/home", icon: <FaHome /> },
    { text: "Profile", path: `/profile/${user._id}`, icon: <FaUser /> },
    {
      text: "Create Post",
      path: "/create-post",
      icon: <FaPlus />,
      action: () => navigate("/create-post"),
    },
  ];

  const secondaryLinks = [
    { text: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside
      className={`side-navbar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="primary-nav">
        {navLinks.map((link) => (
          <Link
            key={link.text}
            to={link.path}
            className={`nav-item ${
              location.pathname === link.path ? "active" : ""
            }`}
            title={link.text}
          >
            {link.icon}
            {isExpanded && <span className="nav-text">{link.text}</span>}
          </Link>
        ))}
      </nav>
      <nav className="secondary-nav">
        {secondaryLinks.map((link) =>
          link.action ? (
            <button
              key={link.text}
              onClick={link.action}
              className="nav-item nav-button"
              title={link.text}
            >
              {link.icon}
              {isExpanded && <span className="nav-text">{link.text}</span>}
            </button>
          ) : (
            <Link
              key={link.text}
              to={link.path}
              className={`nav-item ${
                location.pathname === link.path ? "active" : ""
              }`}
              title={link.text}
            >
              {link.icon}
              {isExpanded && <span className="nav-text">{link.text}</span>}
            </Link>
          )
        )}
        {logout && (
          <button
            onClick={logout}
            className="nav-item nav-button logout-button"
            title="Logout"
          >
            <FaSignOutAlt />
            {isExpanded && <span className="nav-text">Logout</span>}
          </button>
        )}
      </nav>
    </aside>
  );
};

export default SideNavbar;
