import { ApplicationConfiguration, FiatConfig } from './app-config.type';
import { Fund, ListInvoices, ListPayments, ListPeers, ListBitcoinTransactions, NodeInfo, WalletBalances, ListLightningTransactions, ListChannels, Channel } from './lightning-wallet.type';

export type AppContextType = {
  appConfig: ApplicationConfiguration;
  fiatConfig: FiatConfig;
  nodeInfo: NodeInfo;
  listFunds: Fund;
  listPeers: ListPeers;
  listChannels: ListChannels;
  listInvoices: ListInvoices;
  listPayments: ListPayments;
  listLightningTransactions: ListLightningTransactions;
  listBitcoinTransactions: ListBitcoinTransactions;
  walletBalances: WalletBalances;
  setConfig: (newAppConfig: ApplicationConfiguration) => void;
  setFiatConfig: (newFiatConfig: FiatConfig) => void;
  setNodeInfo: (newNodeInfo: NodeInfo) => void;
  setListFunds: (fundsList: Fund) => void;
  setListPeers: (peersList: ListPeers) => void;
  setListInvoices: (invoicesList: ListInvoices) => void;
  setListPayments: (paymentsList: ListPayments) => void;
  setListBitcoinTransactions: (transactionsList: ListBitcoinTransactions) => void;
  setStore: (storeData: any) => void;
  clearStore: () => void;
};
