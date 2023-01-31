import './Channels.scss';
import { useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';

import { AppContext } from '../../../store/AppContext';
import { formatCurrency } from '../../../utilities/data-formatters';
import { ActionSVG } from '../../../svgs/Action';

const Channels = (props) => {
  const appCtx = useContext(AppContext);
  
  const mergeChannelsList = () => {
    return [...(appCtx.listChannels.activeChannels || []), ...(appCtx.listChannels.pendingChannels || []), ...(appCtx.listChannels.inactiveChannels || [])];
  }

  return (
    <Row className='h-100 mx-1'>
      <Card className='d-flex align-items-stretch'>
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card.Header className='fs-6 p-0 fw-bold text-dark'>Payment Channels</Card.Header>
          <Card.Body className='py-0 px-1 transaction-list'>
            { appCtx.listChannels.isLoading ? 
                <span className='h-100 d-flex justify-content-center align-items-center'>
                  <Spinner animation='grow' variant='primary' />
                </span> 
              :
              appCtx.listChannels.error ? 
                <Alert className='fs-8' variant='danger'>{appCtx.listChannels.error}</Alert> : 
                <PerfectScrollbar className='ps-show-always'>
                  <ListGroup as='ul' variant='flush'>
                    {mergeChannelsList().map(channel => (
                      <ListGroup.Item
                        key={channel.short_channel_id}
                        as='li'
                        className='ps-0 d-flex justify-content-between align-items-start'
                      >
                        <div className='flex-fill text-dark'>
                          <>
                            <div className='fw-bold'>
                              <div className={'d-inline-block mx-1 dot ' + (channel.current_state === 'ACTIVE' ? 'bg-success' : channel.current_state === 'PENDING' ? 'bg-warning' : 'bg-danger')}></div>
                              {channel.node_alias}
                            </div>
                            <ProgressBar>
                              <ProgressBar variant='primary' now={(channel.satoshi_to_us > 1000000 || channel.satoshi_to_them > 1000000) ? (channel.satoshi_to_us / 1000) : channel.satoshi_to_us} key={1} />
                              <ProgressBar variant='success' now={(channel.satoshi_to_us > 1000000 || channel.satoshi_to_them > 1000000) ? (channel.satoshi_to_them / 1000) : channel.satoshi_to_them} key={2} />
                            </ProgressBar>
                            <Row className='text-light d-flex align-items-end justify-content-between'>
                              <Col xs={6} className='fs-7 fw-bold d-flex justify-content-start'>
                                {formatCurrency(channel.satoshi_to_us, appCtx.appConfig.unit)}
                              </Col>
                              <Col xs={6} className='fs-7 fw-bold d-flex justify-content-end'>
                                {formatCurrency(channel.satoshi_to_them, appCtx.appConfig.unit)}
                              </Col>
                            </Row>
                          </>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </PerfectScrollbar>
            }
          </Card.Body>
          <Card.Footer className='d-flex justify-content-center'>
            <Button variant='primary' className='btn-rounded fw-bold' onClick={props.onOpenChannel}>
              Open Channel
              <ActionSVG className='ms-2' />
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Channels;