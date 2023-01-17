import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import './App.scss';

import Header from '../Shared/Header/Header';
import BTCWallet from '../BTCWallet/BTCWallet';
import CLNWallet from '../CLNWallet/CLNWallet';
import Channels from '../Channels/Channels';
import Overview from '../Overview/Overview';
import { API_BASE_URL, API_VERSION } from '../../utilities/constants';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../store/AppContext';
import logger from '../../services/logger.service';

const App = () => {
  const appCtx = useContext(AppContext);
  const htmlAttributes = document.getElementsByTagName('body')[0].attributes;
  const theme = document.createAttribute('data-bs-theme');
  theme.value = (appCtx.appConfig.appMode).toLowerCase();
  htmlAttributes.setNamedItem(theme);

  useEffect(() => {
    axios.get(API_BASE_URL + API_VERSION + '/shared/config')
    .then((response: any) => {
      appCtx.setConfig(response.data);
    }).catch(err => {
      logger.error(err);
    });
    axios.post(API_BASE_URL + API_VERSION + '/cln/call', { 'method': 'getinfo', 'params': [] })
    .then((response: any) => {
      logger.info('Setting Node Info');
      logger.info(response.data);
      appCtx.setNodeInfo(response.data);
    }).catch(err => {
      logger.error(err);
    });
  }, []);

  return (
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
  );
}

export default App;
