import { ApplicationConfiguration } from './app-config.type';
import { Fund, Invoice, NodeInfo, Payment, Peer, Transaction } from './lightning-wallet.type';

export type AppContextType = {
  appConfig: ApplicationConfiguration;
  nodeInfo: NodeInfo;
  listFunds: Fund;
  listPeers: Peer[];
  listInvoices: Invoice[];
  listPayments: Payment[];
  listTransactions: Transaction[];
  setConfig: (newAppConfig: ApplicationConfiguration) => void;
  setNodeInfo: (newNodeInfo: NodeInfo) => void;
  setListFunds: (fundsList: Fund) => void;
  setListPeers: (peersList: {peers: Peer[]}) => void;
  setListInvoices: (invoicesList: {invoices: Invoice[]}) => void;
  setListPayments: (paymentsList: {payments:Payment[]}) => void;
  setListTransactions: (transactionsList: {transactions: Transaction[]}) => void;
  clearStore: () => void;
};
