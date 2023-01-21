import { ApplicationConfiguration } from './app-config.type';
import { Fund, ListInvoices, ListPayments, ListPeers, ListTransactions, NodeInfo, WalletBalances } from './lightning-wallet.type';

export type AppContextType = {
  appConfig: ApplicationConfiguration;
  nodeInfo: NodeInfo;
  listFunds: Fund;
  listPeers: ListPeers;
  listInvoices: ListInvoices;
  listPayments: ListPayments;
  listTransactions: ListTransactions;
  walletBalances: WalletBalances;
  setConfig: (newAppConfig: ApplicationConfiguration) => void;
  setNodeInfo: (newNodeInfo: NodeInfo) => void;
  setListFunds: (fundsList: Fund) => void;
  setListPeers: (peersList: ListPeers) => void;
  setListInvoices: (invoicesList: ListInvoices) => void;
  setListPayments: (paymentsList: ListPayments) => void;
  setListTransactions: (transactionsList: ListTransactions) => void;
  clearStore: () => void;
};
