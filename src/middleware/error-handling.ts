import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction, response } from 'express';
import { ZodError } from 'zod';

export function errorHandling(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      error: {
        message: 'Validation Error',
        details: error.issues.map((issue) => ({
          field: issue.path.length ? issue.path.join('.') : 'root',
          message: issue.message,
        })),
      },
    });
  }

  return response.status(500).json({ message: 'Internal server error' });
}
