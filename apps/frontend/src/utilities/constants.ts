import { faDollarSign, faYenSign, faEuroSign, faSterlingSign, faIndianRupeeSign, faRubleSign, faWonSign  } from '@fortawesome/free-solid-svg-icons'

export const LOCAL_HOST = 'http://umbrel.local';
export const TOR_HOST = 'http://oqaer4kd7ufryngx6dsztovs4pnlmaouwmtkofjsasnanm.onion';
export const PORT = '2104';
export const MACAROON = 'my.macaroon';

export const LOG_LEVEL = 'info';
export const API_BASE_URL = 'http://localhost:3007';
export const API_VERSION = '/v1';

export const BTC_SATS = 100000000;
export const SATS_MSAT = 1000;

export type LogLevel = 'info' | 'warn' | 'error';

export enum NumberTypes {
  COMMON = 'COMMON',
  CURRENCY = 'CURRENCY'
};

export enum Units {
  MSATS = 'MSATS',
  SATS = 'SATS',
  BTC = 'BTC'
};

export enum ApplicationModes {
  LIGHT = 'LIGHT',
  DARK = 'DARK'
};

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
  SET_CONTEXT = 'SET_CONTEXT',
  CLEAR_CONTEXT = 'CLEAR_CONTEXT'
};

export enum Breakpoints {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
};

export enum CallStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
};

export enum FeeRate {
  SLOW = 'Slow',
  NORMAL = 'Normal',
  URGENT = 'Urgent'
};

export const FEE_RATES: FeeRate[] = [FeeRate.SLOW, FeeRate.NORMAL, FeeRate.URGENT];

export enum PaymentType {
  INVOICE = 'Invoice',
  OFFER = 'Offer',
  KEYSEND = 'Keysend'
};

export const ANIMATION_INITIAL_STATE = { opacity: 0, scale: 0.1 };
export const ANIMATION_FINAL_STATE = { opacity: 1, scale: 1 };
export const ANIMATION_TRANSITION = { duration: 1.5, delay: 0, ease: [0, 0.71, 0.2, 1.01] };
export const ANIMATION_DELAYED_TRANSITION = { duration: 1.5, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] };

export const OPACITY_VARIANTS = { visible: { opacity: 1 }, hidden: { opacity: 0 }};
export const SPRING_VARIANTS = { type: 'spring', stiffness: 500, damping: 25 };
export const BOUNCY_SPRING_VARIANTS = { type: 'spring', stiffness: 600, damping: 20 };
export const STAGERRED_SPRING_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 0 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};
