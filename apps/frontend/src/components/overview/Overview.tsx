import './Overview.scss';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import CurrencyBox from '../shared/currency-box/CurrencyBox';

const activeChannels = 14;
const numPeers = 8;

const Overview = () => {
  return (
    <Row className='mx-1'>
      <Col xs={12} md={3}>
        <Card className='bg-primary bg-gradient text-white'>
          <Card.Body>
            <Row>
              <Col xs={6}>
                <div className='fs-6'>Total Balance</div>
                <CurrencyBox value='1804943' alignment='column'></CurrencyBox>
              </Col>
              <Col xs={6} className='d-flex align-items-center justify-content-end'>
                <Image src="images/balance.svg" alt="Balance image"></Image>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={9}>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <div className='d-flex align-items-center justify-content-start'>
                  <Image src="images/channels.svg" alt="Active channels image" className='me-4'></Image>
                  <div>
                    <div className='fs-6 text-secondary'>Active Channels</div>
                    <div className='fs-4 fw-bold'>{parseFloat(activeChannels.toString()).toLocaleString('en-us')}</div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center justify-content-start'>
                  <Image src="images/peers.svg" alt="Peers image" className='me-4'></Image>
                  <div>
                    <div className='fs-6 text-secondary'>Peers</div>
                    <div className='fs-4 fw-bold'>{parseFloat(numPeers.toString()).toLocaleString('en-us')}</div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={5}>
                <div className='d-flex align-items-center justify-content-start'>
                  <Image src="images/capacity.svg" alt="Capacity image" className='me-4'></Image>
                  <Col>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='fs-6 text-secondary'>Maximum Send</div>
                      <CurrencyBox value='15000' alignment='row'></CurrencyBox>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='fs-6 text-secondary'>Maximum Receive</div>
                      <CurrencyBox value='5000' alignment='row'></CurrencyBox>
                    </div>
                  </Col>
                </div>
              </Col>
            </Row>
            {/* <div className='d-flex justify-content-between'>
              <div>Active channels</div>
              <div>4</div>
            </div> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Overview;
