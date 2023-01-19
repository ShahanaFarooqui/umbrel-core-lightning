import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { API_BASE_URL, API_VERSION } from '../utilities/constants';
import logger from '../services/logger.service';
import { AppContext } from '../store/AppContext';

const useHttp = () => {
  const appCtx = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    setIsLoading(true);
    try {
      axios({
        method: method,
        url: API_BASE_URL + API_VERSION + url,
        data: reqBody
      }).then((response: any) => {
        logger.info(response);
        if (response.statusText !== 'OK') {
          setError('Unknown Error from Axios Response!');
        }
        setIsLoading(false);
        setStoreFunction(response.data);
      })
      .catch(err => {
        logger.error(err);
        setStoreFunction({error: err.response.data});
        setIsLoading(false);
        setError((err.message && typeof err.message === 'string') ? err.message : (err.message && typeof err.message === 'object') ? JSON.stringify(err.message) : 'Unknown Error from Axios Call!');
      });
    } catch (err: any) {
      logger.error(err);
      setStoreFunction({error: err});
      setIsLoading(false);
      setError(JSON.stringify(err) || 'Unknown Error from Axios!');
    }
  }, []);

  return {
    isLoading,
    error,
    fetchData
  };
};

export default useHttp;
