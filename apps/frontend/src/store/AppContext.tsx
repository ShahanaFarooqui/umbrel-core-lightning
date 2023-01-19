// Decided to use context instead of redux because:
// 1: The scope of the application is small.
// 2: Redux is slightly slower than context.
// 3: Polling after every 10 seconds can make it even slower.

import React, { useReducer } from 'react';
import { AppContextType } from '../types/app-context.type';
import { ApplicationActions, ApplicationModes, Units } from '../utilities/constants';
import { ApplicationConfiguration } from '../types/app-config.type';
import { Fund, Invoice, NodeInfo, Payment, Peer, Transaction } from '../types/lightning-wallet.type';
import logger from '../services/logger.service';


const AppContext = React.createContext<AppContextType>({
  appConfig: { unit: Units.SATS, currencyUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {},
  listFunds: {},
  listPeers: [],
  listInvoices: [],
  listPayments: [],
  listTransactions: [],
  setConfig: (config: ApplicationConfiguration) => {},
  setNodeInfo: (info: NodeInfo | Error) => {},
  setListFunds: (fundsList: Fund) => {},
  setListPeers: (peersList: {peers: Peer[]}) => {},
  setListInvoices: (invoicesList: {invoices: Invoice[]}) => {},
  setListPayments: (paymentsList: {payments: Payment[]}) => {},
  setListTransactions: (transactionsList: {transactions: Transaction[]}) => {},
  clearStore: () => {}
});

const defaultAppState = {
  appConfig: { unit: Units.SATS, currencyUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {},
  listFunds: {},
  listPeers: [],
  listInvoices: [],
  listPayments: [],
  listTransactions: []
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

    case ApplicationActions.SET_LIST_FUNDS:
      return {
        ...state,
        listFunds: action.payload
      };

    case ApplicationActions.SET_LIST_PEERS:
      return {
        ...state,
        listPeers: action.payload
      };

    case ApplicationActions.SET_LIST_INVOICES:
      return {
        ...state,
        listInvoices: action.payload
      };

    case ApplicationActions.SET_LIST_SEND_PAYS:
      return {
        ...state,
        listPayments: action.payload
      };

    case ApplicationActions.SET_LIST_TRANSACTIONS:
      return {
        ...state,
        listTransactions: action.payload
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

  const setListFundsHandler = (fund: Fund) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_FUNDS, payload: fund || {} });
  };

  const setListPeersHandler = (list: {peers: Peer[]}) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_PEERS, payload: list.peers || [] });
  };

  const setListInvoicesHandler = (list: {invoices: Invoice[]}) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_INVOICES, payload: list.invoices || [] });
  };

  const setListPaymentsHandler = (list: {payments: Payment[]}) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_SEND_PAYS, payload: list.payments || [] });
  };

  const setListTransactionsHandler = (list: {transactions: Transaction[]}) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_TRANSACTIONS, payload: list.transactions || [] });
  };

  const clearContextHandler = () => {
    dispatchApplicationAction({ type: ApplicationActions.CLEAR_CONTEXT });
  };

  const appContext: AppContextType = {
    appConfig: applicationState.appConfig,
    nodeInfo: applicationState.nodeInfo,
    listFunds: applicationState.listFunds,
    listPeers: applicationState.listPeers,
    listInvoices: applicationState.listInvoices,
    listPayments: applicationState.listPayments,
    listTransactions: applicationState.listTransactions,
    setConfig: setConfigurationHandler,
    setNodeInfo: setNodeInfoHandler,
    setListFunds: setListFundsHandler,
    setListPeers: setListPeersHandler,
    setListInvoices: setListInvoicesHandler,
    setListPayments: setListPaymentsHandler,
    setListTransactions: setListTransactionsHandler,
    clearStore: clearContextHandler
  };

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
