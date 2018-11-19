import Router from 'koa-router';
import { UserController } from '../controllers/User.controller';
import { loginValidation, registrationValidation } from '../middleware/validations';

export const userPrivateRoutes = new Router();
export const userPublicRoutes = new Router();

userPrivateRoutes.get('/', UserController.getAllUsers);
userPublicRoutes.post('/register', registrationValidation, UserController.register);
userPublicRoutes.post('/login', loginValidation, UserController.login);