import { Request, Response, NextFunction } from 'express';
import {
  APIError,
  BaseError,
  BitcoindError,
  CLNError,
  HttpStatusCode,
  ValidationError
} from '../models/errors';
import { logger } from '../shared/logger';

function handleError(
  error: BaseError | APIError | BitcoindError | CLNError | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  var statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER;
  var route = req.url || '';
  var message = error.message || '';
  if (error instanceof CLNError) {
    if (error.error && error.error.details) {
      message += ', ' + error.error.details;
    }
  }

  logger.error(message, route, error.stack);

  res.status(statusCode).json(message);
}

module.exports = handleError;
