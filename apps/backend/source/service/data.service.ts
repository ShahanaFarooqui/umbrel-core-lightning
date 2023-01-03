import { HttpStatusCode, ValidationError } from '../models/errors';
import { Post } from '../models/post';
import { logger } from '../shared/logger';

export class DataService {
  posts: Post[] = [
    { userId: 0, id: 1, title: 'Shahana', body: 'Hello' },
    { userId: 0, id: 2, title: 'Shahana', body: 'World' }
  ];

  async listPosts() {
    return Promise.resolve(this.posts);
  }

  async addPost(newPost: Post) {
    if (
      typeof newPost.userId === 'undefined' ||
      typeof newPost.userId !== 'number' ||
      typeof newPost.id === 'undefined' ||
      typeof newPost.id !== 'number' ||
      !newPost.title ||
      !newPost.body
    ) {
      logger.error('Validation error in add post');
      throw new ValidationError(HttpStatusCode.INVALID_DATA, 'Invalid or missing data');
    }
    logger.info('Adding new post: ' + JSON.stringify(newPost));
    this.posts.push({
      userId: newPost.userId,
      id: newPost.id,
      title: newPost.title,
      body: newPost.body
    });
    return Promise.resolve(this.posts);
  }
}

export default new DataService();
