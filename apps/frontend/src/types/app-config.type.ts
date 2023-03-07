import { ApplicationModes, Units } from '../utilities/constants';

export type ToastPosition = 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';

export type ApplicationConfiguration = {
  isLoading: boolean;
  unit: Units;
  fiatUnit: string;
  appMode: ApplicationModes;
  error?: any;
}

export type FiatConfig = {
  venue?: string;
  rate?: number;
  isLoading: boolean;
  symbol: any;
  error?: any;
}

export type ModalConfig = {
  nodeInfoModal: boolean;
  connectWalletModal: boolean;
}

export type ToastConfig = {
  show: boolean;
  message: string;
  position?: ToastPosition;
  delay?: number;
  bg?: string;
  className?: string;
}
