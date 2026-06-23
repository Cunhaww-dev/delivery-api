import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import jwt from 'jsonwebtoken';
import { authConfig } from '@/config/auth';

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT Token not found', 401);
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      throw new AppError('JWT Token not found', 401);
    }

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError('Unauthorized', 401);
  }
}
