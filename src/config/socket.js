// socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import UserNotification from "../model/user-notification.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  // 🔐 AUTH SOCKET
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.userId;

    // 🔹 JOIN ROOM THEO USER
    socket.join(`user:${userId}`);

    // 🔹 GỬI BADGE BAN ĐẦU
    const unreadCount = await UserNotification.countDocuments({
      userId,
      isRead: false
    });

    socket.emit("badge:update", { unreadCount });

    console.log(`🔌 User ${userId} connected socket`);
  });

  return io;
};
