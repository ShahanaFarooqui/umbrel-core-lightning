import { ApplicationModes, Units } from '../utilities/constants';

export type ToastPosition = 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';

export type WalletConnect = {
  isLoading: boolean;
  GRPC_PORT?: string;
  LOCAL_HOST?: string;
  REST_MACAROON?: string;
  REST_PORT?: string;
  TOR_HOST?: string;
  WS_PORT?: string;
  error?: any;
}

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
  type?: string;
  bg?: string;
  className?: string;
  containerClassName?: string;
  confirmRes?: any;
}
