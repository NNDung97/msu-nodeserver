import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import { saveOrUpdateUser } from './user.service.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt.js';

/**
 * LOGIN WITH WALLET
 */
export const loginWithWallet = async (walletAddress) => {
  console.log('check walletAddress',walletAddress);
  
  const url = `${process.env.MSU_URL}/accounts/${walletAddress}/characters`;

  try {
    // 1️⃣ Validate wallet qua API bên thứ 3
    const { data } = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY,
      },
    });

    console.log('check data',data);
    // const characters = Array.isArray(data) ? data : [];
    const characters = data.data;

    // 2️⃣ Save / update user
    const user = await saveOrUpdateUser({ walletAddress });

    if (!user || !user.isActive) {
      throw new Error('User is disabled');
    }

    // 3️⃣ Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 4️⃣ Save refresh token (rotate on login)
    user.refreshToken = refreshToken;
    await user.save();

    return {
      userId: user._id,
      accessToken,
      refreshToken,
      characters,
      user
    };
  } catch (error) {
    console.error('[loginWithWallet]', error.response?.data || error.message);
    throw error;
  }
};

/**
 * REFRESH TOKEN
 */
export const refreshTokenService = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    // 1️⃣ Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // 2️⃣ Find user & validate token in DB
    const user = await User.findById(decoded.userId);

    console.log('Equal:', user.refreshToken === refreshToken);
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    if (!user.isActive) {
      throw new Error('User is disabled');
    }

    // 3️⃣ Rotate tokens
    const newAccessToken = generateAccessToken(user);
    // const newRefreshToken = generateRefreshToken(user);
    const newRefreshToken = refreshToken;

    // 4️⃣ Save new refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error('[refreshTokenService]', error.message);
    throw error;
  }
};
