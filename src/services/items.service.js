import Item from "../model/Items.js";

export const getAllItems = async (query = {}) => {
  try {
    const filter = {};

    // 🔍 Tùy chọn lọc
    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }
    if (query.type) filter.type = query.type;
    if (query.category) filter.category = query.category;
    if (query.slot) filter.slot = query.slot;

    // 🧮 Tùy chọn phân trang
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 15;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Item.find(filter)
        .sort({ itemID: 1 })
        .skip(skip)
        .limit(limit),
      Item.countDocuments(filter),
    ]);

    return {
      success: true,
      data: items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("❌ Lỗi trong getAllItems:", error);
    throw error;
  }
};

export const getItemByName = async (name, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const query = {
    name: { $regex: name, $options: "i" },
  };

  const [items, total] = await Promise.all([
    Item.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ level: -1 }), // sắp xếp item theo level giảm dần
    Item.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    items,
    total,
    totalPages,
    currentPage: page,
  };
};
