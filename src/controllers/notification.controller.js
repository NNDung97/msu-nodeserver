import {
  createNotification,
  createNotificationForAllUsers,
  getNotifications,
  getUnreadNotifications as getUnreadNotificationsService,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  countUnreadNotifications,
  migrateOldNotifications
} from '../services/notification.service.js';

export const sendNotification = async (req, res) => {
  try {
    const { walletAddress, title, message, type, data } = req.body;

    const notification = await createNotification({
      walletAddress,
      title,
      message,
      type,
      data
    });

    res.status(201).json({
      message: 'Thông báo đã được tạo thành công',
      notification
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const result = await getNotifications(walletAddress, parseInt(limit), parseInt(page));

    res.json({
      message: 'Lấy danh sách thông báo thành công',
      ...result
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const getUnreadNotificationsController = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const notifications = await getUnreadNotificationsService(walletAddress);

    res.json({
      message: 'Lấy thông báo chưa đọc thành công',
      count: notifications.length,
      notifications
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await markAsRead(notificationId);

    res.json({
      message: 'Thông báo đã được đánh dấu là đã đọc',
      notification
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const result = await markAllAsRead(walletAddress);

    res.json({
      message: 'Tất cả thông báo đã được đánh dấu là đã đọc',
      result
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const removeNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await deleteNotification(notificationId);

    res.json({
      message: 'Thông báo đã được xóa thành công',
      notification
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const removeAllNotifications = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const result = await deleteAllNotifications(walletAddress);

    res.json({
      message: 'Tất cả thông báo đã được xóa thành công',
      result
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const count = await countUnreadNotifications(walletAddress);

    res.json({
      message: 'Lấy số thông báo chưa đọc thành công',
      unreadCount: count
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const sendNotificationToAll = async (req, res) => {
  try {
    const { title, message, type, data } = req.body;

    const result = await createNotificationForAllUsers({
      title,
      message,
      type,
      data
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

/**
 * Lấy tất cả thông báo (admin view)
 */
export const getAllNotifications = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    
    const Notification = (await import('../model/notification.js')).default;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Notification.countDocuments();
    
    res.json({
      success: true,
      message: 'Lấy danh sách thông báo thành công',
      notifications,
      pagination: {
        total,
        limit: parseInt(limit),
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Migrate thông báo cũ - thêm isSystemNotification cho những thông báo chưa có
 */
export const migrateNotificationsController = async (req, res) => {
  try {
    const result = await migrateOldNotifications();
    res.json({
      success: true,
      message: 'Migrate thông báo thành công',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
