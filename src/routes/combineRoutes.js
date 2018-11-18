import Router from 'koa-router';
import combineRouters from 'koa-combine-routers';
import { userPrivateRoutes, userPublicRoutes } from './user.route';

const publicRoutes = new Router({ prefix: '/public' });
const privateRoutes = new Router({ prefix: '/private' });

publicRoutes.use('/users', userPublicRoutes.routes(), userPublicRoutes.allowedMethods());
privateRoutes.use('/users', userPrivateRoutes.routes(), userPrivateRoutes.allowedMethods());

export const combinedRoutes = combineRouters(publicRoutes, privateRoutes);