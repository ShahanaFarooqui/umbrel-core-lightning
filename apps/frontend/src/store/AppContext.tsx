// Decided to use context instead of redux because:
// 1: The scope of the application is small.
// 2: Redux is slightly slower than context.
// 3: Polling after every 10 seconds can make it even slower.

import React, { useReducer } from 'react';
import { AppContextType } from '../types/app-context.type';
import { ApplicationActions, ApplicationModes, Units } from '../utilities/constants';
import { ApplicationConfiguration, FiatConfig } from '../types/app-config.type';
import { Fund, FundChannel, FundOutput, Invoice, ListBitcoinTransactions, ListInvoices, ListPayments, ListPeers, NodeInfo, Payment, Peer } from '../types/lightning-wallet.type';
import logger from '../services/logger.service';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const aggregateChannels = (peers: Peer[]) => {
  const aggregatedChannels: any = { activeChannels: [], pendingChannels: [], inactiveChannels: [] };
  peers?.forEach((peer: Peer) => {
    if (peer.channels && peer.channels.length > 0) {
      peer.channels.map(channel => {
        channel.connected = peer.connected;
        channel.node_alias = peer.alias;
        if (channel.state === 'CHANNELD_NORMAL') {
          if (channel.connected) {
            aggregatedChannels.activeChannels.push(channel);
          } else {
            aggregatedChannels.inactiveChannels.push(channel);
          }
        } else {
          aggregatedChannels.pendingChannels.push(channel);
        }
        return aggregatedChannels;
      });
    }
  });
  return aggregatedChannels;
}

const mergeLightningTransactions = (invoices: Invoice[], payments: Payment[]) => {
  let mergedTransactions: any[] = [];
  let totalTransactionsLength = (invoices?.length || 0) + (payments?.length || 0);
  for (let i = 0, v = 0, p = 0; i < totalTransactionsLength; i++) {
    if (v === (invoices.length || 0)) {
      mergedTransactions.concat(payments.slice(p));
      i = totalTransactionsLength;
    } else if (p === (payments.length || 0)) {
      mergedTransactions.concat(invoices.slice(v));
      i = totalTransactionsLength;
    } else if((payments[p].created_at || 0) >= (invoices[v].expires_at || invoices[v].paid_at || 0)) {
      mergedTransactions.push(payments[p]);
      p++;
    } else if((payments[p].created_at || 0) < (invoices[v].expires_at || invoices[v].paid_at || 0)) {
      mergedTransactions.push(invoices[v]);
      v++;
    }
  }
  return mergedTransactions;
}

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
    return walletBalances;
  });
  listFunds.outputs?.map((output: FundOutput) => {
    if(output.status === 'confirmed') {
      walletBalances.btcConfBalance = walletBalances.btcConfBalance + (output.value || 0);
    } else if(output.status === 'unconfirmed') {
      walletBalances.btcUnconfBalance = walletBalances.btcUnconfBalance + (output.value || 0);
    }
    return walletBalances;
  });
  walletBalances.btcTotalBalance = walletBalances.btcConfBalance + walletBalances.btcUnconfBalance;

  return walletBalances;
}

const AppContext = React.createContext<AppContextType>({
  appConfig: {isLoading: true, unit: Units.SATS, fiatUnit: 'USD', appMode: ApplicationModes.DARK},
  fiatConfig: {isLoading: true, symbol: faDollarSign, rate: 1},
  nodeInfo: {isLoading: true},
  listFunds: {isLoading: true, channels: [], outputs: []},
  listPeers: {isLoading: true, peers: []},
  listChannels: {isLoading: true, activeChannels: [], pendingChannels: [], inactiveChannels: []},
  listInvoices: {isLoading: true, invoices: []},
  listPayments: {isLoading: true, payments: []},
  listLightningTransactions: {isLoading: true, transactions: []},
  listBitcoinTransactions: {isLoading: true, transactions: []},
  walletBalances: {isLoading: true, clnLocalBalance: 0, clnRemoteBalance: 0, clnPendingBalance: 0, clnInactiveBalance: 0, btcConfBalance: 0, btcUnconfBalance: 0, btcTotalBalance: 0},
  setConfig: (config: ApplicationConfiguration) => {},
  setFiatConfig: (fiatConfig: FiatConfig) => {},
  setNodeInfo: (info: NodeInfo) => {},
  setListFunds: (fundsList: Fund) => {},
  setListPeers: (peersList: ListPeers) => {},
  setListInvoices: (invoicesList: ListInvoices) => {},
  setListPayments: (paymentsList: ListPayments) => {},
  setListBitcoinTransactions: (transactionsList: ListBitcoinTransactions) => {},
  clearStore: () => {}
});

const defaultAppState = {
  appConfig: {isLoading: true, unit: Units.SATS, fiatUnit: 'USD', appMode: ApplicationModes.DARK},
  fiatConfig: {isLoading: true, symbol: faDollarSign, rate: 1},
  nodeInfo: {isLoading: true},
  listFunds: {isLoading: true, channels: [], outputs: []},
  listPeers: {isLoading: true, peers: []},
  listChannels: {isLoading: true, activeChannels: [], pendingChannels: [], inactiveChannels: []},
  listInvoices: {isLoading: true, invoices: []},
  listPayments: {isLoading: true, payments: []},
  listLightningTransactions: {isLoading: true, transactions: []},
  listBitcoinTransactions: {isLoading: true, transactions: []},
  walletBalances: {isLoading: true, clnLocalBalance: 0, clnRemoteBalance: 0, clnPendingBalance: 0, clnInactiveBalance: 0, btcConfBalance: 0, btcUnconfBalance: 0, btcTotalBalance: 0}
};

const appReducer = (state, action) => {
  logger.info(action);
  logger.info(state);
  switch (action.type) {
    case ApplicationActions.SET_FIAT_CONFIG:
      return {
        ...state,
        fiatConfig: action.payload
      };

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
      const balances = calculateBalances({...action.payload});
      return {
        ...state,
        walletBalances: { ...balances, isLoading: false, error: action.payload.error },
        listFunds: action.payload
      };

    case ApplicationActions.SET_LIST_PEERS:
      let filteredChannels = aggregateChannels(action.payload.peers);
      return {
        ...state,
        listChannels: { ...filteredChannels, isLoading: false, error: action.payload.error },
        listPeers: action.payload
      };

    case ApplicationActions.SET_LIST_INVOICES:
      const sortedInvoices = action.payload.invoices?.sort((i1: Invoice, i2: Invoice) => ((i1.pay_index && i2.pay_index && i1.pay_index > i2.pay_index) ? -1 : 1));
      if (!state.listPayments.isLoading) {
        const mergedTransactions = mergeLightningTransactions(sortedInvoices, state.listPayments.payments);
        return {
          ...state,
          listLightningTransactions: { isLoading: false, error: action.payload.error, transactions: mergedTransactions },
          listInvoices: {...action.payload, invoices: sortedInvoices}
        };
      }

      return {
        ...state,
        listInvoices: {...action.payload, invoices: sortedInvoices}
      };

    case ApplicationActions.SET_LIST_SEND_PAYS:
      const sortedPayments = action.payload.payments?.sort((p1: Payment, p2: Payment) => ((p1.created_at && p2.created_at && p1.created_at > p2.created_at) ? -1 : 1));
      if (!state.listInvoices.isLoading) {
        const mergedTransactions = mergeLightningTransactions(state.listInvoices.invoices, sortedPayments);
        return {
          ...state,
          listLightningTransactions: { isLoading: false, error: action.payload.error, transactions: mergedTransactions },
          listPayments: {...action.payload, payments: sortedPayments}
        };
      }

      return {
        ...state,
        listPayments: {...action.payload, payments: sortedPayments}
      };

    case ApplicationActions.SET_LIST_BITCOIN_TRANSACTIONS:
      return {
        ...state,
        listBitcoinTransactions: action.payload
      };

    case ApplicationActions.CLEAR_CONTEXT:
      return defaultAppState;

    default:
      return defaultAppState;
  }
};

const AppProvider: React.PropsWithChildren<any> = (props) => {
  const [applicationState, dispatchApplicationAction] = useReducer(appReducer, defaultAppState);
  
  const setFiatConfigHandler = (fiatConfig: FiatConfig) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_FIAT_CONFIG, payload: fiatConfig });
  };

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

  const setListBitcoinTransactionsHandler = (list: ListBitcoinTransactions) => {
    dispatchApplicationAction({ type: ApplicationActions.SET_LIST_BITCOIN_TRANSACTIONS, payload: list });
  };

  const clearContextHandler = () => {
    dispatchApplicationAction({ type: ApplicationActions.CLEAR_CONTEXT });
  };

  const appContext: AppContextType = {
    fiatConfig: applicationState.fiatConfig,
    appConfig: applicationState.appConfig,
    nodeInfo: applicationState.nodeInfo,
    listFunds: applicationState.listFunds,
    listPeers: applicationState.listPeers,
    listChannels: applicationState.listChannels,
    listInvoices: applicationState.listInvoices,
    listPayments: applicationState.listPayments,
    listLightningTransactions: applicationState.listLightningTransactions,
    listBitcoinTransactions: applicationState.listBitcoinTransactions,
    walletBalances: applicationState.walletBalances,
    setConfig: setConfigurationHandler,
    setFiatConfig: setFiatConfigHandler,
    setNodeInfo: setNodeInfoHandler,
    setListFunds: setListFundsHandler,
    setListPeers: setListPeersHandler,
    setListInvoices: setListInvoicesHandler,
    setListPayments: setListPaymentsHandler,
    setListBitcoinTransactions: setListBitcoinTransactionsHandler,
    clearStore: clearContextHandler
  };

  return <AppContext.Provider value={appContext}>{props.children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
