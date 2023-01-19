import './Overview.scss';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CurrencyBox from '../Shared/CurrencyBox/CurrencyBox';
import { BalanceSVG } from '../../svgs/balance';
import { PeersSVG } from '../../svgs/peers';
import { CapacitySVG } from '../../svgs/capacity';
import { ChannelsSVG } from '../../svgs/channels';

const activeChannels = 14;
const numPeers = 8;

const Overview = () => {
  return (
    <Row className='mx-1'>
      <Col xs={12} md={3}>
        <Card className='bg-primary bg-gradient'>
          <Card.Body>
            <Row>
              <Col xs={6}>
                <div className='fs-6'>Total Balance</div>
                <CurrencyBox value='1804943' rootClasses='d-inline-flex flex-column' currencyClasses='fs-4 fw-bold' unitClasses='fs-8 fw-bold'></CurrencyBox>
              </Col>
              <Col xs={6} className='d-flex align-items-center justify-content-end'>
                <BalanceSVG />
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
                  <ChannelsSVG className='me-4' />
                  <div>
                    <div className='fs-6 text-light'>Active Channels</div>
                    <div className='fs-4 fw-bold text-dark-primary'>{parseFloat(activeChannels.toString()).toLocaleString('en-us')}</div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center justify-content-start'>
                  <PeersSVG className='me-4' />
                  <div>
                    <div className='fs-6 text-light'>Peers</div>
                    <div className='fs-4 fw-bold text-dark-primary'>{parseFloat(numPeers.toString()).toLocaleString('en-us')}</div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={5}>
                <div className='d-flex align-items-center justify-content-start'>
                  <CapacitySVG className='me-4' />
                  <Col>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='fs-6 text-light'>Maximum Send</div>
                      <CurrencyBox value='15060' shorten='true' rootClasses='d-inline-flex flex-row align-items-center' currencyClasses='fs-6 fw-bold text-dark-primary' unitClasses='fs-6 fw-bold ms-2 text-dark-primary'></CurrencyBox>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='fs-6 text-light'>Maximum Receive</div>
                      <CurrencyBox value='5354' shorten='true' rootClasses='d-inline-flex flex-row align-items-center' currencyClasses='fs-6 fw-bold text-dark-primary' unitClasses='fs-6 fw-bold ms-2 text-dark-primary'></CurrencyBox>
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
