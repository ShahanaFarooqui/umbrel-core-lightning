import { HttpStatusCode } from '../shared/consts';

export class BaseError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly name: string;
  public readonly message: string;

  constructor(statusCode: HttpStatusCode, name: string, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER,
    message: string = 'Unknown API Server Error',
    name: string = 'API Error'
  ) {
    super(statusCode, name, message);
  }
}

export class BitcoindError extends BaseError {
  public readonly error?: any;

  constructor(
    error: any = 'Unknown Bitcoin API Error',
    statusCode: HttpStatusCode = HttpStatusCode.BITCOIN_SERVER,
    message: string = 'Unknown Bitcoin API Error',
    name: string = 'Bitcoin API Error'
  ) {
    super(statusCode, name, message);
    this.error = error;
  }
}

export class CLNError extends BaseError {
  public readonly error?: any;

  constructor(
    error: any = 'Unkwown Core Lightning API Error',
    statusCode: HttpStatusCode = HttpStatusCode.CLN_SERVER,
    message: string = 'Unknown Core Lightning API Error',
    name: string = 'Core Lightning API Error'
  ) {
    super(statusCode, name, message);
    this.error = error;
  }
}

export class ValidationError extends BaseError {
  constructor(
    statusCode: HttpStatusCode = HttpStatusCode.INVALID_DATA,
    message: string = 'Unknown Validation Error',
    name: string = 'Validation Error'
  ) {
    super(statusCode, name, message);
  }
}
