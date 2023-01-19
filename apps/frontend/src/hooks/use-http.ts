import axios from 'axios';
import { useCallback, useContext } from 'react';
import { API_BASE_URL, API_VERSION } from '../utilities/constants';
import logger from '../services/logger.service';
import { AppContext } from '../store/AppContext';
import { ApplicationConfiguration } from '../types/app-config.type';

const useHttp = () => {
  const appCtx = useContext(AppContext);

  const updateConfig = (updatedConfig: ApplicationConfiguration) => {
    axios.post(API_BASE_URL + API_VERSION + '/shared/config', updatedConfig)
    .then((response: any) => {
      appCtx.setConfig(updatedConfig);
    }).catch(err => {
      logger.error(err);
    });

  }

  const fetchData = () => {
    sendRequest(appCtx.setConfig, 'get', '/shared/config');
    sendRequest(appCtx.setNodeInfo, 'post', '/cln/call', { 'method': 'getinfo', 'params': [] });
    sendRequest(appCtx.setListPeers, 'post', '/cln/call', { 'method': 'listpeers', 'params': [] });
    sendRequest(appCtx.setListInvoices, 'post', '/cln/call', { 'method': 'listinvoices', 'params': [] });
    sendRequest(appCtx.setListPayments, 'post', '/cln/call', { 'method': 'listsendpays', 'params': [] });
    sendRequest(appCtx.setListFunds, 'post', '/cln/call', { 'method': 'listfunds', 'params': [] });
    sendRequest(appCtx.setListTransactions, 'post', '/cln/call', { 'method': 'listtransactions', 'params': [] });
  }

  const sendRequest = useCallback((setStoreFunction: any, method: string, url: string, reqBody: any = null) => {
    try {
      axios({
        timeout: 10000,
        method: method,
        url: API_BASE_URL + API_VERSION + url,
        data: reqBody
      }).then((response: any) => {
        logger.info(response);
        if (url === '/cln/call') {
          setStoreFunction({...response.data, ...{ isLoading: false, error: null }});
        } else {
          setStoreFunction(response.data);
        }
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
  }, []);

  return {
    fetchData,
    updateConfig
  };
};

export default useHttp;
