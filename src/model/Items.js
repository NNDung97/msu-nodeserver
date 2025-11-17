// src/model/Items.js
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemID: { type: Number, required: true, unique: true },
  name: String,
  link: String,
  image: String,
  type: String,
  category: String,
  slot: String,
  level: Number,
}, { timestamps: true });

ItemSchema.index({ itemID: 1 }); // 🔍 tăng tốc tìm kiếm

export default mongoose.model("Item", ItemSchema);
