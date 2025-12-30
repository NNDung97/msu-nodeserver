// models/notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },

  data: {
    type: Object,        // deepLink, screen, payload
    default: {}
  },

  target: {
    type: String,
    enum: ["ALL", "USER"],
    default: "ALL"
  },

  createdBy: {
    type: String,        // admin id
    default: "system"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Notification", NotificationSchema);
