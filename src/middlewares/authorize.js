// middlewares/authorize.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!ACCESS_SECRET) {
  throw new Error('JWT_ACCESS_SECRET is not defined');
}

export const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, ACCESS_SECRET);

    // payload = { userId, walletAddress, iat, exp }
    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Access token expired' });
  }
};
