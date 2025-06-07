import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, Avatar, Button } from "./ui";
import { FaEdit, FaEnvelope } from "react-icons/fa";

const ProfileCard = ({ user, onEdit, isSimplified }) => {
  // Show loading state
  if (!user) {
    return (
      <Card className="animate-pulse">
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </Card>
    );
  }

  if (isSimplified) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Link to={`/profile/${user._id}`} className="block">
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <Avatar
                src={user.profilePic}
                fallback={user.username?.[0]?.toUpperCase()}
                size="md"
                className="flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  @{user.username}
                </h4>
                {user.email && (
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                )}
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="text-center">
        <div className="p-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <Avatar
              src={user.profilePic}
              fallback={user.username?.[0]?.toUpperCase()}
              size="xl"
              className="mx-auto shadow-lg"
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            @{user.username}
          </h2>

          {user.email && (
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6">
              <FaEnvelope size={16} />
              <span className="text-sm">{user.email}</span>
            </div>
          )}

          {user.bio && (
            <p className="text-gray-700 mb-6 leading-relaxed max-w-md mx-auto">
              {user.bio}
            </p>
          )}

          {onEdit && (
            <Button
              onClick={onEdit}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <FaEdit size={16} />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
