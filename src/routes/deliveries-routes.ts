import { DeliveriesController } from '@/controller/deliveries-controller';
import { ensureAuth } from '@/middleware/ensure-authenticated';
import { verifyUserAuthorization } from '@/middleware/verify-user-authorization';
import { Router } from 'express';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuth);
deliveriesRoutes.use(verifyUserAuthorization(['sale']));
deliveriesRoutes.post('/', deliveriesController.create);

export { deliveriesRoutes };
