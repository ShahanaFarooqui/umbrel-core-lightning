import { Request, Response, NextFunction } from 'express';
import { APIError, BaseError, BitcoindError, CLNError, ValidationError } from '../models/errors';
import { HttpStatusCode } from '../shared/consts';
import { logger } from '../shared/logger';

function handleError(
  error: BaseError | APIError | BitcoindError | CLNError | ValidationError,
  req: Request,
  res: Response,
  next?: NextFunction
) {
  var route = req.url || '';
  var message = error.message || '';
  if (error instanceof CLNError) {
    if (error.error && error.error.details) {
      message += ', ' + error.error.details;
    }
  }
  logger.error(message, route, error.stack);
  res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER).json(message);
}

export default handleError;
