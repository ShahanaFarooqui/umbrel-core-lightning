import './CLNWallet.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Transactions from '../transactions/Transactions';

const clnTransactions = [
  { key: 1, direction: 'out', title: 'LSAT', amount: 100494, time: 1672614745 },
  { key: 2, direction: 'in', title: 'LSAT', amount: 500000, time: 1670014745 },
  { key: 3, direction: 'Out', title: 'Paywall token', amount: 249562, time: 1670010745 },
  { key: 4, direction: 'in', title: 'Testing invoice expiry', amount: 250305, time: 1670009600 },
  { key: 5, direction: 'in', title: 'Rebalancing', amount: 1000000, time: 1572614745 },
  { key: 6, direction: 'in', title: '100 Sats private', amount: 190822, time: 1570014745 },
  { key: 7, direction: 'Out', title: 'Tip', amount: 500000, time: 1570010745 },
  { key: 8, direction: 'in', title: 'Testing routing hints', amount: 782193, time: 1570009600 },
  { key: 9, direction: 'Out', title: 'Phoenix', amount: 190822, time: 1570004745 },
  { key: 10, direction: 'Out', title: 'Routing hints invoice 1', amount: 500000, time: 1570000245 },
  { key: 11, direction: 'in', title: 'Coffee payment', amount: 782193, time: 1570000000 }
];

const CLNWallet = () => {
  return (
    <Row className='h-100 mb-4 mx-1'>
      <Card className='d-flex align-items-stretch'>
        <Card.Body className='d-flex align-items-stretch flex-column'>
          <Card.Header>CLN Wallet</Card.Header>
          <Card.Body className='px-0 transaction-list'>
            <PerfectScrollbar
              onScrollY={container => console.log(`scrolled to: ${container.scrollTop}.`)}>
              <Transactions transactions={clnTransactions} />
            </PerfectScrollbar>
          </Card.Body>
          <Card.Footer className='d-flex justify-content-between'>
            <Button variant='secondary'>Send</Button>
            <Button variant='primary'>Receive</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default CLNWallet;
