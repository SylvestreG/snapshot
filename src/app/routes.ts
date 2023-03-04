import { Express, Request, Response } from 'express';

import { registerRoutes as blockRouter } from 'modules/blockchain/routes';

/**
 * register all routes
 *
 * @param {Express} app - the app server
 * @return {} no return
 *
 */
export function initRoutes(app: Express) {
  // All modules routers
  const routers = [blockRouter];

  for (const routerModule of routers) {
    routerModule(app);
  }

  // Index
  app.all('/', (request: Request, res: Response) => {
    res.statusCode = 410;
    res.send(['Hello!', 'There is nothing there :)']);
  });
}
