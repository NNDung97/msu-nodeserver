import {
  getUserByWallet,
  getAllUsers
} from '../services/user.service.js';

export const getUserInfo = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const user = await getUserByWallet(walletAddress);

    if (!user) {
      return res.status(404).json({
        message: 'User không được tìm thấy'
      });
    }

    res.json({
      message: 'Lấy thông tin user thành công',
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const listAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.json({
      message: 'Lấy danh sách users thành công',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
