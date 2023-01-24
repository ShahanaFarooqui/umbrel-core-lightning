import './Channels.scss';
import { formatCurrency } from '../../utilities/data-formatters';

import ListGroup from 'react-bootstrap/ListGroup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { ActionSVG } from '../../svgs/action';
import { AppContext } from '../../store/AppContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const Channels = () => {
  const appCtx = useContext(AppContext);
  
  return (
    <Row className='h-100 mx-1'>
      <Card className='d-flex align-items-stretch'>
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card.Header className='fs-5 fw-bold text-dark'>Payment Channels</Card.Header>
          <Card.Body className='px-0 transaction-list d-flex align-items-center justify-content-center'>
            { appCtx.listChannels.isLoading ? 
              <Spinner animation='grow' variant='primary' /> : 
              appCtx.listChannels.error ? 
                <Alert className='py-0 px-1 fs-11' variant='danger'>{appCtx.listChannels.error}</Alert> : 
                <PerfectScrollbar>
                  <ListGroup as='ul' variant='flush'>
                    {appCtx.listChannels.activeChannels?.map(channel => (
                      <ListGroup.Item
                        key={channel.short_channel_id}
                        as='li'
                        className='d-flex justify-content-between align-items-start'
                      >
                        <div className='ms-2 me-auto text-dark'>
                          <div className='fw-bold'>{channel.node_alias}</div>
                          {formatCurrency(channel.msatoshi_to_us || 0)} &{' '}
                          {formatCurrency((channel.msatoshi_total || 0) - (channel.msatoshi_to_us || 0))}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </PerfectScrollbar>
            }
          </Card.Body>
          <Card.Footer className='d-flex justify-content-center'>
            <Button variant='primary' className='btn-rounded fw-bold'>
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
