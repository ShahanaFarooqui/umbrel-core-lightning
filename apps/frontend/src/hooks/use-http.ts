import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { API_BASE_URL, API_VERSION } from '../utilities/constants';
import logger from '../services/logger.service';
import { AppContext } from '../store/AppContext';

const useHttp = () => {
  const appCtx = useContext(AppContext);

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
        setStoreFunction({ isLoading: false, error: err.response.data });
      });
    } catch (err: any) {
      logger.error(err);
      setStoreFunction({ isLoading: false, error: err });
    }
  }, []);

  return {
    fetchData
  };
};

export default useHttp;
