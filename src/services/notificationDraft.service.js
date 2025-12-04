import NotificationDraft from "../model/notificationDraft.js";
import Notification from "../model/notification.js";
import User from "../model/user.js";

/**
 * Tạo thông báo nháp (draft)
 */
export const createDraft = async (draftData) => {
  const draft = new NotificationDraft(draftData);
  return await draft.save();
};

/**
 * Lấy danh sách tất cả bản nháp
 */
export const getAllDrafts = async (filters = {}, limit = 20, skip = 0) => {
  const query = { ...filters };
  const drafts = await NotificationDraft.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
  const total = await NotificationDraft.countDocuments(query);
  return { drafts, total };
};

/**
 * Lấy thông báo nháp theo ID
 */
export const getDraftById = async (draftId) => {
  return await NotificationDraft.findById(draftId);
};

/**
 * Cập nhật thông báo nháp
 */
export const updateDraft = async (draftId, updateData) => {
  return await NotificationDraft.findByIdAndUpdate(
    draftId,
    { $set: updateData },
    { new: true }
  );
};

/**
 * Xóa thông báo nháp
 */
export const deleteDraft = async (draftId) => {
  return await NotificationDraft.findByIdAndDelete(draftId);
};

/**
 * Gửi thông báo từ nháp
 */
export const sendDraft = async (draftId) => {
  const draft = await NotificationDraft.findById(draftId);
  if (!draft) throw new Error("Draft không tồn tại");

  const notifications = [];

  if (draft.recipientType === "single" && draft.walletAddress) {
    // Gửi cho 1 user (thông báo cá nhân)
    const user = await User.findOne({ walletAddress: draft.walletAddress });
    if (user) {
      const notification = new Notification({
        userId: user._id,
        walletAddress: draft.walletAddress,
        title: draft.title,
        message: draft.message,
        type: draft.type,
        data: draft.data,
        isSystemNotification: false  // Thông báo cá nhân
      });
      const saved = await notification.save();
      notifications.push(saved);
    }
  } else if (draft.recipientType === "all") {
    // Gửi cho tất cả user (thông báo hệ thống)
    const users = await User.find({ isActive: true });
    const notificationPromises = users.map(user =>
      new Notification({
        userId: user._id,
        walletAddress: user.walletAddress,
        title: draft.title,
        message: draft.message,
        type: draft.type,
        data: draft.data,
        isSystemNotification: true  // Thông báo hệ thống (broadcast)
      }).save()
    );
    const savedNotifications = await Promise.all(notificationPromises);
    notifications.push(...savedNotifications);
  }

  // Cập nhật draft thành "sent"
  await NotificationDraft.findByIdAndUpdate(draftId, {
    status: "sent",
    sentAt: new Date()
  });

  return {
    totalSent: notifications.length,
    notifications
  };
};

/**
 * Lấy thống kê thông báo
 */
export const getNotificationStats = async () => {
  const [
    totalDrafts,
    draftCount,
    scheduledCount,
    sentCount,
    totalNotifications
  ] = await Promise.all([
    NotificationDraft.countDocuments(),
    NotificationDraft.countDocuments({ status: "draft" }),
    NotificationDraft.countDocuments({ status: "scheduled" }),
    NotificationDraft.countDocuments({ status: "sent" }),
    Notification.countDocuments()
  ]);

  return {
    totalDrafts,
    draftCount,
    scheduledCount,
    sentCount,
    totalNotifications
  };
};
