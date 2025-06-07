import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import UserListModal from "./UserListModal";
import api from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext";

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

  const stats = [
    {
      label: "Posts",
      value:
        profile.postsCount !== undefined
          ? profile.postsCount
          : postsCountFromParent,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      clickable: false,
    },
    {
      label: "Followers",
      value: profile.followersCount || 0,
      color: "text-red-600",
      bgColor: "bg-red-50",
      clickable: true,
      onClick: () => handleOpenModal("followers"),
    },
    {
      label: "Following",
      value: profile.followingCount || 0,
      color: "text-green-600",
      bgColor: "bg-green-50",
      clickable: true,
      onClick: () => handleOpenModal("following"),
    },
  ];

  return (
    <>
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden mx-2 sm:mx-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Mobile Layout (< md) */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`
                  p-3 xs:p-4 sm:p-5 text-center transition-all duration-300 relative group
                  ${
                    stat.clickable
                      ? "cursor-pointer hover:bg-gray-50/80 active:bg-gray-100/80"
                      : ""
                  }
                `}
                onClick={stat.clickable ? stat.onClick : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileTap={stat.clickable ? { scale: 0.95 } : {}}
              >
                {/* Count */}
                <motion.div
                  className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  {stat.value.toLocaleString()}
                </motion.div>

                {/* Label */}
                <div className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>

                {/* Touch indicator for mobile */}
                {stat.clickable && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>{" "}
        {/* Desktop Layout (>= md) */}
        <div className="hidden md:block">
          <div className="flex divide-x divide-gray-100 min-h-[120px] md:min-h-[140px] lg:min-h-[160px]">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`
                  flex-1 flex flex-col justify-center items-center py-6 px-4 lg:py-8 lg:px-6 transition-all duration-300 relative group min-w-0
                  ${stat.clickable ? "cursor-pointer hover:bg-gray-50/80" : ""}
                `}
                onClick={stat.clickable ? stat.onClick : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={stat.clickable ? { y: -2 } : {}}
                whileTap={stat.clickable ? { scale: 0.98 } : {}}
              >
                {/* Count */}
                <motion.div
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2 leading-none"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  {stat.value.toLocaleString()}
                </motion.div>

                {/* Label */}
                <div className="text-xs md:text-sm lg:text-base font-medium text-gray-600 uppercase tracking-wide leading-none">
                  {stat.label}
                </div>

                {/* Hover indicator */}
                {stat.clickable && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ width: 0 }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

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
