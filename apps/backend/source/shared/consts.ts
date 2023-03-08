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
  REQUEST_CORRELATION_NAMESPACE_KEY: 'umbrel-lightning-request',
  REQUEST_CORRELATION_ID_KEY: 'reqId',
  LIGHTNING_NETWORK: process.env.LIGHTNING_NETWORK || 'mainnet',
  LIGHTNING_HOST: process.env.LIGHTNING_HOST || '0.0.0.0',
  LIGHTNING_RUNE: process.env.LIGHTNING_RUNE || 'bfoeiPMx3rZslYvQZq6hjtDXRMmT_JKxEgXDHjLRpyU9MA==',
  NODE_PUBKEY:
    process.env.NODE_PUBKEY || '037610b58f47e78ea5178e56f4c793656da5cf093d6269a37f5b0709b7d610e627',
  LIGHTNING_WS_PORT: process.env.LIGHTNING_WS_PORT || 5001,
  APPLICATION_MODE: process.env.APPLICATION_MODE || Environment.DEVELOPMENT,
  LOG_FILE_LOCATION:
    process.env.LOG_FILE_LOCATION ||
    join(
      dirname(fileURLToPath(import.meta.url)),
      'apps',
      'backend',
      'dist',
      'logs',
      'cln-' + new Date().toISOString() + '.log',
    ),
  JSON_CONFIG_FILE:
    process.env.JSON_CONFIG_FILE ||
    join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      '..',
      '..',
      '..',
      'data',
      'app',
      'config.json',
    ),
};

export const API_VERSION = '/v1';
export const FIAT_RATE_API = 'https://green-bitcoin-mainnet.blockstream.com/prices/v0/venues/';
export const FIAT_VENUES: any = {
  USD: 'KRAKEN',
  CAD: 'BULLBITCOIN',
  EUR: 'KRAKEN',
  NZD: 'KIWICOIN',
};
