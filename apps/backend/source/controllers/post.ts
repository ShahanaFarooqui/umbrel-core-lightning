import { Request, Response, NextFunction } from 'express';
import dataService from '../service/data.service';
import { logger } from '../shared/logger';
import { Post } from '../models/post';

class PostsController {
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      let posts: Post[] = await dataService.listPosts();
      logger.info('Calling list Posts with ' + (posts.length + 1) + ' records.');
      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      let newPost: Post = {
        userId: +req.params.user,
        id: +req.params.id,
        title: req.params.title,
        body: req.params.body
      };
      let posts: Post[] = await dataService.addPost(newPost);
      logger.info('Added new post. Latest Total: ' + (posts.length + 1));
      return res.status(201).json(posts);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }
}

export default new PostsController();
