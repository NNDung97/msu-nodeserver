// services/realtime.service.js
import UserNotification from "../model/user-notification.js";

export const emitBadge = async (io, userId) => {
  const unreadCount = await UserNotification.countDocuments({
    userId,
    isRead: false
  });

  io.to(`user:${userId}`).emit("badge:update", {
    unreadCount
  });
};
