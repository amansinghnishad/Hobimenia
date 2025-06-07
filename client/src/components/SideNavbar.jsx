import React, { useContext, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa";

const MOBILE_BREAKPOINT = 768;

const SideNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
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
    { text: "Home", path: "/home", icon: <FaHome />, color: "text-blue-600" },
    {
      text: "Profile",
      path: `/profile/${user._id}`,
      icon: <FaUser />,
      color: "text-purple-600",
    },
    {
      text: "Create Post",
      path: "/create-post",
      icon: <FaPlus />,
      color: "text-green-600",
      action: () => navigate("/create-post"),
    },
  ];

  const secondaryLinks = [
    {
      text: "Settings",
      path: "/settings",
      icon: <FaCog />,
      color: "text-gray-600",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed top-20 left-0 h-[calc(100vh-5rem)] z-30 bg-white/90 backdrop-blur-sm
        border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out
        flex flex-col
        ${isExpanded ? "w-64 px-4" : "w-16 px-2"}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Primary Navigation */}
      <nav className="flex-1 py-6">
        <div className="space-y-2">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.action ? (
                  <motion.button
                    onClick={link.action}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? `bg-gradient-to-r from-blue-50 to-purple-50 ${link.color} shadow-sm`
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                      group
                    `}
                    title={link.text}
                  >
                    <div
                      className={`
                      w-6 h-6 flex items-center justify-center
                      ${
                        isActive
                          ? ""
                          : "group-hover:scale-110 transition-transform"
                      }
                    `}
                    >
                      {link.icon}
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium whitespace-nowrap"
                        >
                          {link.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ) : (
                  <Link
                    to={link.path}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? `bg-gradient-to-r from-blue-50 to-purple-50 ${link.color} shadow-sm`
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                      group
                    `}
                    title={link.text}
                  >
                    <motion.div
                      className={`
                        w-6 h-6 flex items-center justify-center
                        ${
                          isActive
                            ? ""
                            : "group-hover:scale-110 transition-transform"
                        }
                      `}
                      whileHover={{ scale: isActive ? 1 : 1.1 }}
                    >
                      {link.icon}
                    </motion.div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium whitespace-nowrap"
                        >
                          {link.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Secondary Navigation */}
      <nav className="py-4 border-t border-gray-200">
        <div className="space-y-2">
          {secondaryLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + index) * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? `bg-gradient-to-r from-gray-50 to-gray-100 ${link.color} shadow-sm`
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    group
                  `}
                  title={link.text}
                >
                  <motion.div
                    className={`
                      w-6 h-6 flex items-center justify-center
                      ${
                        isActive
                          ? ""
                          : "group-hover:scale-110 transition-transform"
                      }
                    `}
                    whileHover={{ scale: isActive ? 1 : 1.1 }}
                  >
                    {link.icon}
                  </motion.div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {link.text}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: (navLinks.length + secondaryLinks.length) * 0.1,
            }}
          >
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                text-red-600 hover:bg-red-50 hover:text-red-700
                group
              "
              title="Logout"
            >
              <motion.div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaSignOutAlt />
              </motion.div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </nav>
    </motion.aside>
  );
};

export default SideNavbar;
