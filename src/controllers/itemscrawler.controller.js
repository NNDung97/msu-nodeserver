import { crawlMaplenItems } from "../crawler/itemscrawler.js";

export const runCrawler = async (req, res) => {
  try {
    const total = await crawlMaplenItems();
    res.status(200).json({
      message: `✅ Crawl completed successfully`,
      totalItems: total,
    });
  } catch (err) {
    console.error("Crawler error:", err);
    res.status(500).json({
      message: "❌ Crawler failed",
      error: err.message,
    });
  }
};
