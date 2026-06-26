import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

export function verifyUserAuthorization(role: String[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    // Verificando se a role do usuário não exite aqui dentro
    if (!role.includes(req.user.role)) {
      throw new AppError('Unauthorized', 401);
    }

    return next();
  };
}
