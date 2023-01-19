import { ApplicationModes, Units } from "../utilities/constants";

export type ApplicationConfiguration = {
  unit: Units;
  fiatUnit: string;
  appMode: ApplicationModes
}
