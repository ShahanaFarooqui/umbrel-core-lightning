import express from 'express';
import { CommonRoutesConfig } from '../../shared/routes.config.js';
import LightningController from '../../controllers/lightning.js';
import { API_VERSION } from '../../shared/consts.js';

export class LightningRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'Lightning Routes');
  }

  configureRoutes() {
    this.app.route(API_VERSION + '/').get(LightningController.getInfo);
    return this.app;
  }
}
