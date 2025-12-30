import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  deleteNotification
} from "../controllers/notification.controller.js";

import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API quản lý thông báo của người dùng
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Lấy danh sách thông báo của user
 *     description: Trả về danh sách thông báo của user, sắp xếp từ mới đến cũ
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       message:
 *                         type: string
 *                       isRead:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get("/notifications", authorize, getNotifications);

/**
 * @swagger
 * /api/notifications/unread-count:
 *   get:
 *     summary: Lấy số lượng thông báo chưa đọc
 *     description: Dùng để hiển thị badge thông báo realtime
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Số lượng thông báo chưa đọc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unreadCount:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized
 */
router.get("/notifications/unread-count", authorize, getUnreadCount);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Đánh dấu một thông báo là đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Đánh dấu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Không tìm thấy thông báo
 *       401:
 *         description: Unauthorized
 */
router.patch("/notifications/:id/read", authorize, markAsRead);

/**
 * @swagger
 * /api/notifications/read-all:
 *   patch:
 *     summary: Đánh dấu tất cả thông báo là đã đọc
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đã đánh dấu tất cả thông báo là đã đọc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 */
router.patch("/notifications/read-all", authorize, markAllAsRead);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Xoá một thông báo của user
 *     description: |
 *       Xoá notification theo ID.
 *       Chỉ user sở hữu notification mới có quyền xoá.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của notification
 *     responses:
 *       200:
 *         description: Xoá thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       404:
 *         description: Notification không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification not found
 *       500:
 *         description: Lỗi server
 */
router.delete(
  "/notifications/:id",
  authorize,
  deleteNotification
);

export default router;
