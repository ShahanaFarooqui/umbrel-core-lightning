export enum Environment {
  PRODUCTION = 'production',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
}

export const API_VERSION = '/v1';
export const NODE_ENV: Environment = Environment.DEVELOPMENT;
export const LOG_FILE = './dist/logs/cln-backend-' + new Date().toISOString() + '.log';
export const COMMANDO_RUNE = 'Am3W_wI0PRn4qVNEsJ2iInHyFPQK8wfdqEXztm8-icQ9MA==';
export const COMMANDO_PUBKEY = '0233263e392b38d0d905e8b35cead00063e8a6b7601d2d2bc3b97348e39026178c';
export const COMMANDO_WS_PROXY = 'ws://0.0.0.0:5001';
export const COMMANDO_IP = '0.0.0.0';
export const COMMANDO_PORT = 19846;
export const COMMANDO_PRIVATE_KEY =
  'ea8d3091934f2c86c216370f0206acaaa2ee12462387743c358ca5f0245bf561';

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
