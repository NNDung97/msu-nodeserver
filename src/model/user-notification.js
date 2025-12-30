// models/user-notification.js
import mongoose from "mongoose";

const UserNotificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },

  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
    required: true
  },

  isRead: {
    type: Boolean,
    default: false
  },

  deliveredAt: {
    type: Date,
    default: Date.now
  },

  readAt: {
    type: Date,
    default: null
  }
});

UserNotificationSchema.index({ userId: 1, isRead: 1 });

export default mongoose.model("UserNotification", UserNotificationSchema);
