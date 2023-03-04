import { initRoutes } from './app/routes';
const morgan = require('morgan');
const express = require('express');

export async function getApp(testing = false) {
  const app = express();

  if (!testing) {
    app.use(morgan('combined'));
  }
  app.use(express.json());
  initRoutes(app);
  return app;
}
