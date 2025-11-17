// crawler/bosscrawler.js
import axios from "axios";
import * as cheerio from "cheerio";
import Boss from "../model/Boss.js";
import connectDB from "../config/db.js";

const BASE_URL = "https://maplen.gg/boss";

export const crawlMaplenBosses = async () => {
    await connectDB();
    console.log("🚀 Bắt đầu crawl dữ liệu Bosses từ Maple.gg...");

    const { data } = await axios.get(BASE_URL);
    const $ = cheerio.load(data);

    const results = [];

    // --- Helper để parse từng section ---
    function parseSection(sectionTitle, type) {
        const section = $(`h2:contains("${sectionTitle}")`).next("div");
        section.find('[data-slot="card"]').each((_, el) => {
            const name = $(el).find('[data-slot="card-title"] span').text().trim();
            const image = $(el).find("img").attr("src");
            const difficulties = [];

            $(el)
                .find('[data-slot="card-content"] a')
                .each((_, diffEl) => {
                    const diffName = $(diffEl).text().trim();
                    difficulties.push({
                        name: diffName,
                        level: null,
                        entryLevel: null,
                        rewards: [],
                    });
                });


            results.push({
                name,
                image: image ? `https://maplen.gg${image}` : null,
                type,
                difficulties,
            });
        });
    }

    parseSection("Daily Bosses", "daily");
    parseSection("Weekly Bosses", "weekly");

    // --- Lưu vào Mongo ---
    let newBosses = 0;
    let updatedBosses = 0;

    for (const boss of results) {
        const res = await Boss.findOneAndUpdate(
            { name: boss.name, type: boss.type },
            boss,
            { upsert: true, new: true }
        );

        if (res.wasNew) newBosses++;
        else updatedBosses++;
    }

    console.log(
        `🎉 Crawl hoàn tất: ${results.length} boss (mới: ${newBosses}, cập nhật: ${updatedBosses})`
    );

    return {
        total: results.length,
        new: newBosses,
        updated: updatedBosses,
    };
};
