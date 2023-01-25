import axios from 'axios';
import { useCallback, useContext } from 'react';
import { API_BASE_URL, API_VERSION, FIAT_CURRENCIES } from '../utilities/constants';
import logger from '../services/logger.service';
import { AppContext } from '../store/AppContext';
import { ApplicationConfiguration } from '../types/app-config.type';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

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

  const sendRequest = useCallback((setStoreFunction: any, method: string, url: string, reqBody: any = null) => {
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
        }
        setStoreFunction({...response.data, ...{ isLoading: false, error: null }});
      })
      .catch(err => {
        logger.error(err);
        (err.code === 'ECONNABORTED') ?
          setStoreFunction({ isLoading: false, error: 'Request timedout! Verify that CLN node is working!' }) :
        (err.response && err.response.data) ?
          setStoreFunction({ isLoading: false, error: err.response.data }) :
          setStoreFunction({ isLoading: false, error: JSON.stringify(err) })
      });
    } catch (err: any) {
      logger.error(err);
      setStoreFunction({ isLoading: false, error: err });
    }
  }, [getFiatRate]);

  const fetchData = useCallback(() => {
    sendRequest(appCtx.setConfig, 'get', '/shared/config');
    sendRequest(appCtx.setNodeInfo, 'post', '/cln/call', { 'method': 'getinfo', 'params': [] });
    sendRequest(appCtx.setListPeers, 'post', '/cln/call', { 'method': 'listpeers', 'params': [], 'nextAction': 'getNodesInfo' });
    sendRequest(appCtx.setListInvoices, 'post', '/cln/call', { 'method': 'listinvoices', 'params': [] });
    sendRequest(appCtx.setListPayments, 'post', '/cln/call', { 'method': 'listsendpays', 'params': [] });
    sendRequest(appCtx.setListFunds, 'post', '/cln/call', { 'method': 'listfunds', 'params': [] });
    sendRequest(appCtx.setListBitcoinTransactions, 'post', '/cln/call', { 'method': 'listtransactions', 'params': [] });
  }, [appCtx, sendRequest]);

  return {
    fetchData,
    getFiatRate,
    updateConfig
  };
};

export default useHttp;
