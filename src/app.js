import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import respond from 'koa-respond';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import jwt from 'koa-jwt';
import { logger } from './config/logger';
import { env } from './config/env';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import { combinedRoutes } from './routes/combineRoutes';
import { syncDB } from './models/index'

syncDB(env.DB_SYNC)
  .then();

const app = new Koa();

app
  .use(errorHandler)
  .use(compress())
  .use(respond())
  .use(cors())
  .use(bodyParser())
  .use(jwt({ secret: env.JWT_SECRET, key: 'loggedUser' }).unless({ path: [/^\/public/] }))
  .use(combinedRoutes())
  .use(notFoundHandler);

const server = http.createServer(app.callback());

server.on('close', () => {
  logger.debug('Server closing, bye!');
});

logger.debug('Server created, ready to listen', { scope: 'startup' });

server.listen(env.PORT, () => {
  const mode = env.NODE_ENV
  logger.debug(`Server listening on ${env.PORT} in ${mode} mode`)
});