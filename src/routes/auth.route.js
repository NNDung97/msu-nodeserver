import express from 'express';
import {
  loginWallet,
  refreshToken,
} from '../controllers/auth.controller.js';

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
 *         description: Đăng nhập thành công
 *       400:
 *         description: Wallet address is required
 *       401:
 *         description: Wallet không tồn tại bên thứ 3
 */
router.post('/login-wallet', loginWallet);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Gia hạn access token bằng refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token hợp lệ
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *     responses:
 *       200:
 *         description: Gia hạn token thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Refresh token is required
 *       403:
 *         description: Refresh token không hợp lệ hoặc hết hạn
 */
router.post('/auth/refresh-token', refreshToken);

export default router;
