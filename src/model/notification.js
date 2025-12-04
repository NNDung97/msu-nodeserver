import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    walletAddress: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error'],
      default: 'info'
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    isRead: {
      type: Boolean,
      default: false
    },
    readAt: {
      type: Date,
      default: null
    },
    isSystemNotification: {
      type: Boolean,
      default: false,
      description: 'true = gửi cho tất cả users (broadcast), false = gửi cho cá nhân'
    }
  },
  { timestamps: true }
);

// Index để tìm kiếm nhanh theo user
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ walletAddress: 1, createdAt: -1 });
NotificationSchema.index({ isSystemNotification: 1, createdAt: -1 });

export default mongoose.model("Notification", NotificationSchema);
