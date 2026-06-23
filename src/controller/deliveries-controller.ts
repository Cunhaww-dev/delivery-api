import { Request, response, Response } from 'express';

export class DeliveriesController {
  create(req: Request, res: Response) {
    return res.json({ message: 'Deliveries Created' });
  }
}
