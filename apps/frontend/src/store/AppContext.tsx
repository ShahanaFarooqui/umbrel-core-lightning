// Decided to use context instead of redux because:
// 1: The scope of the application is small.
// 2: Redux is slightly slower than context.
// 3: Polling after every 10 seconds can make it even slower.

import React, { useReducer } from 'react';
import { AppContextType } from '../types/app-context.type';
import { ApplicationActions, ApplicationModes, Units } from '../utilities/constants';
import { ApplicationConfiguration } from '../types/app-config.type';
import { NodeInfo } from '../types/lightning-wallet.type';
import logger from '../services/logger.service';


const AppContext = React.createContext<AppContextType>({
  appConfig: { unit: Units.SATS, currencyUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {},
  setConfig: (config: ApplicationConfiguration) => {},
  setNodeInfo: (info: NodeInfo | Error) => {},
  clearStore: () => {}
});

const defaultAppState = {
  appConfig: { unit: Units.SATS, currencyUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {}
};

const appReducer = (state, action) => {
  logger.info(state);
  logger.info(action);
  switch (action.type) {
    case ApplicationActions.SET_CONFIG:
      return {
        ...state,
        appConfig: action.payload
      };

    case ApplicationActions.SET_NODE_INFO:
      return {
        ...state,
        nodeInfo: action.payload
      };

    case ApplicationActions.CLEAR_CONTEXT:
      return defaultAppState;

    default:
      return defaultAppState;
  }
};

const AppProvider: React.PropsWithChildren<any> = (props) => {
  const [applicationState, dispatchApplicationAction] = useReducer(appReducer, defaultAppState);

  const setConfigurationHandler = (config: ApplicationConfiguration) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_CONFIG, payload: config });
  };

  const setNodeInfoHandler = (info: NodeInfo) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_NODE_INFO, payload: info });
  };

  const clearContextHandler = () => {
    dispatchApplicationAction({ type: ApplicationActions.CLEAR_CONTEXT });
  };

  const appContext: AppContextType = {
    appConfig: applicationState.appConfig,
    nodeInfo: applicationState.nodeInfo,
    setConfig: setConfigurationHandler,
    setNodeInfo: setNodeInfoHandler,
    clearStore: clearContextHandler
  };

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
