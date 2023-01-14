export const API_BASE_URL = 'http://localhost:3007';
export const API_VERSION = '/v1';
export const COMMANDO_RUNE = 'Am3W_wI0PRn4qVNEsJ2iInHyFPQK8wfdqEXztm8-icQ9MA==';
export const COMMANDO_PUBKEY = '0233263e392b38d0d905e8b35cead00063e8a6b7601d2d2bc3b97348e39026178c';
export const COMMANDO_WS_PROXY = 'ws://0.0.0.0:5001';
export const COMMANDO_IP = '0.0.0.0';
export const COMMANDO_PORT = 19846;
export const COMMANDO_PRIVATE_KEY =
  'ea8d3091934f2c86c216370f0206acaaa2ee12462387743c358ca5f0245bf561';

export enum NumberTypes {
  COMMON = 'COMMON',
  CURRENCY = 'CURRENCY'
}

export enum Units {
  SATS = 'SATS',
  BTC = 'BTC'
}

export enum ApplicationModes {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
}

export const APPLICATION_MODES = ['LIGHT', 'DARK'];

export const CURRENCY_UNITS = ['SATS', 'BTC'];

export const CURRENCY_UNIT_FORMATS = { Sats: '1.0-0', BTC: '1.6-6', OTHER: '1.2-2' };

export const FIAT_CURRENCY_UNITS = [
  'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR',
  'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD'
];

export enum ApplicationActions {
  FETCH_CONFIG = 'FETCH_CONFIG',
  SET_CONFIG = 'SET_CONFIG',
  GET_NODE_INFO = 'GET_NODE_INFO',
  SET_NODE_INFO = 'SET_NODE_INFO',
  CLEAR_CONTEXT = 'CLEAR_CONTEXT'
}

