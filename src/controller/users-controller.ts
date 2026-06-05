import { Request, Response } from 'express';

export class UserController {
  create(req: Request, res: Response) {
    return res.json({ message: 'ok' });
  }
}
