import express from 'express';
import * as itemController from '../controllers/itemdetails.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/item-details/{accessKey}/common:
 *   get:
 *     summary: Lấy chi tiết thông tin vật phẩm theo accessKey
 *     description: Trả về chi tiết ap stats của một vật phẩm cụ thể thông qua accessKey.
 *     tags: [ItemDetails]
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
 *         description: Không tìm thấy items với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:assetKey/common', itemController.getItemDetails);

/**
 * @swagger
 * /api/item-details/id/{itemID}/common:
 *   get:
 *     summary: Lấy chi tiết thông tin vật phẩm theo itemID
 *     description: Trả về chi tiết ap stats của một vật phẩm cụ thể thông qua itemID.
 *     tags: [ItemDetails]
 *     parameters:
 *       - in: path
 *         name: itemID
 *         required: true
 *         schema:
 *           type: string
 *         description: itemID duy nhất của nhân vật
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
 *         description: Không tìm thấy items với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/id/:itemID/common', itemController.getItemDetailsWithItemID);

/**
 * @swagger
 * /api/item-details/{itemId}/set:
 *   get:
 *     summary: Lấy chi tiết set vật phẩm theo itemId
 *     description: Trả về chi tiết set của một vật phẩm cụ thể thông qua itemId.
 *     tags: [ItemDetails]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID duy nhất của vật phẩm
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
 *         description: Không tìm thấy items với accessKey đã cho
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:itemId/set', itemController.getItemSet);

export default router;
