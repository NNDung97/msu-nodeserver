// controllers/notification.controller.js
import UserNotification from "../model/user-notification.js";

export const getNotifications = async (req, res) => {
  const userId = req.user.userId;

  const [items, unreadCount] = await Promise.all([
    UserNotification.find({ userId })
      .populate("notificationId")
      .sort({ deliveredAt: -1 })
      .limit(50),

    UserNotification.countDocuments({
      userId,
      isRead: false
    })
  ]);

  res.json({
    unreadCount,
    notifications: items.map(i => ({
      id: i._id,
      title: i.notificationId.title,
      body: i.notificationId.body,
      isRead: i.isRead,
      createdAt: i.notificationId.createdAt,
      data: i.notificationId.data
    }))
  });
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;        // lấy từ JWT middleware
    const notificationId = req.params.id;

    const result = await UserNotification.updateOne(
      { _id: notificationId, userId },
      {
        $set: {
          isRead: true,
          readAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.userId;        // lấy từ JWT middleware
    await UserNotification.updateMany(
      { userId, isRead: false },
      {
        $set: {
          isRead: true,
          readAt: new Date()
        }
      }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  const userId = req.user.userId;

  const count = await UserNotification.countDocuments({
    userId,
    isRead: false
  });

  res.json({ count });
};

export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user.userId;        // lấy từ JWT middleware
    const notificationId = req.params.id;

    const result = await UserNotification.deleteOne({
      _id: notificationId,
      userId
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};