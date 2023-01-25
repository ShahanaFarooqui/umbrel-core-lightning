import { ApplicationConfiguration, FiatRate } from './app-config.type';
import { Fund, ListInvoices, ListPayments, ListPeers, ListBitcoinTransactions, NodeInfo, WalletBalances, ListLightningTransactions, ListChannels } from './lightning-wallet.type';

export type AppContextType = {
  fiatRate: FiatRate;
  appConfig: ApplicationConfiguration;
  nodeInfo: NodeInfo;
  listFunds: Fund;
  listPeers: ListPeers;
  listChannels: ListChannels;
  listInvoices: ListInvoices;
  listPayments: ListPayments;
  listLightningTransactions: ListLightningTransactions;
  listBitcoinTransactions: ListBitcoinTransactions;
  walletBalances: WalletBalances;
  setFiatRate: (fiatRate: FiatRate) => void;
  setConfig: (newAppConfig: ApplicationConfiguration) => void;
  setNodeInfo: (newNodeInfo: NodeInfo) => void;
  setListFunds: (fundsList: Fund) => void;
  setListPeers: (peersList: ListPeers) => void;
  setListInvoices: (invoicesList: ListInvoices) => void;
  setListPayments: (paymentsList: ListPayments) => void;
  setListBitcoinTransactions: (transactionsList: ListBitcoinTransactions) => void;
  clearStore: () => void;
};
