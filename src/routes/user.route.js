import Router from 'koa-router';
import { UserController } from '../controllers/User.controller';

export const userPrivateRoutes = new Router();
export const userPublicRoutes = new Router();

userPrivateRoutes.get('/', UserController.getAllUsers);
userPublicRoutes.post('/register', UserController.createUser);