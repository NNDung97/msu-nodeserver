// controllers/bossController.js
import { crawlMaplenBosses } from "../crawler/bosscrawler.js";
import { crawlBossDetails } from "../crawler/bossDetailCrawler.js";
import * as BossService from "../services/boss.service.js";

export const runBossCrawler = async (req, res) => {
  try {
    const result = await crawlMaplenBosses();
    res.status(200).json({
      message: "✅ Boss crawler completed successfully",
      stats: result,
    });
  } catch (err) {
    console.error("❌ Boss crawler error:", err);
    res.status(500).json({
      message: "Crawler failed",
      error: err.message,
    });
  }
};

export const runBossDetailCrawler = async (req, res) => {
  try {
    const result = await crawlBossDetails();
    res.status(200).json({
      message: "✅ Crawl chi tiết Boss thành công",
      ...result,
    });
  } catch (err) {
    console.error("Crawler error:", err);
    res.status(500).json({
      message: "❌ Lỗi khi crawl chi tiết Boss",
      error: err.message,
    });
  }
};

/**
 * Lấy danh sách boss đã lưu trong DB (được phân loại daily / weekly)
 */
export const getBossList = async (req, res) => {
  try {
    const bosses = await BossService.getAllBossesOrdered();
    res.status(200).json({
      message: "✅ Lấy danh sách boss thành công",
      data: bosses,
    });
  } catch (err) {
    console.error("Get Boss List Error:", err);
    res.status(500).json({
      message: "❌ Không thể lấy danh sách boss",
      error: err.message,
    });
  }
};
