import { useContext, useEffect } from 'react';
import './App.scss';

import Header from '../Shared/Header/Header';
import BTCWallet from '../BTCWallet/BTCWallet';
import CLNWallet from '../CLNWallet/CLNWallet';
import Channels from '../Channels/Channels';
import Overview from '../Overview/Overview';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../store/AppContext';
import useHttp from '../../hooks/use-http';

const App = () => {
  const appCtx = useContext(AppContext);
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  const htmlAttributes = document.getElementsByTagName('body')[0].attributes;
  const theme = document.createAttribute('data-bs-theme');
  theme.value = (appCtx.appConfig.appMode).toLowerCase();
  htmlAttributes.setNamedItem(theme);

  useEffect(() => {
    fetchData(appCtx.setConfig, 'get', '/shared/config');
    fetchData(appCtx.setNodeInfo, 'post', '/cln/call', { 'method': 'getinfo', 'params': [] });
  }, [fetchData]);

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
