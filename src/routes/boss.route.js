import express from "express";
import * as bossController from "../controllers/boss.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bosses
 *   description: API quản lý boss trong Maple.gg
 */

/**
 * @swagger
 * /api/boss:
 *   get:
 *     summary: Lấy danh sách boss (phân loại daily và weekly)
 *     tags: [Bosses]
 *     responses:
 *       200:
 *         description: Trả về danh sách boss được nhóm theo daily và weekly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 daily:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Boss'
 *                 weekly:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Boss'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Reward:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Red Florin"
 *         image:
 *           type: string
 *           example: "https://api-static.msu.io/itemimages/icon/4310403.png"
 *         itemID:
 *           type: integer
 *           example: 4310403
 *         link:
 *           type: string
 *           example: "https://maplen.gg/items/4310403"

 *     Difficulty:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Easy"
 *         level:
 *           type: integer
 *           example: 65
 *         entryLevel:
 *           type: integer
 *           example: 65
 *         rewards:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Reward'

 *     Boss:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Balrog"
 *         type:
 *           type: string
 *           enum: [daily, weekly]
 *           example: "daily"
 *         image:
 *           type: string
 *           example: "https://maplen.gg/_next/image?url=%2Fimages%2Fbosses%2Fbalrog.png"
 *         link:
 *           type: string
 *           example: "https://maplen.gg/boss/balrog"
 *         difficulties:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Difficulty'
 */

router.get("/", bossController.getBossList);

/**
 * @swagger
 * /api/boss/crawl:
 *   get:
 *     summary: Crawl dữ liệu boss từ trang maplen.gg
 *     tags: [Crawler]
 *     responses:
 *       200:
 *         description: Crawl thành công
 *       500:
 *         description: Lỗi khi crawl dữ liệu
 */
router.get("/crawl", bossController.runBossCrawler);

/**
 * @swagger
 * /api/boss/crawl/detail:
 *   get:
 *     summary: Crawl chi tiết từng Boss (Level, Entry Level, Rewards)
 *     tags: [Crawler]
 *     responses:
 *       200:
 *         description: Crawl chi tiết Boss thành công
 */
router.get("/crawl/detail", bossController.runBossDetailCrawler);

export default router;
