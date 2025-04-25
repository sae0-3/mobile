import jwt from 'jsonwebtoken';
import { config } from '../../../config/env';

export const generateToken = (payload: {
  id: string,
  email: string,
  role: 'client' | 'dealer' | 'admin'
}) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
