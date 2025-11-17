import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema({
  name: String,
  image: String,
  itemID: Number,
  link: String,
});

const DifficultySchema = new mongoose.Schema({
  name: String, // e.g., "Easy", "Normal"
  level: Number,
  entryLevel: Number,
  hp: String,          // HP có thể dạng "4,787,520"
  defense: String,     // dạng "25%"
  resetType: String,   // Daily / Weekly
  rewards: [RewardSchema],
});

const BossSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["daily", "weekly"], required: true },
    image: { type: String },
    link: { type: String },
    difficulties: [DifficultySchema],
  },
  { timestamps: true }
);

export default mongoose.models.Boss || mongoose.model("Boss", BossSchema);