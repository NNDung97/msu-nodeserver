import express from "express";
import { handleGetAllItems, findItemByName } from "../controllers/items.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Lấy danh sách tất cả items
 *     description: Trả về danh sách items được crawl từ Maple.gg (có thể lọc, phân trang)
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang cần lấy (mặc định = 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số item mỗi trang (mặc định = 20)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Lọc theo tên item (gần đúng, không phân biệt hoa thường)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Lọc theo loại item (type)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Lọc theo category
 *       - in: query
 *         name: slot
 *         schema:
 *           type: string
 *         description: Lọc theo slot
 *     responses:
 *       200:
 *         description: Trả về danh sách item từ MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemID:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       category:
 *                         type: string
 *                       slot:
 *                         type: string
 *                       level:
 *                         type: integer
 */
router.get("/", handleGetAllItems);

/**
 * @swagger
 * /api/items/search:
 *   get:
 *     summary: Tìm kiếm item theo tên (có phân trang)
 *     description: Tìm kiếm gần đúng (không phân biệt hoa thường) item theo tên, có hỗ trợ phân trang.
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Tên hoặc một phần tên của item cần tìm.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Số lượng item mỗi trang.
 *     responses:
 *       200:
 *         description: Danh sách item tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemID:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       category:
 *                         type: string
 *                       slot:
 *                         type: string
 *                       level:
 *                         type: integer
 *                       link:
 *                         type: string
 *                       image:
 *                         type: string
 *       400:
 *         description: Thiếu tham số ?name=
 *       404:
 *         description: Không tìm thấy item nào
 */
router.get("/search", findItemByName);

export default router;
