// controllers/admin-notification.controller.js
import Notification from "../model/notification.js";
import UserNotification from "../model/user-notification.js";
import User from "../model/user.js";
import { sendPush } from "../services/onesignal.service.js";
import { emitBadge } from "../services/realtime.service.js";

export const createNotification = async (req, res) => {
  try {
    const io = req.app.get("io");

    const {
      title,
      body,
      target,
      userId,
      createdBy = "system"
    } = req.body;

    if (!title || !body || !target) {
      return res.status(400).send("Thiếu dữ liệu bắt buộc");
    }

    // 1️⃣ Lấy user
    const users =
      target === "USER"
        ? await User.find({ _id: userId }, "_id onesignalPlayerId")
        : await User.find({}, "_id onesignalPlayerId");

    if (!users.length) {
      return res.status(400).send("Không có user hợp lệ");
    }

    // 2️⃣ LƯU NOTIFICATION (SOURCE OF TRUTH)
    const notification = await Notification.create({
      title,
      body,
      target,
      data: { screen: "notification" },
      createdBy
    });

    // 3️⃣ LƯU USER-NOTIFICATION
    const userNotifs = users.map(u => ({
      userId: u._id,
      notificationId: notification._id
    }));

    await UserNotification.insertMany(userNotifs);

    // 4️⃣ EMIT REALTIME BADGE
    for (const u of users) {
      emitBadge(io, u._id.toString());
    }

    // 5️⃣ PUSH ONESIGNAL (ASYNC – KHÔNG BLOCK)
    sendPush({
      title,
      body,
      data: { screen: "notification" },
      playerIds:
        target === "USER"
          ? users.map(u => u.onesignalPlayerId).filter(Boolean)
          : null
    }).catch(err => {
      console.error("❌ OneSignal async failed:", err.message);
    });

    return res.redirect("/admin/notifications");

  } catch (err) {
    console.error("❌ Create notification failed:", err.message);
    return res.status(500).send("Tạo thông báo thất bại");
  }
};
