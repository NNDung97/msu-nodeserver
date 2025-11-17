import Boss from "../model/boss.js";

/**
 * Lấy danh sách Boss, sắp xếp theo Daily và Weekly
 */
export const getAllBossesOrdered = async () => {
  const bosses = await Boss.find().sort({ name: 1 });

  const dailyBosses = bosses.filter(b => b.type === "daily");
  const weeklyBosses = bosses.filter(b => b.type === "weekly");

  return {
    daily: dailyBosses,
    weekly: weeklyBosses,
  };
};
