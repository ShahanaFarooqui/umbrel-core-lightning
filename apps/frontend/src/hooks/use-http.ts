import axios from 'axios';
import { useCallback, useState } from 'react';
import { API_BASE_URL, API_VERSION } from '../utilities/constants';
import logger from '../services/logger.service';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    sendRequest
  };
};

export default useHttp;
