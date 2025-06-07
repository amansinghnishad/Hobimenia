import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUsers } from "react-icons/fi";
import { Avatar, Loader } from "../ui";

const UserListModal = ({ isOpen, onClose, title, users, isLoading }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const initiateClose = () => {
    if (!isOpen || isAnimatingOut) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
      setIsAnimatingOut(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={initiateClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <FiUsers className="text-white text-sm" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={initiateClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FiX size={20} />
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader />
                </div>
              ) : users && users.length > 0 ? (
                <div className="space-y-2">
                  {users.map((user, index) => (
                    <motion.div
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={`/profile/${user._id}`}
                        onClick={initiateClose}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group"
                      >
                        <Avatar
                          src={user.profilePic}
                          alt={user.username}
                          size="md"
                          className="ring-2 ring-white shadow-md group-hover:ring-purple-200 transition-all"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                            {user.username}
                          </p>
                          {user.fullName && (
                            <p className="text-sm text-gray-500 group-hover:text-gray-600">
                              {user.fullName}
                            </p>
                          )}
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 text-purple-500"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUsers className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    No users to display
                  </p>
                  <p className="text-gray-400 text-sm mt-1">Check back later</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserListModal;
