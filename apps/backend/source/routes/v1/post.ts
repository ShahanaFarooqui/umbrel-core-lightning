import express from 'express';
import { CommonRoutesConfig } from '../../shared/routes.config';
import PostsController from '../../controllers/post';
import { API_VERSION } from '../../shared/consts';

export class PostsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PostsRoutes');
  }

  configureRoutes() {
    this.app.route(API_VERSION + '/').get(PostsController.getPosts);
    this.app.route(API_VERSION + '/:user/:id/:title/:body').post(PostsController.createPost);
    return this.app;
  }
}
