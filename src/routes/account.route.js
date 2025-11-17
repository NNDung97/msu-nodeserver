import express from 'express';
import * as accController from '../controllers/account.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/account/{walletAddress}/characters:
 *   get:
 *     summary: Lấy danh sách nhân vật của tài khoản
 *     description: Trả về danh sách nhân vật thuộc ví (walletAddress) theo từng trang.
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: Địa chỉ ví người dùng
 *       - in: query
 *         name: pageNo
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang (bắt đầu từ 1)
 *     responses:
 *       200:
 *         description: Danh sách nhân vật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "char_001"
 *                   name:
 *                     type: string
 *                     example: "Knight"
 *                   level:
 *                     type: integer
 *                     example: 25
 *                   imageUrl:
 *                     type: string
 *                     example: "https://gamecdn.com/knight.png"
 *       400:
 *         description: Thiếu tham số hoặc tham số không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:walletAddress/characters', accController.getAccountCharacters);

/**
 * @swagger
 * /api/account/{walletAddress}/currencies:
 *   get:
 *     summary: Get account currencies
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         description: The wallet address to get currencies for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of currencies for the account
 *       404:
 *         description: Account not found
 */
router.get('/:walletAddress/currencies', accController.getAccountCurrency);

/**
 * @swagger
 * /api/account/{walletAddress}/items:
 *   get:
 *     summary: Get account items
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         description: The wallet address to get items for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of items for the account
 *       404:
 *         description: Account not found
 */
router.get('/:walletAddress/items', accController.getAccountItems);

/**
 * @swagger
 * /api/account/{walletAddress}/neso:
 *   get:
 *     summary: Get account neso
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         description: The wallet address to get neso for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of neso for the account
 *       404:
 *         description: Account not found
 */
router.get('/:walletAddress/neso', accController.getAccountNeso);
export default router;