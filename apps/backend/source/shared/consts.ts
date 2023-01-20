import * as crypto from 'crypto';

export enum Environment {
  PRODUCTION = 'production',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
}

export const API_VERSION = '/v1';
export const NODE_ENV: Environment = Environment.DEVELOPMENT;
export const LOG_FILE = './dist/logs/cln-backend-' + new Date().toISOString() + '.log';

export enum HttpStatusCode {
  GET_OK = 200,
  POST_OK = 201,
  DELETE_OK = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INVALID_DATA = 421,
  INTERNAL_SERVER = 500,
  BITCOIN_SERVER = 520,
  CLN_SERVER = 521,
}

export const SETTINGS_FILE_PATH = '../../data/app/app.config.json';
