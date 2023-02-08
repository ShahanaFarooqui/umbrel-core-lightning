import axios from 'axios';
import { useCallback, useContext } from 'react';
import { API_BASE_URL, API_VERSION, FIAT_CURRENCIES, PaymentType, SATS_MSAT } from '../utilities/constants';
import logger from '../services/logger.service';
import { AppContext } from '../store/AppContext';
import { ApplicationConfiguration } from '../types/app-config.type';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import dummyDataFromJSON from '../z-dummy-data/dummy.data.json';

const useHttp = () => {
  const appCtx = useContext(AppContext);

  const updateConfig = (updatedConfig: ApplicationConfiguration) => {
    axios.post(API_BASE_URL + API_VERSION + '/shared/config', updatedConfig)
    .then((response: any) => {
      if(appCtx.appConfig.fiatUnit !== updatedConfig.fiatUnit) {
        getFiatRate(updatedConfig.fiatUnit);
      }
      appCtx.setConfig(updatedConfig);
    }).catch(err => {
      logger.error(err);
    });
  }

  const getFiatRate = useCallback((fiatUnit: string) => {
    axios.get(API_BASE_URL + API_VERSION + '/shared/rate/' + fiatUnit)
    .then((response: any) => {
      const foundCurrency = FIAT_CURRENCIES.find(curr => curr.currency === fiatUnit);
      appCtx.setFiatConfig({ isLoading: false, symbol: (foundCurrency ? foundCurrency.symbol : faDollarSign), rate: response.data, error: null });
    }).catch(err => {
      appCtx.setFiatConfig({ isLoading: false, symbol: faDollarSign, error: err.response.data });
    });
  }, [appCtx]);

  const sendRequest = useCallback((method: string, url: string, reqBody: any = null) => {
    try {
      return axios({
        timeout: 10 * 60000,
        method: method,
        url: API_BASE_URL + API_VERSION + url,
        data: reqBody
      });
    } catch (err: any) {
      logger.error(err);
      return err;
    }
  }, []);

  const openChannel = (pubkey: string, amount: number, feeRate: string, announce: boolean) => {
    return sendRequest('post', '/cln/call', { 'method': 'fundchannel', 'params': { 'id': pubkey, 'amount': amount, 'feerate': feeRate, 'announce': announce } });
  };

  const btcWithdraw = (address: string, amount: string, feeRate: string) => {
    return sendRequest('post', '/cln/call', { 'method': 'withdraw', 'params': { 'destination': address, 'satoshi': amount, 'feerate': feeRate } });
  };

  const btcDeposit = () => {
    return sendRequest('post', '/cln/call', { 'method': 'newaddr', 'params': { 'addresstype': 'bech32' } });
  };

  const clnSendPayment = (paymentType: PaymentType, invoice: string, amount: number = 0) => {
    if (paymentType === PaymentType.KEYSEND) {
      return sendRequest('post', '/cln/call', { 'method': 'keysend', 'params': { 'destination': invoice, 'amount_msat': amount * SATS_MSAT } });
    } else {
      return sendRequest('post', '/cln/call', { 'method': 'pay', 'params': { 'bolt11': invoice } });
    }
  };

  const clnReceiveInvoice = (invoiceType: PaymentType, amount: number, description: string, label: string) => {
    if (invoiceType === PaymentType.OFFER) {
      return sendRequest('post', '/cln/call', { 'method': 'offer', 'params': { 'amount': (amount * SATS_MSAT), 'description': description } });
    } else {
      return sendRequest('post', '/cln/call', { 'method': 'invoice', 'params': { 'amount_msat': (amount * SATS_MSAT), 'label': label, 'description': description } });
    }
  };

  const decodeInvoice = (invoice: string) => {
    return sendRequest('post', '/cln/call', { 'method': 'decode', 'params': [ invoice ] });
  };

  const fetchInvoice = (offer: string, amount: number) => {
    return sendRequest('post', '/cln/call', { 'method': 'fetchinvoice', 'params': { 'offer': offer, 'amount_msat': amount * SATS_MSAT } });
  };

  const sendRequestToSetStore = useCallback((setStoreFunction: any, method: string, url: string, reqBody: any = null) => {
    try {
      axios({
        timeout: 15000,
        method: method,
        url: API_BASE_URL + API_VERSION + url,
        data: reqBody
      }).then((response: any) => {
        logger.info(response);
        if(url === '/shared/config') {
          getFiatRate(response.data.fiatUnit);
          if (response.data.useDummyData) {
            appCtx.setStore(dummyDataFromJSON);
          } else {
            fetchData();
          }
        }
        setStoreFunction({...response.data, ...{ isLoading: false, error: null }});
      })
      .catch(err => {
        logger.error(err);
        if(url === '/shared/config') {
          getFiatRate('USD');
        } else {
          (err.code === 'ECONNABORTED') ?
            setStoreFunction({ isLoading: false, error: 'Request timedout! Verify that CLN node is working!' }) :
          (err.response && err.response.data) ?
            setStoreFunction({ isLoading: false, error: err.response.data }) :
            setStoreFunction({ isLoading: false, error: JSON.stringify(err) })
        }
      });
    } catch (err: any) {
      logger.error(err);
      setStoreFunction({ isLoading: false, error: err });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFiatRate]);

  const fetchData = useCallback(() => {
    sendRequestToSetStore(appCtx.setNodeInfo, 'post', '/cln/call', { 'method': 'getinfo', 'params': [] });
    sendRequestToSetStore(appCtx.setListPeers, 'post', '/cln/call', { 'method': 'listpeers', 'params': [], 'nextAction': 'getNodesInfo' });
    sendRequestToSetStore(appCtx.setListInvoices, 'post', '/cln/call', { 'method': 'listinvoices', 'params': [] });
    sendRequestToSetStore(appCtx.setListPayments, 'post', '/cln/call', { 'method': 'listsendpays', 'params': [] });
    sendRequestToSetStore(appCtx.setListFunds, 'post', '/cln/call', { 'method': 'listfunds', 'params': [] });
    sendRequestToSetStore(appCtx.setListBitcoinTransactions, 'post', '/cln/call', { 'method': 'listtransactions', 'params': [] });
  }, [appCtx, sendRequestToSetStore]);

  const getAppConfigurations = useCallback(() => {
    sendRequestToSetStore(appCtx.setConfig, 'get', '/shared/config');
  }, [appCtx, sendRequestToSetStore]);

  return {
    getAppConfigurations,
    fetchData,
    getFiatRate,
    updateConfig,
    openChannel,
    btcWithdraw,
    btcDeposit,
    clnSendPayment,
    clnReceiveInvoice,
    decodeInvoice,
    fetchInvoice
  };
};

export default useHttp;
