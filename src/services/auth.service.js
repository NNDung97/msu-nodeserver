import axios from 'axios';
import jwt from 'jsonwebtoken';
import { saveOrUpdateUser } from './user.service.js';

export const loginWithWallet = async (walletAddress) => {
  const url = `${process.env.MSU_URL}/accounts/${walletAddress}/characters`;
  try {
    // Gọi API bên thứ 3
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-nxopen-api-key': process.env.MSU_API_KEY, // lấy API_KEY từ .env
      },
    });

    // Nếu API trả về dữ liệu chứng tỏ wallet hợp lệ
    const characters = response.data;

    // Tạo access token & refresh token
    const accessToken = jwt.sign(
      { walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
      { walletAddress },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Lưu hoặc cập nhật user vào MongoDB
    const user = await saveOrUpdateUser({
      walletAddress,
      refreshToken
    });

    console.log('✅ User saved to MongoDB:', user._id);

    return { accessToken, refreshToken, characters, user };

  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error('Wallet address không hợp lệ hoặc API bên thứ 3 lỗi');
  }
};
