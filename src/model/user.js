import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    walletAddress: { 
      type: String, 
      required: true, 
      unique: true,
      // lowercase: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    displayName: {
      type: String,
      trim: true
    },
    avatar: {
      type: String
    },
    refreshToken: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    },
    loginCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
