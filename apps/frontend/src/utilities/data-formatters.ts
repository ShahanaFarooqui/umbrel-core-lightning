import { BTC_SATS, BTC_MSAT, SATS_MSAT, Units } from './constants';

export const ConvertSatsToMSats = (num: number) => {
  return num * SATS_MSAT;
};

export const ConvertBTCToSats = (num: number) => {
  return num * BTC_SATS;
};

export const ConvertBTCToMSats = (num: number) => {
  return num * BTC_MSAT;
};

export const ConvertMSatsToSats = (num: number, numDecimalPlaces: number, returnFormat: string = 'string') => {
  return returnFormat === 'string' ?
    Number.parseFloat(Number.parseFloat((num / SATS_MSAT).toString()).toFixed(numDecimalPlaces)).toLocaleString('en-us')
  :
    Number.parseFloat((num / SATS_MSAT).toString()).toFixed(numDecimalPlaces)
};

export const ConvertSatsToBTC = (num: number, numDecimalPlaces: number = 5, returnFormat: string = 'string') => {
  return returnFormat === 'string' ?
    Number.parseFloat(Number.parseFloat((num / BTC_SATS).toString()).toFixed(numDecimalPlaces)).toLocaleString('en-us')
  :
    Number.parseFloat((num / BTC_SATS).toString()).toFixed(numDecimalPlaces);
};

export const ConvertMSatsToBTC = (num: number, numDecimalPlaces: number = 5, returnFormat: string = 'string') => {
  return returnFormat === 'string' ?
    Number.parseFloat(Number.parseFloat((num / BTC_MSAT).toString()).toFixed(numDecimalPlaces)).toLocaleString('en-us')
  :
    Number.parseFloat((num / BTC_MSAT).toString()).toFixed(numDecimalPlaces);
};

export const formatSats = (num: number, shorten: boolean, returnFormat: string = 'string') => {
  return returnFormat === 'string' ?
    (shorten ? (Math.floor((num / 1000)).toLocaleString('en-us') + 'K') : parseFloat(num.toString()).toLocaleString('en-us'))
  :
    (shorten ? Math.floor((num / 1000)) : parseFloat(num.toString())) // number format
};

export const formatCurrency = (num: number, fromUnit: Units, toUnit: Units = Units.SATS, shorten: boolean = false, numDecimalPlaces: number = 5, returnFormat: string = 'string') => {
  switch (fromUnit) {
    case Units.MSATS:
      return toUnit === Units.BTC ? ConvertMSatsToBTC(num, numDecimalPlaces, returnFormat) : toUnit === Units.SATS ? ConvertMSatsToSats(num, numDecimalPlaces, returnFormat) : num;
    case Units.BTC:
      return toUnit === Units.SATS ? ConvertBTCToSats(num) : toUnit === Units.MSATS ? ConvertBTCToMSats(num) : num;
    default:
      return toUnit === Units.BTC ? ConvertSatsToBTC(num, numDecimalPlaces, returnFormat) : toUnit === Units.MSATS ? ConvertSatsToMSats(num) : formatSats(num, shorten, returnFormat);
  }
};

export const formatFiatValue = (num: number = 0, rate: number = 1) => {
  return Number.parseFloat(((num / BTC_SATS) * rate).toString()).toFixed(2);
};

export const sortDescByKey = (array, key) => {
  const temp = array.sort((a, b) => {
    const x = +a[key] ? +a[key] : 0;
    const y = +b[key] ? +b[key] : 0;
    return (x > y) ? -1 : ((x < y) ? 1 : 0);
  });
  return temp;
};

export const titleCase = (str: string | undefined) => {
  return (str) ? (str[0].toUpperCase() + str.substring(1).toLowerCase()) : '';
};