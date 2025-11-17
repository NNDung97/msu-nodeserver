import axios from "axios";
import * as cheerio from "cheerio";
import Boss from "../model/boss.js";
import connectDB from "../config/db.js";

const BASE_URL = "https://maplen.gg/boss";

export const crawlBossDetails = async () => {
  await connectDB();
  console.log("🚀 Bắt đầu crawl dữ liệu chi tiết Boss...");

  const bosses = await Boss.find({});
  if (!bosses.length) {
    console.log("⚠️ Không có boss nào trong database!");
    return;
  }

  let updatedCount = 0;

  for (const boss of bosses) {
    console.log(`🕷️ Crawl boss: ${boss.name} (${boss.type})`);

    // Lặp qua các độ khó của boss
    for (const difficultyName of boss.difficulties.map(d => d.name)) {
      const bossSlug = boss.name.toLowerCase().replace(/[\s-]+/g, "");
      const difficultySlug = difficultyName.toLowerCase();
      const url = `${BASE_URL}/${bossSlug}-${difficultySlug}`;

      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // 📊 Stats
        const stats = {};
        $("table tbody tr").each((_, el) => {
          const label = $(el).find("td").first().text().trim();
          const value = $(el).find("td").last().text().trim();
          if (label && value) stats[label] = value;
        });

        const level = Number(stats["Level"]) || null;
        const entryLevel = Number(stats["Entry Level"]) || null;
        const hp = stats["HP"] || null;
        const defense = stats["Defense"] || null;
        const resetType = stats["Reset Type"] || null;

        // 🎁 Rewards
        const rewards = [];
        $("div[data-slot='card-content'] a[href*='/items/']").each((_, el) => {
          const link = $(el).attr("href");
          const match = link.match(/\/items\/(\d+)/);
          const itemID = match ? Number(match[1]) : null;
          const name = $(el).attr("title")?.trim() || "Unknown";
          const image = $(el).find("img").attr("src");

          rewards.push({
            name,
            image,
            itemID,
            link: `https://maplen.gg${link}`,
          });
        });

        // 🔄 Cập nhật difficulty cụ thể
        await Boss.updateOne(
          { _id: boss._id, "difficulties.name": difficultyName },
          {
            $set: {
              "difficulties.$.level": level,
              "difficulties.$.entryLevel": entryLevel,
              "difficulties.$.hp": hp,
              "difficulties.$.defense": defense,
              "difficulties.$.resetType": resetType,
              "difficulties.$.rewards": rewards,
            },
          }
        );

        console.log(`✅ Cập nhật ${boss.name} (${difficultyName}) thành công`);
        updatedCount++;
        await new Promise((r) => setTimeout(r, 1000)); // tránh bị chặn
      } catch (err) {
        console.warn(`⚠️ Lỗi khi crawl ${url}: ${err.message}`);
      }
    }
  }

  console.log(`🎉 Hoàn tất crawl chi tiết Boss (${updatedCount} bản ghi đã cập nhật)`);
  return { updatedCount };
};
