// src/routes/crawler.route.js
import express from "express";
import { runCrawler } from "../controllers/itemscrawler.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/itemscrawler/run:
 *   get:
 *     summary: Chạy crawler lấy dữ liệu item từ maplen.gg
 *     description: Gọi API này để khởi động quá trình crawl dữ liệu item từ maplen.gg và lưu vào MongoDB.
 *     tags: [Crawler]
 *     responses:
 *       200:
 *         description: Crawl hoàn tất thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Crawl completed successfully
 *       500:
 *         description: Lỗi trong quá trình crawl.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Crawler failed
 *                 error:
 *                   type: string
 *                   example: Lỗi kết nối MongoDB
 */
router.get("/run", runCrawler);

export default router;
