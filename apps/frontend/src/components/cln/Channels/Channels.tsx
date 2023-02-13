import './Channels.scss';
import { useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import { AppContext } from '../../../store/AppContext';
import { formatCurrency, titleCase } from '../../../utilities/data-formatters';
import { ActionSVG } from '../../../svgs/Action';

const Channels = (props) => {
  const appCtx = useContext(AppContext);
  
  const mergeChannelsList = () => {
    return [...(appCtx.listChannels.activeChannels || []), ...(appCtx.listChannels.pendingChannels || []), ...(appCtx.listChannels.inactiveChannels || [])];
  }

  return (
    <Card className='h-100 d-flex align-items-stretch px-4 pt-4 pb-3'>
      <Card.Header className='px-1 fs-18px p-0 fw-bold text-dark'>Payment Channels</Card.Header>
      <Card.Body className='py-0 px-1 channels-scroll-container'>
        { appCtx.listChannels.isLoading ? 
            <span className='h-100 d-flex justify-content-center align-items-center'>
              <Spinner animation='grow' variant='primary' />
            </span> 
          :
          appCtx.listChannels.error ? 
            <Alert className='fs-8' variant='danger'>{appCtx.listChannels.error}</Alert> : 
            <PerfectScrollbar className='ps-show-always'>
              <ListGroup as='ul' variant='flush'>
                {mergeChannelsList().map((channel, idx) => (
                  <ListGroup.Item
                    key={channel.short_channel_id || channel.node_alias || idx}
                    as='li'
                    className='ps-0 d-flex justify-content-between align-items-start'
                  >
                    <div className='flex-fill text-dark'>
                      <>
                        <div className='fw-bold'>
                          <OverlayTrigger
                            placement='auto'
                            delay={{ show: 250, hide: 250 }}
                            overlay={<Tooltip>{titleCase(channel.current_state)}</Tooltip>}
                            >
                            <span>
                              <div className={'d-inline-block mx-1 dot ' + (channel.current_state === 'ACTIVE' ? 'bg-success' : channel.current_state === 'PENDING' ? 'bg-warning' : 'bg-danger')}></div>
                              {channel.node_alias}
                            </span>
                          </OverlayTrigger>
                        </div>
                        <ProgressBar>
                          <ProgressBar variant='primary' now={(channel.satoshi_to_us > 1000000 || channel.satoshi_to_them > 1000000) ? (channel.satoshi_to_us / 1000) : channel.satoshi_to_us} key={1} />
                          <ProgressBar variant='light' now={(channel.satoshi_to_us > 1000000 || channel.satoshi_to_them > 1000000) ? (channel.satoshi_to_them / 1000) : channel.satoshi_to_them} key={2} />
                        </ProgressBar>
                        <Row className='text-light d-flex align-items-end justify-content-between'>
                          <Col xs={6} className='fs-7 fw-bold d-flex justify-content-start text-primary'>
                            {formatCurrency(channel.satoshi_to_us, appCtx.appConfig.unit)} {appCtx.appConfig.unit}
                          </Col>
                          <Col xs={6} className='fs-7 fw-bold d-flex justify-content-end'>
                            {formatCurrency(channel.satoshi_to_them, appCtx.appConfig.unit)} {appCtx.appConfig.unit}
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
        <button tabIndex={1} className='btn-rounded bg-primary' onClick={props.onOpenChannel}>
          Open Channel
          <ActionSVG className='ms-3' />
        </button>
      </Card.Footer>
    </Card>
  );
};

export default Channels;
