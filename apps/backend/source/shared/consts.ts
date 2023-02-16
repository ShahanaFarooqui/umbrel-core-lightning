import * as crypto from 'crypto';

export enum Environment {
  PRODUCTION = 'production',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
}

export const API_VERSION = '/v1';
export const NODE_ENV: Environment = Environment.DEVELOPMENT;
export const LOG_FILE = './dist/logs/cln-backend-' + new Date().toISOString() + '.log';

// // Local TESTNET 1
export const COMMANDO_PUBKEY = '037610b58f47e78ea5178e56f4c793656da5cf093d6269a37f5b0709b7d610e627';
export const COMMANDO_WS_PROXY = 'ws://0.0.0.0:5001';
export const COMMANDO_IP = '0.0.0.0';
export const COMMANDO_PORT = 5001;
export const COMMANDO_RUNE = 'bfoeiPMx3rZslYvQZq6hjtDXRMmT_JKxEgXDHjLRpyU9MA==';
export const COMMANDO_PRIVATE_KEY = crypto.randomBytes(32).toString('hex');

// // Local TESTNET 2
// export const COMMANDO_PUBKEY = '027bff0162504153dd48cb92a13d2ea781a7f33a014678beeb43a328c88e21bd7f';
// export const COMMANDO_WS_PROXY = 'ws://0.0.0.0:5002';
// export const COMMANDO_IP = '0.0.0.0';
// export const COMMANDO_PORT = 5002;
// export const COMMANDO_RUNE = 'EnY-PL3S27YClWAuGTQQdjHUutOe-fb1YooiD3jyyuE9MQ==';
// export const COMMANDO_PRIVATE_KEY = crypto.randomBytes(32).toString('hex');

// // Local REGTEST 1
// export const COMMANDO_RUNE = 'Am3W_wI0PRn4qVNEsJ2iInHyFPQK8wfdqEXztm8-icQ9MA==';
// export const COMMANDO_PUBKEY = '0233263e392b38d0d905e8b35cead00063e8a6b7601d2d2bc3b97348e39026178c';
// export const COMMANDO_WS_PROXY = 'ws://0.0.0.0:5001';
// export const COMMANDO_IP = '0.0.0.0';
// export const COMMANDO_PORT = 5001;
// export const COMMANDO_PRIVATE_KEY = crypto.randomBytes(32).toString('hex');

// Remote TESTNET from Box
// export const COMMANDO_RUNE = 'zIhp8zW8jGx6OOfBiN8dg0zRnVb9Hw2AWhVwEDAx6bM9MQ=='; //Full access
// export const COMMANDO_PUBKEY = '031844beb16bf8dd8c7bc30588b8c37b36e62b71c6e812e9b6d976c0a57e151be2';
// export const COMMANDO_WS_PROXY = 'ws://192.168.1.89:5050';
// export const COMMANDO_IP = '192.168.1.89';
// export const COMMANDO_PORT = 5050;
// export const COMMANDO_PRIVATE_KEY = crypto.randomBytes(32).toString('hex');

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
