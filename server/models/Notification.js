import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['new_comment', 'like', 'mention', 'new_message', 'follow'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    comment: { // Optional: if the notification is specifically about a comment
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    chat: { // Optional: if the notification is about a new chat message
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat', // Assuming you have or will have a Chat model
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    message: { // Optional: A pre-generated message for the notification
      type: String,
    }
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
