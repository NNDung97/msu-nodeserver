import * as itemservice from "../services/items.service.js";

export const handleGetAllItems = async (req, res) => {
  try {
    const result = await itemservice.getAllItems(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const findItemByName = async (req, res) => {
  try {
    const { name, page = 1, limit = 15 } = req.query;

    if (!name) {
      return res.status(400).json({ message: "Thiếu tham số ?name=" });
    }

    const result = await itemservice.getItemByName(name, Number(page), Number(limit));

    if (result.total === 0) {
      return res.status(404).json({ message: "Không tìm thấy item nào" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Lỗi khi tìm item:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};