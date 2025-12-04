import Notification from '../model/notification.js';
import User from '../model/user.js';

/**
 * Tạo thông báo cho user (cá nhân)
 * @param {Object} notificationData - Dữ liệu thông báo
 * @param {String} notificationData.walletAddress - Wallet address của user
 * @param {String} notificationData.title - Tiêu đề thông báo
 * @param {String} notificationData.message - Nội dung thông báo
 * @param {String} notificationData.type - Loại thông báo (info, success, warning, error)
 * @param {Object} notificationData.data - Dữ liệu bổ sung (optional)
 * @returns {Promise<Object>} Notification object
 */
export const createNotification = async (notificationData) => {
  try {
    const { walletAddress, title, message, type = 'info', data = {} } = notificationData;

    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    if (!title || !message) {
      throw new Error('Title and message are required');
    }

    // Tìm user bằng wallet address
    const user = await User.findOne({ walletAddress });

    if (!user) {
      throw new Error('User not found');
    }

    // Tạo thông báo mới (thông báo cá nhân)
    const notification = new Notification({
      userId: user._id,
      walletAddress,
      title,
      message,
      type,
      data,
      isSystemNotification: false  // Đánh dấu là thông báo cá nhân
    });

    await notification.save();
    return notification;
  } catch (error) {
    throw new Error(`Lỗi tạo thông báo: ${error.message}`);
  }
};

/**
 * Lấy danh sách thông báo của user
 * @param {String} walletAddress - Wallet address của user
 * @param {Number} limit - Giới hạn số lượng (default: 20)
 * @param {Number} page - Trang (default: 1)
 * @returns {Promise<Object>} Danh sách thông báo và thông tin pagination
 */
export const getNotifications = async (walletAddress, limit = 20, page = 1) => {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ walletAddress })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ walletAddress });

    return {
      notifications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw new Error(`Lỗi lấy thông báo: ${error.message}`);
  }
};

/**
 * Lấy thông báo chưa đọc
 * @param {String} walletAddress - Wallet address của user
 * @returns {Promise<Array>} Danh sách thông báo chưa đọc
 */
export const getUnreadNotifications = async (walletAddress) => {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const notifications = await Notification.find({
      walletAddress,
      isRead: false
    }).sort({ createdAt: -1 });

    return notifications;
  } catch (error) {
    throw new Error(`Lỗi lấy thông báo chưa đọc: ${error.message}`);
  }
};

/**
 * Đánh dấu thông báo là đã đọc
 * @param {String} notificationId - ID của thông báo
 * @returns {Promise<Object>} Notification object
 */
export const markAsRead = async (notificationId) => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required');
    }

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  } catch (error) {
    throw new Error(`Lỗi đánh dấu thông báo: ${error.message}`);
  }
};

/**
 * Đánh dấu tất cả thông báo là đã đọc
 * @param {String} walletAddress - Wallet address của user
 * @returns {Promise<Object>} Kết quả cập nhật
 */
export const markAllAsRead = async (walletAddress) => {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const result = await Notification.updateMany(
      { walletAddress, isRead: false },
      {
        isRead: true,
        readAt: new Date()
      }
    );

    return result;
  } catch (error) {
    throw new Error(`Lỗi đánh dấu tất cả thông báo: ${error.message}`);
  }
};

/**
 * Xóa thông báo
 * @param {String} notificationId - ID của thông báo
 * @returns {Promise<Object>} Thông báo đã xóa
 */
export const deleteNotification = async (notificationId) => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required');
    }

    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  } catch (error) {
    throw new Error(`Lỗi xóa thông báo: ${error.message}`);
  }
};

/**
 * Xóa tất cả thông báo của user
 * @param {String} walletAddress - Wallet address của user
 * @returns {Promise<Object>} Kết quả xóa
 */
export const deleteAllNotifications = async (walletAddress) => {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const result = await Notification.deleteMany({ walletAddress });

    return result;
  } catch (error) {
    throw new Error(`Lỗi xóa tất cả thông báo: ${error.message}`);
  }
};

/**
 * Đếm số thông báo chưa đọc
 * @param {String} walletAddress - Wallet address của user
 * @returns {Promise<Number>} Số thông báo chưa đọc
 */
export const countUnreadNotifications = async (walletAddress) => {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const count = await Notification.countDocuments({
      walletAddress,
      isRead: false
    });

    return count;
  } catch (error) {
    throw new Error(`Lỗi đếm thông báo chưa đọc: ${error.message}`);
  }
};

/**
 * T?o th�ng b�o cho t?t c? users
 * @param {Object} notificationData - D? li?u th�ng b�o
 * @param {String} notificationData.title - Ti�u d? th�ng b�o
 * @param {String} notificationData.message - N?i dung th�ng b�o
 * @param {String} notificationData.type - Lo?i th�ng b�o (info, success, warning, error)
 * @param {Object} notificationData.data - D? li?u b? sung (optional)
 * @returns {Promise<Object>} K?t qu? g?i cho t?t c? users
 */
export const createNotificationForAllUsers = async (notificationData) => {
  try {
    const { title, message, type = 'info', data = {} } = notificationData;

    if (!title || !message) {
      throw new Error('Title and message are required');
    }

    // Lấy tất cả users
    const users = await User.find({});

    if (users.length === 0) {
      throw new Error('No users found');
    }

    // Tạo thông báo hệ thống cho mỗi user
    const notifications = await Promise.all(
      users.map((user) =>
        Notification.create({
          userId: user._id,
          walletAddress: user.walletAddress,
          title,
          message,
          type,
          data,
          isSystemNotification: true  // Đánh dấu là thông báo hệ thống (broadcast)
        })
      )
    );

    return {
      message: 'Thông báo hệ thống đã được gửi cho tất cả users',
      totalUsers: users.length,
      notificationCount: notifications.length,
      notifications
    };
  } catch (error) {
    throw new Error(`Lỗi gửi thông báo cho tất cả users: ${error.message}`);
  }
};

/**
 * Migrate thông báo cũ - thêm isSystemNotification cho những thông báo chưa có
 */
export const migrateOldNotifications = async () => {
  try {
    const result = await Notification.updateMany(
      { isSystemNotification: { $exists: false } },
      { $set: { isSystemNotification: true } }  // Mặc định các thông báo cũ là thông báo hệ thống
    );
    return result;
  } catch (error) {
    throw new Error(`Lỗi migrate thông báo: ${error.message}`);
  }
};
