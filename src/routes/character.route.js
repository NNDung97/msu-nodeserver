import express from 'express';
import * as charController from '../controllers/characterdetail.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/character/{accessKey}:
 *   get:
 *     summary: Lấy chi tiết thông tin nhân vật theo accessKey
 *     description: Trả về chi tiết của một nhân vật cụ thể thông qua accessKey.
 *     tags: [Character]
 *     parameters:
 *       - in: path
 *         name: accessKey
 *         required: true
 *         schema:
 *           type: string
 *         description: accessKey duy nhất của nhân vật
 *     responses:
 *       200:
 *         description: Thông tin chi tiết nhân vật được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: KemPhoMaiCry
 *                     level:
 *                       type: integer
 *                       example: 184
 *                     imageUrl:
 *                       type: string
 *                       example: https://market-static.msu.io/msu/platform/charimages/transient/example.png
 *                     jobCode:
 *                       type: integer
 *                       example: 122
 *                     expr:
 *                       type: string
 *                       example: "5.653"
 *       404:
 *         description: Không tìm thấy nhân vật với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:accessKey', charController.getCharacterDetails);

/**
 * @swagger
 * /api/character/{accessKey}/wearing:
 *   get:
 *     summary: Lấy chi tiết thông tin nhân vật theo accessKey
 *     description: Trả về chi tiết trang bị của một nhân vật cụ thể thông qua accessKey.
 *     tags: [Character]
 *     parameters:
 *       - in: path
 *         name: accessKey
 *         required: true
 *         schema:
 *           type: string
 *         description: accessKey duy nhất của nhân vật
 *     responses:
 *       200:
 *         description: Thông tin chi tiết nhân vật được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: KemPhoMaiCry
 *                     level:
 *                       type: integer
 *                       example: 184
 *                     imageUrl:
 *                       type: string
 *                       example: https://market-static.msu.io/msu/platform/charimages/transient/example.png
 *                     jobCode:
 *                       type: integer
 *                       example: 122
 *                     expr:
 *                       type: string
 *                       example: "5.653"
 *       404:
 *         description: Không tìm thấy nhân vật với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:accessKey/wearing', charController.getCharacterEquipment);

/**
 * @swagger
 * /api/character/{accessKey}/hyper-stat:
 *   get:
 *     summary: Lấy chi tiết thông tin nhân vật theo accessKey
 *     description: Trả về chi tiết hyper stats của một nhân vật cụ thể thông qua accessKey.
 *     tags: [Character]
 *     parameters:
 *       - in: path
 *         name: accessKey
 *         required: true
 *         schema:
 *           type: string
 *         description: accessKey duy nhất của nhân vật
 *     responses:
 *       200:
 *         description: Thông tin chi tiết nhân vật được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: KemPhoMaiCry
 *                     level:
 *                       type: integer
 *                       example: 184
 *                     imageUrl:
 *                       type: string
 *                       example: https://market-static.msu.io/msu/platform/charimages/transient/example.png
 *                     jobCode:
 *                       type: integer
 *                       example: 122
 *                     expr:
 *                       type: string
 *                       example: "5.653"
 *       404:
 *         description: Không tìm thấy nhân vật với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:accessKey/hyper-stat', charController.getCharacterHyperStats);

/**
 * @swagger
 * /api/character/{accessKey}/ap-stat:
 *   get:
 *     summary: Lấy chi tiết thông tin nhân vật theo accessKey
 *     description: Trả về chi tiết ap stats của một nhân vật cụ thể thông qua accessKey.
 *     tags: [Character]
 *     parameters:
 *       - in: path
 *         name: accessKey
 *         required: true
 *         schema:
 *           type: string
 *         description: accessKey duy nhất của nhân vật
 *     responses:
 *       200:
 *         description: Thông tin chi tiết nhân vật được trả về thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: KemPhoMaiCry
 *                     level:
 *                       type: integer
 *                       example: 184
 *                     imageUrl:
 *                       type: string
 *                       example: https://market-static.msu.io/msu/platform/charimages/transient/example.png
 *                     jobCode:
 *                       type: integer
 *                       example: 122
 *                     expr:
 *                       type: string
 *                       example: "5.653"
 *       404:
 *         description: Không tìm thấy nhân vật với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:accessKey/ap-stat', charController.getCharacterApStats);

export default router;