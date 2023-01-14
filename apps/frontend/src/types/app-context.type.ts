import { ApplicationConfiguration } from './app-config.type';
import { NodeInfo } from './lightning-wallet.type';

export type AppContextType = {
  appConfig: ApplicationConfiguration;
  nodeInfo: NodeInfo;
  setConfig: (newAppConfig: ApplicationConfiguration) => void;
  setNodeInfo: (newNodeInfo: NodeInfo) => void;
  clearStore: () => void;
};
