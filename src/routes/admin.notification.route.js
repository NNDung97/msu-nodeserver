import express from "express";
import Notification from "../model/notification.js";
import { createNotification } from "../controllers/admin-notification.controller.js";

const router = express.Router();

/**
 * GET /admin/notifications
 * Màn hình quản lý thông báo
 */
router.get("/notifications", async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 });

  res.render("notifications/index", {
    notifications
  });
});

/**
 * GET /admin/notifications/create
 * Màn hình tạo thông báo
 */
router.get("/notifications/create", (req, res) => {
  res.render("notifications/create");
});

/**
 * POST /admin/notifications/create
 * Tạo thông báo mới
 */
router.post("/notifications/create", createNotification);

export default router;
