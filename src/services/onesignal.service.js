// services/onesignal.service.js
import axios from "axios";

const ONE_SIGNAL_URL = "https://onesignal.com/api/v1/notifications";

export const sendPush = async ({
  title,
  body,
  data = {},
  playerIds = null
}) => {
  try {
    const payload = {
      app_id: process.env.ONESIGNAL_APP_ID,
      headings: { en: title },
      contents: { en: body },
      data
    };

    if (playerIds && playerIds.length > 0) {
      payload.include_player_ids = playerIds;
    } else {
      payload.included_segments = ["All"];
    }

    const res = await axios.post(
      ONE_SIGNAL_URL,
      payload,
      {
        headers: {
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ OneSignal push success:", res.data);
    return res.data;

  } catch (err) {
    console.error("❌ OneSignal push failed");

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error(err.message);
    }

    throw err;
  }
};
