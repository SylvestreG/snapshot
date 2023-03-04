import { logger } from './core/logger/logger';
import { getApp } from './app';

async function listen() {
  const port = 3000;

  (await getApp()).listen(port);
  logger.info('Listen on port %d', port);
}

listen();
