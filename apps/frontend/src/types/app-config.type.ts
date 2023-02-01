import { ApplicationModes, Units } from '../utilities/constants';

export type ApplicationConfiguration = {
  isLoading: boolean;
  unit: Units;
  fiatUnit: string;
  appMode: ApplicationModes;
  error?: any;
}

export type FiatConfig = {
  isLoading: boolean;
  symbol: any;
  rate?: number;
  error?: any;
}
