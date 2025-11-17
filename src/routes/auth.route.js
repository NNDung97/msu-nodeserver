import express from 'express';
import { loginWallet } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/login-wallet:
 *   post:
 *     summary: Login bằng wallet address
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *             properties:
 *               walletAddress:
 *                 type: string
 *                 description: Địa chỉ ví cần đăng nhập
 *                 example: "0x45e6D7e98D95bc1fD42E133668ff51dD8BdCbeff"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công, trả về token và profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *                 profile:
 *                   type: object
 *                   example: { "character": "warrior", "level": 10 }
 *       400:
 *         description: Wallet address is required
 *       401:
 *         description: Wallet không tồn tại bên thứ 3
 */
router.post('/login-wallet', loginWallet);

export default router;
