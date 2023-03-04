import { Express } from 'express';
import { blockController } from './controller/block_controller';

export const registerRoutes = (app: Express) => {
  app.get('/block/height', blockController.blockHeight);
  app.get('/block/:blockHeight', blockController.blockByHeight);
  app.get('/block/:blockHeight/time', blockController.getTimestampForBlock);
  app.post('/block/by-timestamp', blockController.blockByTimestamp);
};
