import { env } from '../config/env';
import { logger } from '../config/logger';
import * as HTTP_STATUSES from 'http-status-codes';

export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || HTTP_STATUSES.INTERNAL_SERVER_ERROR;
    ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err };
    if (!env.EMIT_STACK_TRACE) {
      delete ctx.body.stack;
    }
    logger.error('Error in request', err);
  }
}