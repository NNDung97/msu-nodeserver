import axios from "axios";
import * as cheerio from "cheerio";
import Item from "../model/Items.js";
import connectDB from "../config/db.js";

const BASE_URL = "https://maplen.gg/items";

export const crawlMaplenItems = async () => {
  await connectDB();
  console.log("🚀 Bắt đầu crawl dữ liệu từ Maple.gg...");

  let currentPage = 1;
  let totalItems = 0;
  let newItems = 0;
  let updatedItems = 0;
  let lastPageIDs = []; // lưu danh sách ID của trang trước

  while (true) {
    const url = `${BASE_URL}?page=${currentPage}`;
    console.log(`🔍 Trang ${currentPage}: ${url}`);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const items = $("a.group.block");

    if (items.length === 0) {
      console.log("✅ Hết dữ liệu, không còn item!");
      break;
    }

    // 👉 Lấy danh sách ID của trang hiện tại
    const currentPageIDs = [];
    const bulkOps = [];

    for (const el of items) {
      const link = $(el).attr("href");
      if (!link) continue;

      const match = link.match(/\/items\/(\d+)/);
      const itemID = match ? Number(match[1]) : null;
      if (!itemID) continue;

      currentPageIDs.push(itemID);

      const name = $(el).find("div[data-slot='card-title']").text().trim();
      const image = $(el).find("img").attr("src");

      const badges = $(el)
        .find("span[data-slot='badge']")
        .map((_, span) => $(span).text().trim())
        .get();
      const [type, category, slot] = badges;

      const level = $(el)
        .find("div.bg-muted\\/50 span")
        .text()
        .replace("Lv.", "")
        .replace("+", "")
        .trim();

      const itemData = {
        itemID,
        name,
        link: `https://maplen.gg${link}`,
        image,
        type: type || null,
        category: category || null,
        slot: slot || null,
        level: Number(level) || null,
      };

      bulkOps.push({
        updateOne: {
          filter: { itemID },
          update: { $set: itemData },
          upsert: true,
        },
      });
    }

    // 🔍 So sánh trang hiện tại và trang trước
    if (JSON.stringify(currentPageIDs) === JSON.stringify(lastPageIDs)) {
      console.log("✅ Phát hiện trùng nội dung trang trước → dừng crawl!");
      break;
    }

    lastPageIDs = currentPageIDs; // cập nhật lại danh sách ID của trang vừa crawl

    // Ghi dữ liệu vào Mongo
    if (bulkOps.length > 0) {
      const result = await Item.bulkWrite(bulkOps);
      const pageNew = result.upsertedCount || 0;
      const pageUpdated = result.modifiedCount || 0;
      newItems += pageNew;
      updatedItems += pageUpdated;
      totalItems += bulkOps.length;
    }

    console.log(
      `✅ Trang ${currentPage} xong (${totalItems} tổng, mới: ${newItems}, cập nhật: ${updatedItems})`
    );

    currentPage++;
    await new Promise((r) => setTimeout(r, 800)); // tránh bị block
  }

  console.log(
    `🎉 Hoàn tất crawl: ${totalItems} item (mới: ${newItems}, cập nhật: ${updatedItems})`
  );

  return { totalItems, newItems, updatedItems };
};
