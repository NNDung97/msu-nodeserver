import { loginWithWallet } from '../services/auth.service.js';

export const loginWallet = async (req, res) => {
    console.log('Login attempt with wallet address:', req.body);
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }

    const result = await loginWithWallet(walletAddress);

    res.json({
      message: 'Login success',
      ...result
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
