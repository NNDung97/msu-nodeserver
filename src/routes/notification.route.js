import express from 'express';
import {
  sendNotification,
  sendNotificationToAll,
  getUserNotifications,
  getUnreadNotificationsController,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  removeAllNotifications,
  getUnreadCount,
  getAllNotifications,
  migrateNotificationsController
} from '../controllers/notification.controller.js';
import path from 'path';

const router = express.Router();

// Small admin UI to create/send notifications (for quick testing)
router.get('/ui', (req, res) => {
  const filePath = path.join(process.cwd(), 'src', 'views', 'notification.html');
  res.sendFile(filePath);
});

// Notification management UI (drafts + sent)
router.get('/management/ui', (req, res) => {
  const filePath = path.join(process.cwd(), 'src', 'views', 'notificationManagement.html');
  res.sendFile(filePath);
});
/**
 * @swagger
 * /api/notification/send:
 *   post:
 *     summary: Tạo thông báo cho user
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *               - title
 *               - message
 *             properties:
 *               walletAddress:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [info, success, warning, error]
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Thông báo đã được tạo thành công
 */
router.post('/send', sendNotification);

/**
 * @swagger
 * /api/notification/all:
 *   get:
 *     summary: Lấy tất cả thông báo (admin)
 *     tags: [Notification]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Danh sách tất cả thông báo
 */
router.get('/all', getAllNotifications);

/**
 * @swagger
 * /api/notification/send-all:
 *   post:
 *     summary: Gửi thông báo cho tất cả users
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [info, success, warning, error]
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Thông báo đã được gửi cho tất cả users
 */
router.post('/send-all', sendNotificationToAll);

/**
 * @swagger
 * /api/notification/{walletAddress}/unread-count:
 *   get:
 *     summary: Đếm số thông báo chưa đọc
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Số thông báo chưa đọc
 */
router.get('/:walletAddress/unread-count', getUnreadCount);

/**
 * @swagger
 * /api/notification/{walletAddress}/unread:
 *   get:
 *     summary: Lấy thông báo chưa đọc
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Danh sách thông báo chưa đọc
 */
router.get('/:walletAddress/unread', getUnreadNotificationsController);

/**
 * @swagger
 * /api/notification/{walletAddress}:
 *   get:
 *     summary: Lấy danh sách thông báo (có phân trang)
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 */
router.get('/:walletAddress', getUserNotifications);

/**
 * @swagger
 * /api/notification/{notificationId}/read:
 *   put:
 *     summary: Đánh dấu thông báo là đã đọc
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Thông báo đã được đánh dấu
 */
router.put('/:notificationId/read', markNotificationAsRead);

/**
 * @swagger
 * /api/notification/{walletAddress}/read-all:
 *   put:
 *     summary: Đánh dấu tất cả thông báo là đã đọc
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Tất cả thông báo đã được đánh dấu
 */
router.put('/:walletAddress/read-all', markAllNotificationsAsRead);

/**
 * @swagger
 * /api/notification/{notificationId}:
 *   delete:
 *     summary: Xóa thông báo
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Thông báo đã được xóa
 */
router.delete('/:notificationId', removeNotification);

/**
 * @swagger
 * /api/notification/{walletAddress}/delete-all:
 *   delete:
 *     summary: Xóa tất cả thông báo của user
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Tất cả thông báo đã được xóa
 */
router.delete('/:walletAddress/delete-all', removeAllNotifications);

/**
 * @swagger
 * /api/notification/migrate:
 *   post:
 *     summary: Migrate thông báo cũ - thêm isSystemNotification
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Migration completed
 */
router.post('/migrate', migrateNotificationsController);

export default router;
