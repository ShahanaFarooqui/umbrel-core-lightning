import { BTC_SATS, Units } from "./constants";

export const ConvertSatsToBTC = (num: number) => {
  return Number.parseFloat((num / BTC_SATS).toString()).toFixed(5);
};

export const formatCurrency = (num: number, selUnit: Units = Units.SATS, shorten: boolean = false) => {
  return (selUnit === Units.BTC) ? ConvertSatsToBTC(num) : (shorten ? (Math.floor((num / 1000)).toLocaleString('en-us') + 'K') : parseFloat(num.toString()).toLocaleString('en-us'));
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
