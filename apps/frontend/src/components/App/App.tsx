import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import './App.scss';

import Header from '../Shared/Header/Header';
import BTCWallet from '../BTCWallet/BTCWallet';
import CLNWallet from '../CLNWallet/CLNWallet';
import Channels from '../Channels/Channels';
import Overview from '../Overview/Overview';
import AppContextProvider from '../../store/AppContext';
import { AppContext } from '../../store/AppContext';
import { API_BASE_URL, API_VERSION } from '../../utilities/Constants';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';


const App = () => {
  const appCtx = useContext(AppContext);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    // axios.get(API_BASE_URL + API_VERSION + '/shared/config')
    // .then((response: any) => {
    //   appCtx.setConfig(response.data);
    //   // setIsLoading(false);
    // }).catch(err => {
    //   console.error(err);
    //   // setIsLoading(false);
    // });
    axios.post(API_BASE_URL + API_VERSION + '/cln/call', { 'method': 'getinfo', 'params': [] })
    .then((response: any) => {
      console.log('Setting Node Info');
      console.log(appCtx.setNodeInfo);
      appCtx.setNodeInfo(response.data);
      // setIsLoading(false);
    }).catch(err => {
      console.error(err);
      // setIsLoading(false);
    });
  }, []);

  // console.warn(isLoading);

  // if (isLoading) {
  //   return (
  //     <Container className='py-4' data-testid='container'>
  //       <Spinner animation='grow' variant='primary'>
  //         <span>Loading...</span>
  //       </Spinner>
  //     </Container>
  //   );
  // }

  return (
    <AppContextProvider>
      <Container className='py-4' data-testid='container'>
        <Header />
        <Row className='mb-4'>
          <Col className='mx-1'><Overview /></Col>
        </Row>
        <Row className='node-info px-3'>
          <Col xs={12} md={4}><BTCWallet /></Col>
          <Col xs={12} md={4}><CLNWallet /></Col>
          <Col xs={12} md={4}><Channels /></Col>
        </Row>
      </Container>
    </AppContextProvider>
  );
}

export default App;
