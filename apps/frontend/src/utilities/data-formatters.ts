export const ConvertSatsToBTC = (num: number) => {
  return Number.parseFloat((num / 100000000).toString()).toFixed(5);
};

export const formatCurrency = (num: number, showInBTC: boolean = false) => {
  return (showInBTC) ? ConvertSatsToBTC(num) : parseFloat(num.toString()).toLocaleString('en-us');
};
