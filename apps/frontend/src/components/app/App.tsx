import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../header/Header';

function App() {
  return (
    <Container data-testid="container">
      <Header />
      <Row>
        <Col>Overview</Col>
      </Row>
      <Row>
        <Col>Bitcoin Wallet</Col>
        <Col>Lightning Wallet</Col>
        <Col>Payment Channels</Col>
      </Row>
    </Container>
  );
}

export default App;
