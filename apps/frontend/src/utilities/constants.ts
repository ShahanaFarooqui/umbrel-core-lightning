import { faDollarSign, faYenSign, faEuroSign, faSterlingSign, faIndianRupeeSign, faRubleSign, faWonSign  } from '@fortawesome/free-solid-svg-icons'

export const LOCAL_HOST = 'http://umbrel.local';
export const TOR_HOST = 'http://oqaer4kd7ufryngx6dsztovs4pnlmaouwmtkofjsasnanmd2m7pkq7qd.onion';
export const PORT = '2104';
export const MACAROON = '02010b632d6c696768746e696e67023e547565204a756e20303720323032322031343a34383a313320474d542b303030302028436f6f7264696e6174656420556e6976657273616c2054696d65290000062006e98dfcee9ebf9304b1ed64132ee1c39de5819441741ff900ef9d839ef1ff61';

export const LOG_LEVEL = 'info';
export const API_BASE_URL = 'http://localhost:3007';
export const API_VERSION = '/v1';

export const BTC_SATS = 100000000;
export const SATS_MSAT = 1000;

export type LogLevel = 'info' | 'warn' | 'error';

export enum NumberTypes {
  COMMON = 'COMMON',
  CURRENCY = 'CURRENCY'
}

export enum Units {
  MSATS = 'MSATS',
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

export const FIAT_CURRENCIES = [
  { currency:	'USD', symbol: faDollarSign },
	{ currency:	'AUD', symbol: faDollarSign },
	{ currency:	'CAD', symbol: faDollarSign },
	{ currency:	'CLP', symbol: faDollarSign },
	{ currency:	'CNY', symbol: faYenSign },
	{ currency:	'EUR', symbol: faEuroSign },
	{ currency:	'GBP', symbol: faSterlingSign },
	{ currency:	'HKD', symbol: faDollarSign },
	{ currency:	'INR', symbol: faIndianRupeeSign },
	{ currency:	'JPY', symbol: faYenSign },
	{ currency:	'KRW', symbol: faWonSign },
	{ currency:	'NZD', symbol: faDollarSign },
	{ currency:	'RUB', symbol: faRubleSign },
	{ currency:	'SGD', symbol: faDollarSign },
	{ currency:	'TWD', symbol: faDollarSign }
];

export enum ApplicationActions {
  SET_FIAT_CONFIG = 'SET_FIAT_CONFIG',
  SET_CONFIG = 'SET_CONFIG',
  SET_NODE_INFO = 'SET_NODE_INFO',
  SET_LIST_FUNDS = 'SET_LIST_FUNDS',
  SET_LIST_PEERS = 'SET_LIST_PEERS',
  SET_LIST_INVOICES = 'SET_LIST_INVOICES',
  SET_LIST_SEND_PAYS = 'SET_LIST_SEND_PAYS',
  SET_LIST_BITCOIN_TRANSACTIONS = 'SET_LIST_BITCOIN_TRANSACTIONS',
  CLEAR_CONTEXT = 'CLEAR_CONTEXT'
}

export enum Breakpoints {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}
