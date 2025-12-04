import express from 'express';
import {
  getUserInfo,
  listAllUsers
} from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Lấy danh sách tất cả users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Danh sách users
 */
router.get('/all', listAllUsers);

/**
 * @swagger
 * /api/user/{walletAddress}:
 *   get:
 *     summary: Lấy thông tin user theo wallet address
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Thông tin user
 */
router.get('/:walletAddress', getUserInfo);

export default router;
