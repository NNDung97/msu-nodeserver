import mongoose from "mongoose";

const NotificationDraftSchema = new mongoose.Schema(
  {
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
    recipientType: {
      type: String,
      enum: ['single', 'all'],
      default: 'all'
    },
    walletAddress: {
      type: String,
      default: null
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'sent'],
      default: 'draft'
    },
    scheduledTime: {
      type: Date,
      default: null
    },
    sentAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Index để tìm kiếm nhanh theo trạng thái
NotificationDraftSchema.index({ status: 1, createdAt: -1 });
NotificationDraftSchema.index({ recipientType: 1, createdAt: -1 });

export default mongoose.model("NotificationDraft", NotificationDraftSchema);
