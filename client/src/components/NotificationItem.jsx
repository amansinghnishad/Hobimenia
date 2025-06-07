import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaComment,
  FaUserPlus,
  FaBell,
  FaClock,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { Avatar, Card } from "./ui";

const NotificationItem = ({ notification, onClick }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (onClick) {
      onClick(notification);
    }
    // Navigate after marking as read
    if (notification.type === "follow" && notification.sender?._id) {
      navigate(`/profile/${notification.sender._id}`);
    } else if (notification.post?._id) {
      if (notification.type === "new_comment" && notification.comment) {
        const commentId =
          typeof notification.comment === "object"
            ? notification.comment._id
            : notification.comment;
        navigate(`/post/${notification.post._id}#comment-${commentId}`);
      } else {
        navigate(`/post/${notification.post._id}`);
      }
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "new_comment":
        return FaComment;
      case "like":
        return FaHeart;
      case "follow":
        return FaUserPlus;
      default:
        return FaBell;
    }
  };

  const getNotificationColor = () => {
    switch (notification.type) {
      case "new_comment":
        return "text-blue-600 bg-blue-50";
      case "like":
        return "text-red-600 bg-red-50";
      case "follow":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const renderNotificationMessage = () => {
    const senderUsername = notification.sender?.username || "Someone";
    let postLinkPath = notification.post?._id
      ? `/post/${notification.post._id}`
      : "#";

    if (
      notification.type === "new_comment" &&
      notification.comment &&
      notification.post?._id
    ) {
      const commentId =
        typeof notification.comment === "object"
          ? notification.comment._id
          : notification.comment;
      postLinkPath = `/post/${notification.post._id}#comment-${commentId}`;
    }

    switch (notification.type) {
      case "new_comment":
        return (
          <span className="text-gray-700">
            <Link
              to={`/profile/${notification.sender?._id}`}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {senderUsername}
            </Link>{" "}
            commented on your post:
            {notification.post && (
              <Link
                to={postLinkPath}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-1"
              >
                "{notification.post.caption?.substring(0, 30)}..."
              </Link>
            )}
          </span>
        );
      case "like":
        return (
          <span className="text-gray-700">
            <Link
              to={`/profile/${notification.sender?._id}`}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {senderUsername}
            </Link>{" "}
            liked your post:
            {notification.post && (
              <Link
                to={postLinkPath}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-1"
              >
                "{notification.post.caption?.substring(0, 30)}..."
              </Link>
            )}
          </span>
        );
      case "follow":
        return (
          <span className="text-gray-700">
            <Link
              to={`/profile/${notification.sender?._id}`}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {senderUsername}
            </Link>{" "}
            started following you.
          </span>
        );
      default:
        return (
          <span className="text-gray-700">
            {notification.message || "You have a new notification."}
          </span>
        );
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const IconComponent = getNotificationIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`
          p-4 cursor-pointer transition-all duration-200 border-l-4
          ${
            notification.isRead
              ? "bg-white border-l-gray-200 hover:bg-gray-50"
              : "bg-blue-50/50 border-l-blue-500 hover:bg-blue-50"
          }
          hover:shadow-md
        `}
        onClick={handleItemClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleItemClick();
        }}
      >
        <div className="flex items-start gap-3">
          {/* Notification Icon */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor()}`}
          >
            <IconComponent className="w-4 h-4" />
          </div>

          {/* Sender Avatar */}
          {notification.sender && (
            <Avatar
              src={notification.sender.profilePic}
              alt={notification.sender.username}
              size="sm"
              fallback={notification.sender.username?.[0]?.toUpperCase()}
            />
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-1">{renderNotificationMessage()}</div>

            {/* Timestamp */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaClock className="w-3 h-3" />
              <span>{formatTime(notification.createdAt)}</span>
              {!notification.isRead && (
                <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      username: PropTypes.string,
    }),
    type: PropTypes.string.isRequired,
    post: PropTypes.shape({
      _id: PropTypes.string,
      caption: PropTypes.string,
    }),
    comment: PropTypes.oneOfType([
      // comment can be string or object with _id
      PropTypes.string,
      PropTypes.shape({ _id: PropTypes.string }),
    ]),
    isRead: PropTypes.bool,
    message: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotificationItem;
