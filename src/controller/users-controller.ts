import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import z from 'zod';

export class UserController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(2),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const hashedPass = await hash(password, 8);

    return res.json({ hashedPass });
  }
}
