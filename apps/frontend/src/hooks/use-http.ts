import axios from 'axios';
import { useCallback, useState } from 'react';
import { API_BASE_URL, API_VERSION } from '../utilities/constants';

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
        if (!response.ok) {
          setError('Unknown Error from Axios Response!');
        }
        setIsLoading(false);
        setStoreFunction(response.data);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setError((err.message && typeof err.message === 'string') ? err.message : (err.message && typeof err.message === 'object') ? JSON.stringify(err.message) : 'Unknown Error from Axios Call!');
      });
    } catch (err) {
      console.error(err);
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
