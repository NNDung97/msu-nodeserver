import express from "express";
import * as controller from "../controllers/notificationDraft.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notification Draft
 *     description: Quản lý bản nháp thông báo
 */

/**
 * @swagger
 * /api/notification-draft:
 *   post:
 *     tags:
 *       - Notification Draft
 *     summary: Tạo bản nháp thông báo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Bảo trì hệ thống"
 *               message:
 *                 type: string
 *                 example: "Hệ thống sẽ bảo trì vào lúc 22:00"
 *               type:
 *                 type: string
 *                 enum: [info, success, warning, error]
 *               recipientType:
 *                 type: string
 *                 enum: [single, all]
 *               walletAddress:
 *                 type: string
 *                 example: "0x123..."
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post("/", controller.createDraftController);

/**
 * @swagger
 * /api/notification-draft:
 *   get:
 *     tags:
 *       - Notification Draft
 *     summary: Lấy danh sách bản nháp
 *     parameters:
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [draft, scheduled, sent]
 *       - name: recipientType
 *         in: query
 *         schema:
 *           type: string
 *           enum: [single, all]
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Danh sách bản nháp
 */
router.get("/", controller.getDraftsController);

/**
 * @swagger
 * /api/notification-draft/stats:
 *   get:
 *     tags:
 *       - Notification Draft
 *     summary: Lấy thống kê thông báo
 *     responses:
 *       200:
 *         description: Thống kê
 */
router.get("/stats", controller.getNotificationStatsController);

/**
 * @swagger
 * /api/notification-draft/{draftId}:
 *   get:
 *     tags:
 *       - Notification Draft
 *     summary: Lấy chi tiết bản nháp
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết bản nháp
 */
router.get("/:draftId", controller.getDraftByIdController);

/**
 * @swagger
 * /api/notification-draft/{draftId}:
 *   put:
 *     tags:
 *       - Notification Draft
 *     summary: Cập nhật bản nháp
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:draftId", controller.updateDraftController);

/**
 * @swagger
 * /api/notification-draft/{draftId}:
 *   delete:
 *     tags:
 *       - Notification Draft
 *     summary: Xóa bản nháp
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:draftId", controller.deleteDraftController);

/**
 * @swagger
 * /api/notification-draft/{draftId}/send:
 *   post:
 *     tags:
 *       - Notification Draft
 *     summary: Gửi thông báo từ bản nháp
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gửi thành công
 */
router.post("/:draftId/send", controller.sendDraftController);

export default router;
