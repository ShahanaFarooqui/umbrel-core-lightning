import { ApplicationModes, Units } from "../utilities/Constants";

export type ApplicationConfiguration = {
  unit: Units;
  currencyUnit: string;
  appMode: ApplicationModes
}
