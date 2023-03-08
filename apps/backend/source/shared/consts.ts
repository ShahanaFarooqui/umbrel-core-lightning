import * as crypto from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export enum Environment {
  PRODUCTION = 'production',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
}

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

export const APP_CONSTANTS = {
  CLN_IP: process.env.APP_CORE_LIGHTNING_IP || 'localhost',
  CLN_RUNE: process.env.APP_CORE_LIGHTNING_RUNE,
  CLN_NODE_PUBKEY: process.env.APP_CORE_LIGHTNING_NODE_PUBKEY,
  CLN_WS_PORT: +(process.env.APP_CORE_LIGHTNING_WS_PORT || 5001),
  APPLICATION_MODE: process.env.APP_CORE_LIGHTNING_APPLICATION_MODE,
  LOG_FILE_LOCATION: join(
    dirname(fileURLToPath(import.meta.url)),
    process.env.LOG_FILE_LOCATION || '',
  ),
  CONFIG_LOCATION: join(
    dirname(fileURLToPath(import.meta.url)),
    process.env.APP_CORE_LIGHTNING_CONFIG_LOCATION || '',
  ),
};

export const LN_MESSAGE_CONFIG = {
  remoteNodePublicKey: APP_CONSTANTS.CLN_NODE_PUBKEY || '',
  wsProxy: 'ws://' + APP_CONSTANTS.CLN_IP + ':' + APP_CONSTANTS.CLN_WS_PORT,
  ip: APP_CONSTANTS.CLN_IP,
  port: APP_CONSTANTS.CLN_WS_PORT,
  privateKey: crypto.randomBytes(32).toString('hex'),
  logger: {
    info: APP_CONSTANTS.APPLICATION_MODE === Environment.DEVELOPMENT ? console.info : () => {},
    warn: APP_CONSTANTS.APPLICATION_MODE === Environment.DEVELOPMENT ? console.warn : () => {},
    error: console.error,
  },
};

export const API_VERSION = '/v1';
export const FIAT_RATE_API = 'https://green-bitcoin-mainnet.blockstream.com/prices/v0/venues/';
export const FIAT_VENUES: any = {
  USD: 'KRAKEN',
  CAD: 'BULLBITCOIN',
  EUR: 'KRAKEN',
  NZD: 'KIWICOIN',
};
