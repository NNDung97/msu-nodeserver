import User from '../model/user.js';

/**
 * Lưu hoặc cập nhật user vào MongoDB
 * @param {Object} userData - Dữ liệu user
 * @param {String} userData.walletAddress - Địa chỉ ví (bắt buộc)
 * @param {String} userData.email - Email của user
 * @param {String} userData.username - Tên người dùng
 * @param {String} userData.displayName - Tên hiển thị
 * @param {String} userData.avatar - URL avatar
 * @param {String} userData.refreshToken - Refresh token
 * @returns {Promise<Object>} User object
 */
export const saveOrUpdateUser = async (userData) => {
  try {
    const { walletAddress, email, username, displayName, avatar, refreshToken } = userData;

    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    // Tìm user bằng wallet address
    let user = await User.findOne({ walletAddress });

    if (user) {
      // Cập nhật user hiện có
      if (email) user.email = email;
      if (username) user.username = username;
      if (displayName) user.displayName = displayName;
      if (avatar) user.avatar = avatar;
      if (refreshToken) user.refreshToken = refreshToken;
      
      user.lastLogin = new Date();
      user.loginCount += 1;
    } else {
      // Tạo user mới
      user = new User({
        walletAddress,
        email,
        username,
        displayName,
        avatar,
        refreshToken,
        lastLogin: new Date(),
        loginCount: 1
      });
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Lỗi lưu user: ${error.message}`);
  }
};

/**
 * Lấy user theo wallet address
 * @param {String} walletAddress - Địa chỉ ví
 * @returns {Promise<Object>} User object
 */
export const getUserByWallet = async (walletAddress) => {
  try {
    if (!walletAddress) {
      throw new Error('Wallet address is required');
    }

    const user = await User.findOne({ walletAddress });
    return user;
  } catch (error) {
    throw new Error(`Lỗi lấy user: ${error.message}`);
  }
};

/**
 * Cập nhật refresh token
 * @param {String} walletAddress - Địa chỉ ví
 * @param {String} refreshToken - Refresh token mới
 * @returns {Promise<Object>} User object
 */
export const updateRefreshToken = async (walletAddress, refreshToken) => {
  try {
    const user = await User.findOneAndUpdate(
      { walletAddress },
      { refreshToken },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error(`Lỗi cập nhật refresh token: ${error.message}`);
  }
};

/**
 * Xóa user
 * @param {String} walletAddress - Địa chỉ ví
 * @returns {Promise<Object>} Kết quả xóa
 */
export const deleteUser = async (walletAddress) => {
  try {
    const result = await User.findOneAndDelete({ walletAddress });
    return result;
  } catch (error) {
    throw new Error(`Lỗi xóa user: ${error.message}`);
  }
};

/**
 * Lấy tất cả users
 * @returns {Promise<Array>} Mảng users
 */
export const getAllUsers = async () => {
  try {
    const users = await User.find({}).select('-refreshToken');
    return users;
  } catch (error) {
    throw new Error(`Lỗi lấy danh sách users: ${error.message}`);
  }
};
