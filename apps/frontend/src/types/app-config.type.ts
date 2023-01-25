import { ApplicationModes, Units } from "../utilities/constants";

export type ApplicationConfiguration = {
  unit: Units;
  fiatUnit: string;
  appMode: ApplicationModes
}

export type FiatRate = {
  isLoading: boolean;
  rate?: number;
  error?: any;
}
