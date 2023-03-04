import { initRoutes } from './app/routes';
const morgan = require('morgan');
const express = require('express');
import { logger } from './core/logger/logger';

export async function getApp() {
  const app = express();

  app.use(morgan('combined'));
  app.use(express.json());
  initRoutes(app);
  return app;
}

async function listen() {
  const port = 3000;

  (await getApp()).listen(port);
  logger.info('Listen on port %d', port);
}

listen();
