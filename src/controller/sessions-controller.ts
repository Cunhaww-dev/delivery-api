import { authConfig } from '@/config/auth';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import z from 'zod';

export class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Email or password is invalid', 401);
    }

    const passMatched = await compare(password, user.password);

    // Verifica senha na database
    if (!passMatched) {
      throw new AppError('Email or password is invalid', 401);
    }

    // Testando token
    const token = jwt.sign({ role: user.Role }, authConfig.jwt.secret!, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    const { password: hashedPass, ...userWithoutPassword } = user;

    return res.json({
      message: 'User Session created',
      user: userWithoutPassword,
      token,
    });
  }
}
