import './Overview.scss';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CurrencyBox from '../Shared/CurrencyBox/CurrencyBox';
import { BalanceSVG } from '../../svgs/balance';
import { PeersSVG } from '../../svgs/peers';
import { CapacitySVG } from '../../svgs/capacity';
import { ChannelsSVG } from '../../svgs/channels';
import { AppContext } from '../../store/AppContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import useBreakpoint from '../../hooks/use-breakpoint';
import { Breakpoints } from '../../utilities/constants';

const Overview = () => {
  const appCtx = useContext(AppContext);
  const currentScreenSize = useBreakpoint();

  const calcNumChannels = () => {
    return appCtx.listPeers.peers?.reduce((numActiveChannels, peer) => numActiveChannels + ((peer.channels && peer.channels.length && peer.channels.length > 0 && peer.connected && peer.channels?.reduce((count, channel) => ((channel.state === 'CHANNELD_NORMAL') ? (count + 1) : count), 0)) || 0), 0);
  }

  return (
    <Row className='mx-1'>
      <Col xs={12} lg={4} className='d-lg-flex d-xl-flex mb-4'>
        <Card className='bg-primary bg-gradient flex-grow-1'>
          <Card.Body className='d-flex align-items-center'>
            <Row>
              <Col xs={6}>
                <div className='fs-6'>Total Balance</div>
                <CurrencyBox value='1804943' rootClasses='d-inline-flex flex-column' currencyClasses='lh-1 fs-4 fw-bold' unitClasses='fs-8 fw-bold'></CurrencyBox>
              </Col>
              <Col xs={6} className='d-flex align-items-center justify-content-end'>
                <BalanceSVG />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} lg={8} className='mb-4'>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <div className='d-flex align-items-center justify-content-start'>
                  <ChannelsSVG className='me-4' />
                  <div>
                    <div className='fs-6 text-light-white'>Active Channels</div>
                    <div className='fs-4 fw-bold text-dark-primary'>
                      { appCtx.listPeers.isLoading ? 
                        <Spinner animation='grow' variant='primary' /> : 
                        appCtx.listPeers.error ? 
                          <Alert className='py-0 px-1 fs-11' variant='danger'>{appCtx.listPeers.error}</Alert> : 
                          (calcNumChannels() || 0).toLocaleString('en-us')
                      }
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='d-flex align-items-center justify-content-start'>
                  <PeersSVG className='me-4' />
                  <div>
                    <div className='fs-6 text-light-white'>Peers</div>
                    <div className='fs-4 fw-bold text-dark-primary'>
                    { appCtx.listPeers.isLoading ? 
                      <Spinner animation='grow' variant='primary' /> : 
                      appCtx.listPeers.error ? 
                        <Alert className='py-0 px-1 fs-11' variant='danger'>{appCtx.listPeers.error}</Alert> : 
                        (appCtx.listPeers.peers?.length || 0).toLocaleString('en-us')
                    }
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} xxl={5}>
                <div className='d-flex align-items-center justify-content-start'>
                  <CapacitySVG className='me-4' />
                  <Col>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='fs-6 text-light-white'>Maximum Send</div>
                      <CurrencyBox value='15060' shorten='true' rootClasses='d-inline-flex flex-row align-items-center' currencyClasses='fs-6 fw-bold text-dark-primary' unitClasses='fs-6 fw-bold ms-2 text-dark-primary'></CurrencyBox>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='fs-6 text-light-white'>Maximum Receive</div>
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
