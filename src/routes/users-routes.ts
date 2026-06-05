import { Router } from 'express';
import { UserController } from '@/controller/users-controller';

const usersRoutes = Router();
const usersController = new UserController();

usersRoutes.post('/', usersController.create);

export { usersRoutes };
