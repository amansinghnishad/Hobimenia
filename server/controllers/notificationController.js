import Notification from '../models/Notification.js';
import mongoose from 'mongoose';

// Get notifications for a user (unread first, then by date)
export const getNotifications = async (req, res) => {
  const userId = req.user._id;
  try {
    const notifications = await Notification.find({ recipient: userId })
      .populate('sender', 'username profilePic')
      .populate('post', 'caption imageUrl')
      .sort({ isRead: 1, createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
};

// Mark a single notification as read
export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.id;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    return res.status(400).json({ message: 'Invalid notification ID' });
  }

  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipient: userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found or user mismatch' });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
  }
};

// Mark all unread notifications as read for a user
export const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.user._id;
  try {
    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { isRead: true }
    );
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ message: 'Failed to mark all notifications as read', error: error.message });
  }
};
