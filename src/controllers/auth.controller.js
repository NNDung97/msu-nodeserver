import {
  loginWithWallet,
  refreshTokenService,
} from '../services/auth.service.js';

/**
 * LOGIN WALLET
 */
export const loginWallet = async (req, res) => {
  console.log('Login attempt with wallet address:', req.body);

  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }

    const result = await loginWithWallet(walletAddress);

    return res.json({
      message: 'Login success',
      ...result,
    });
  } catch (error) {
    console.error('[loginWallet]', error.message);
    return res.status(401).json({ message: error.message });
  }
};

/**
 * REFRESH TOKEN
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    console.log('Received refresh token:', refreshToken); 
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: 'Refresh token is required' });
    }

    const tokens = await refreshTokenService(refreshToken);

    return res.json({
      message: 'Token refreshed',
      ...tokens,
    });
  } catch (error) {
    console.error('[refreshToken]', error.message);
    return res.status(403).json({ message: error.message });
  }
};
