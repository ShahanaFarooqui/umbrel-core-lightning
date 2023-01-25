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
