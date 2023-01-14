import { ApplicationModes, Units } from "../utilities/constants";

export type ApplicationConfiguration = {
  unit: Units;
  currencyUnit: string;
  appMode: ApplicationModes
}
