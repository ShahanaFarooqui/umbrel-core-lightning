import './CLNWallet.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Transactions from '../transactions/Transactions';
import CurrencyBox from '../shared/currency-box/CurrencyBox';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card className='bg-primary bg-gradient text-white'>
            <Card.Body>
              <Row>
                <Col xs={9} className='d-flex align-items-center justify-content-start'>
                  <Image src='images/lightning-wallet.svg' alt='Core lightning wallet image' className='me-4'></Image>
                  <div>
                    <div className='fs-6'>Lightning Wallet</div>
                    <CurrencyBox value='32943' alignment='column'></CurrencyBox>
                  </div>
                </Col>
                <Col xs={3} className='d-flex align-items-start justify-content-end fw-bold'>...</Col>
              </Row>
            </Card.Body>
            <ButtonGroup className='sticky-bottom btn-group-dark'>
              <Button>
                <Image src='images/withdraw.svg' alt='Withdraw image' className='me-2'></Image>Withdraw
              </Button>
              <Button>
                <Image src='images/deposit.svg' alt='Deposit image' className='me-2'></Image>Deposit
              </Button>
            </ButtonGroup>
          </Card>
          <Card.Body className='px-0 transaction-list'>
            <PerfectScrollbar
              onScrollY={container => console.log(`scrolled to: ${container.scrollTop}.`)}>
              <Transactions transactions={clnTransactions} />
            </PerfectScrollbar>
          </Card.Body>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default CLNWallet;
