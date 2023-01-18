import './Channels.scss';
import { formatCurrency } from '../../utilities/data-formatters';
import logger from '../../services/logger.service';

import ListGroup from 'react-bootstrap/ListGroup';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { ActionSVG } from '../../svgs/action';

const channels = [
  { key: 1, peer: 'Coin Gate', local_balance: 99670, remote_balance: 0 },
  { key: 2, peer: 'CLN', local_balance: 0, remote_balance: 150000 },
  { key: 3, peer: 'Umbrel', local_balance: 10000, remote_balance: 99000 },
  { key: 4, peer: 'Coin Gate', local_balance: 99670, remote_balance: 0 },
  { key: 5, peer: 'CLN', local_balance: 0, remote_balance: 150000 },
  { key: 6, peer: 'Umbrel', local_balance: 10000, remote_balance: 99000 },
  { key: 7, peer: 'Coin Gate', local_balance: 99670, remote_balance: 0 },
  { key: 8, peer: 'CLN', local_balance: 0, remote_balance: 150000 },
  { key: 9, peer: 'Umbrel', local_balance: 10000, remote_balance: 99000 }
];

const Channels = () => {
  return (
    <Row className='h-100 mb-4 mx-1'>
      <Card className='d-flex align-items-stretch'>
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card.Header className='text-light fs-5 fw-bold'>Payment Channels</Card.Header>
          <Card.Body className='px-0 transaction-list'>
            <PerfectScrollbar
              onScrollY={container => logger.info(`scrolled to: ${container.scrollTop}.`)}
            >
              <ListGroup as='ul' variant='flush'>
                {channels.map(channel => (
                  <ListGroup.Item
                    key={channel.key}
                    as='li'
                    className='d-flex justify-content-between align-items-start'
                  >
                    <div className='ms-2 me-auto text-muted'>
                      <div className='fw-bold'>{channel.peer}</div>
                      {formatCurrency(channel.local_balance)} &{' '}
                      {formatCurrency(channel.remote_balance)}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </PerfectScrollbar>
          </Card.Body>
          <Card.Footer className='d-flex justify-content-center'>
            <Button variant='primary' className='btn-rounded text-white fw-bold'>
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
