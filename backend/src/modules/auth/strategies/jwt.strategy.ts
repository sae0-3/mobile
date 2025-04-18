import jwt from 'jsonwebtoken';
import { config } from '../../../config/env';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
