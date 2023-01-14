// Decided to use context instead of redux because:
// 1: The scope of the application is small.
// 2: Redux is slightly slower than context.
// 3: Polling after every 10 seconds can make it even slower.

import React, { useReducer } from 'react';
// import { AppContextType } from '../types/AppContext.type';
import { ApplicationActions, ApplicationModes, Units } from '../utilities/Constants';
import { ApplicationConfiguration } from '../types/AppConfig.type';
import { NodeInfo } from '../types/LightningWallet.type';

export const AppContext = React.createContext({
  appConfig: { unit: Units.SATS, currencyUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {},
  setConfig: (config: ApplicationConfiguration) => {},
  setNodeInfo: (info: NodeInfo) => {},
  clearStore: () => {}
});

const defaultAppState = {
  appConfig: { unit: Units.SATS, currencyUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: { version: 'cln-test-version' }
};

const appReducer = (state, action) => {
  console.info(action);
  switch (action.type) {
    case ApplicationActions.SET_CONFIG:
      console.warn('Set Config');
      console.warn(action.payload);
      return {
        ...state,
        appSettings: action.payload
      };

    case ApplicationActions.SET_NODE_INFO:
      console.warn('Set Info');
      console.warn(action.payload);
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

const AppContextProvider = (props) => {
  const [applicationState, dispatchApplicationAction] = useReducer(appReducer, defaultAppState);

  const setConfigurationHandler = (config: ApplicationConfiguration) => {
    console.warn('Config Handler');
    dispatchApplicationAction({ type: ApplicationActions.SET_CONFIG, payload: config });
  };

  const setNodeInfoHandler = (info: NodeInfo) => {
    console.warn('Node Handler');
    dispatchApplicationAction({ type: ApplicationActions.SET_NODE_INFO, payload: info });
  };

  const clearContextHandler = () => {
    dispatchApplicationAction({ type: ApplicationActions.CLEAR_CONTEXT });
  };

  const appContext = {
    appConfig: applicationState.appConfig,
    nodeInfo: applicationState.nodeInfo,
    setConfig: setConfigurationHandler,
    setNodeInfo: setNodeInfoHandler,
    clearStore: clearContextHandler
  };

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
