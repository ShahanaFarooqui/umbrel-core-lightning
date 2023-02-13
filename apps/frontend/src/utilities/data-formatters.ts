import { BTC_SATS, SATS_MSAT, Units } from './constants';

export const ConvertMSatsToSats = (num: number) => {
  return (num / SATS_MSAT);
};

export const ConvertSatsToBTC = (num: number) => {
  return Number.parseFloat((num / BTC_SATS).toString()).toFixed(5);
};

export const formatCurrency = (num: number, selUnit: Units = Units.SATS, shorten: boolean = false) => {
  return (selUnit === Units.BTC) ? 
    ConvertSatsToBTC(num)
  : 
    (shorten ? 
      (Math.floor((num / 1000)).toLocaleString('en-us') + 'K')
    : 
      parseFloat(num.toString()).toLocaleString('en-us'));
};

export const formatCurrencyNumeric = (num: number, selUnit: Units = Units.SATS, shorten: boolean = false) => {
  return selUnit === Units.BTC ? 
      Number.parseFloat((num / BTC_SATS).toString()).toFixed(5)
    : 
      shorten ? 
        Math.floor((num / 1000))
      : 
        parseFloat(num.toString());
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