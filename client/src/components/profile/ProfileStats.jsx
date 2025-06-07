import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHeart, FaImages } from "react-icons/fa";
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
      icon: FaImages,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      clickable: false,
    },
    {
      label: "Followers",
      value: profile.followersCount || 0,
      icon: FaHeart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      clickable: true,
      onClick: () => handleOpenModal("followers"),
    },
    {
      label: "Following",
      value: profile.followingCount || 0,
      icon: FaUsers,
      color: "text-green-600",
      bgColor: "bg-green-50",
      clickable: true,
      onClick: () => handleOpenModal("following"),
    },
  ];

  return (
    <>
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 mx-4 sm:mx-0 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`
                flex-1 p-6 text-center transition-all duration-300 relative group
                ${stat.clickable ? "cursor-pointer hover:bg-gray-50/80" : ""}
              `}
              onClick={stat.clickable ? stat.onClick : undefined}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={stat.clickable ? { scale: 1.02 } : {}}
              whileTap={stat.clickable ? { scale: 0.98 } : {}}
            >
              {/* Icon with modern styling */}
              <motion.div
                className={`
                  w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center
                  ${stat.bgColor} ${stat.color}
                  ${
                    stat.clickable
                      ? "group-hover:scale-110 group-hover:shadow-lg"
                      : ""
                  }
                  transition-all duration-300
                `}
                whileHover={stat.clickable ? { rotate: 5 } : {}}
              >
                <stat.icon className="w-6 h-6" />
              </motion.div>

              {/* Count */}
              <motion.div
                className="text-3xl font-bold text-gray-900 mb-1"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                {stat.value.toLocaleString()}
              </motion.div>

              {/* Label */}
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {stat.label}
              </div>

              {/* Hover indicator */}
              {stat.clickable && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ width: 0 }}
                  whileHover={{ width: 32 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          ))}
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
