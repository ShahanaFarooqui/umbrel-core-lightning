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
import { Spinner } from 'react-bootstrap';
import { ApplicationModes } from '../../utilities/constants';

const App = () => {
  const appCtx = useContext(AppContext);
  const { isLoading, error, fetchData } = useHttp();

  const bodyHTML = document.getElementsByTagName('body')[0];
  const htmlAttributes = bodyHTML.attributes;
  const theme = document.createAttribute('data-bs-theme');
  theme.value = (appCtx.appConfig.appMode).toLowerCase();
  bodyHTML.style.backgroundColor = (appCtx.appConfig.appMode === ApplicationModes.LIGHT) ? '#F4F7FE' : '#131314';
  htmlAttributes.setNamedItem(theme);

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Container className='py-4' data-testid='container'>
        <Header />
        <Row className='mt-10'>
          <Col xs={12} className='d-flex align-items-center justify-content-center'>
            <Spinner animation='grow' variant='primary' />
          </Col>            
          <Col xs={12} className='d-flex align-items-center justify-content-center'>
            <div>Loading...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='py-4' data-testid='container'>
        <Header />
        <Row className='mt-10'>
          <Col xs={12} className='d-flex align-items-center justify-content-center'>
            {error}
          </Col>            
        </Row>
      </Container>
    );
  }

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
