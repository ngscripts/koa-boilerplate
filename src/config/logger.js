import { Bristol } from 'bristol';
import palin from 'palin';
import { env } from './env';
const newLogger = new Bristol();


if (env.LOG_LEVEL !== 'off') {
  newLogger.addTarget('console').withFormatter(palin);
}

export const logger = newLogger;