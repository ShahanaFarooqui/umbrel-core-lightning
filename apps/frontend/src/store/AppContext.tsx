// Decided to use context instead of redux because:
// 1: The scope of the application is small.
// 2: Redux is slightly slower than context.
// 3: Polling after every 10 seconds can make it even slower.

import React, { useReducer } from 'react';
import { AppContextType } from '../types/app-context.type';
import { ApplicationActions, ApplicationModes, Units } from '../utilities/constants';
import { ApplicationConfiguration } from '../types/app-config.type';
import { Fund, FundChannel, FundOutput, Invoice, ListInvoices, ListPayments, ListPeers, ListTransactions, NodeInfo, Payment, WalletBalances } from '../types/lightning-wallet.type';
import logger from '../services/logger.service';

const calculateBalances = (listFunds: Fund) => {
  const walletBalances = { 
    isLoading: false,
    clnLocalBalance: 0,
    clnRemoteBalance: 0,
    clnPendingBalance: 0,
    clnInactiveBalance: 0,
    btcConfBalance: 0,
    btcUnconfBalance: 0,
    btcTotalBalance: 0,
    error: null
  };
  listFunds.channels?.map((channel: FundChannel) => {
    if(channel.state === 'CHANNELD_NORMAL' && channel.connected) {
      walletBalances.clnLocalBalance = walletBalances.clnLocalBalance + (channel.channel_sat || 0);
      walletBalances.clnRemoteBalance = walletBalances.clnRemoteBalance + ((channel.channel_total_sat || 0) - (channel.channel_sat || 0));
    }
    else if(channel.state === 'CHANNELD_NORMAL' && !channel.connected) {
      walletBalances.clnInactiveBalance = walletBalances.clnInactiveBalance + (channel.channel_sat || 0);
    }
    else if(channel.state === 'CHANNELD_AWAITING_LOCKIN') {
      walletBalances.clnPendingBalance = walletBalances.clnPendingBalance + (channel.channel_sat || 0);
    }
  });
  listFunds.outputs?.map((output: FundOutput) => {
    if(output.status === 'confirmed') {
      walletBalances.btcConfBalance = walletBalances.btcConfBalance + (output.value || 0);
    } else if(output.status === 'unconfirmed') {
      walletBalances.btcUnconfBalance = walletBalances.btcUnconfBalance + (output.value || 0);
    }
  });
  walletBalances.btcTotalBalance = walletBalances.btcConfBalance + walletBalances.btcUnconfBalance;

  return walletBalances;
}

const AppContext = React.createContext<AppContextType>({
  appConfig: { unit: Units.SATS, fiatUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {isLoading: true},
  listFunds: {isLoading: true, channels: [], outputs: []},
  listPeers: {isLoading: true, peers: []},
  listInvoices: {isLoading: true, invoices: []},
  listPayments: {isLoading: true, payments: []},
  listTransactions: {isLoading: true, transactions: []},
  walletBalances: {isLoading: true, clnLocalBalance: 0, clnRemoteBalance: 0, clnPendingBalance: 0, clnInactiveBalance: 0, btcConfBalance: 0, btcUnconfBalance: 0, btcTotalBalance: 0},
  setConfig: (config: ApplicationConfiguration) => {},
  setNodeInfo: (info: NodeInfo) => {},
  setListFunds: (fundsList: Fund) => {},
  setListPeers: (peersList: ListPeers) => {},
  setListInvoices: (invoicesList: ListInvoices) => {},
  setListPayments: (paymentsList: ListPayments) => {},
  setListTransactions: (transactionsList: ListTransactions) => {},
  clearStore: () => {}
});

const defaultAppState = {
  appConfig: { unit: Units.SATS, fiatUnit: 'USD', appMode: ApplicationModes.DARK },
  nodeInfo: {isLoading: true},
  listFunds: {isLoading: true, channels: [], outputs: []},
  listPeers: {isLoading: true, peers: []},
  listInvoices: {isLoading: true, invoices: []},
  listPayments: {isLoading: true, payments: []},
  listTransactions: {isLoading: true, transactions: []},
  walletBalances: {isLoading: true, clnLocalBalance: 0, clnRemoteBalance: 0, clnPendingBalance: 0, clnInactiveBalance: 0, btcConfBalance: 0, btcUnconfBalance: 0, btcTotalBalance: 0}
};

const appReducer = (state, action) => {
  logger.info(action);
  logger.info(state);
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
        walletBalances: calculateBalances({...action.payload}),
        listFunds: action.payload
      };

    case ApplicationActions.SET_LIST_PEERS:
      return {
        ...state,
        listPeers: action.payload
      };

    case ApplicationActions.SET_LIST_INVOICES:
      const sortedInvoices = action.payload.invoices?.sort((i1: Invoice, i2: Invoice) => ((i1.pay_index && i2.pay_index && i1.pay_index > i2.pay_index) ? -1 : 1));

      return {
        ...state,
        listInvoices: {...action.payload, invoices: sortedInvoices}
      };

    case ApplicationActions.SET_LIST_SEND_PAYS:
      const sortedPayments = action.payload.payments?.sort((p1: Payment, p2: Payment) => ((p1.created_at && p2.created_at && p1.created_at > p2.created_at) ? -1 : 1));

      return {
        ...state,
        listPayments: {...action.payload, invoices: sortedPayments}
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
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_FUNDS, payload: fund });
  };

  const setListPeersHandler = (list: ListPeers) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_PEERS, payload: list });
  };

  const setListInvoicesHandler = (list: ListInvoices) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_INVOICES, payload: list });
  };

  const setListPaymentsHandler = (list: ListPayments) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_SEND_PAYS, payload: list });
  };

  const setListTransactionsHandler = (list: ListTransactions) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_TRANSACTIONS, payload: list });
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
    walletBalances: applicationState.walletBalances,
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
