import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../../shared/header/Header';
import BTCWallet from '../btc-wallet/BTCWallet';
import CLNWallet from '../cln-wallet/CLNWallet';
import Channels from '../channels/Channels';
import Overview from '../overview/Overview';

const App = () => {
  return (
    <Container className='py-4' data-testid='container'>
      <Header />
      <Row className='mb-4'>
        <Col className='mx-1'><Overview /></Col>
      </Row>
      <Row className='node-info'>
        <Col xs={12} md={4}><BTCWallet /></Col>
        <Col xs={12} md={4}><CLNWallet /></Col>
        <Col xs={12} md={4}><Channels /></Col>
      </Row>
    </Container>
  );
}

export default App;
