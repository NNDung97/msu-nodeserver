import * as notificationDraftService from "../services/notificationDraft.service.js";

/**
 * Tạo thông báo nháp
 */
export const createDraftController = async (req, res) => {
  try {
    const { title, message, type, recipientType, walletAddress, data } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề và nội dung là bắt buộc"
      });
    }

    if (recipientType === "single" && !walletAddress) {
      return res.status(400).json({
        success: false,
        message: "Wallet Address là bắt buộc khi gửi cho 1 user"
      });
    }

    const draft = await notificationDraftService.createDraft({
      title,
      message,
      type: type || "info",
      recipientType: recipientType || "all",
      walletAddress: walletAddress || null,
      data: data || {},
      status: "draft"
    });

    res.status(201).json({
      success: true,
      message: "Tạo bản nháp thành công",
      draft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo bản nháp",
      error: error.message
    });
  }
};

/**
 * Lấy danh sách bản nháp
 */
export const getDraftsController = async (req, res) => {
  try {
    const { status, recipientType, limit = 20, page = 1 } = req.query;
    const filters = {};
    if (status) filters.status = status;
    if (recipientType) filters.recipientType = recipientType;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const { drafts, total } = await notificationDraftService.getAllDrafts(
      filters,
      parseInt(limit),
      skip
    );

    res.json({
      success: true,
      drafts,
      pagination: {
        total,
        limit: parseInt(limit),
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách bản nháp",
      error: error.message
    });
  }
};

/**
 * Lấy chi tiết bản nháp
 */
export const getDraftByIdController = async (req, res) => {
  try {
    const { draftId } = req.params;
    const draft = await notificationDraftService.getDraftById(draftId);

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Bản nháp không tồn tại"
      });
    }

    res.json({
      success: true,
      draft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết bản nháp",
      error: error.message
    });
  }
};

/**
 * Cập nhật bản nháp
 */
export const updateDraftController = async (req, res) => {
  try {
    const { draftId } = req.params;
    const { title, message, type, recipientType, walletAddress, data } = req.body;

    const draft = await notificationDraftService.getDraftById(draftId);
    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Bản nháp không tồn tại"
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (message) updateData.message = message;
    if (type) updateData.type = type;
    if (recipientType) updateData.recipientType = recipientType;
    if (walletAddress !== undefined) updateData.walletAddress = walletAddress;
    if (data) updateData.data = data;

    const updated = await notificationDraftService.updateDraft(draftId, updateData);

    res.json({
      success: true,
      message: "Cập nhật bản nháp thành công",
      draft: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật bản nháp",
      error: error.message
    });
  }
};

/**
 * Xóa bản nháp
 */
export const deleteDraftController = async (req, res) => {
  try {
    const { draftId } = req.params;
    const draft = await notificationDraftService.getDraftById(draftId);

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Bản nháp không tồn tại"
      });
    }

    await notificationDraftService.deleteDraft(draftId);

    res.json({
      success: true,
      message: "Xóa bản nháp thành công"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa bản nháp",
      error: error.message
    });
  }
};

/**
 * Gửi thông báo từ bản nháp
 */
export const sendDraftController = async (req, res) => {
  try {
    const { draftId } = req.params;
    const result = await notificationDraftService.sendDraft(draftId);

    res.json({
      success: true,
      message: `Gửi thông báo thành công đến ${result.totalSent} người dùng`,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi gửi thông báo",
      error: error.message
    });
  }
};

/**
 * Lấy thống kê thông báo
 */
export const getNotificationStatsController = async (req, res) => {
  try {
    const stats = await notificationDraftService.getNotificationStats();

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê",
      error: error.message
    });
  }
};
