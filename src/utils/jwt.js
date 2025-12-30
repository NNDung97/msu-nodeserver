// utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) =>
  jwt.sign(
    {
      userId: user._id,
      walletAddress: user.walletAddress,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

export const generateRefreshToken = (user) =>
  jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
