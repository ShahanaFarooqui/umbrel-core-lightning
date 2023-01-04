import { Request, Response, NextFunction } from 'express';
import {
  APIError,
  BaseError,
  BitcoindError,
  LightningError,
  ValidationError,
} from '../models/errors.js';
import { HttpStatusCode } from './consts.js';
import { logger } from './logger.js';

function handleError(
  error: BaseError | APIError | BitcoindError | LightningError | ValidationError,
  req: Request,
  res: Response,
  next?: NextFunction,
) {
  var route = req.url || '';
  var message = error.message || '';
  if (error instanceof LightningError) {
    if (error.error && error.error.details) {
      message += ', ' + error.error.details;
    }
  }
  logger.error(message, route, error.stack);
  res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER).json(message);
}

export default handleError;
