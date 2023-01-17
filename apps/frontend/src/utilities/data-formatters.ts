import { Units } from "./constants";

export const ConvertSatsToBTC = (num: number) => {
  return Number.parseFloat((num / 100000000).toString()).toFixed(5);
};

export const formatCurrency = (num: number, selUnit: Units = Units.SATS) => {
  return (selUnit === Units.BTC) ? ConvertSatsToBTC(num) : parseFloat(num.toString()).toLocaleString('en-us');
};
