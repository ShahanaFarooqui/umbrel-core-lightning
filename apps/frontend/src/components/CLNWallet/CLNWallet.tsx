import './CLNWallet.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Transactions from '../Transactions/Transactions';
import CurrencyBox from '../Shared/CurrencyBox/CurrencyBox';
import logger from '../../services/logger.service';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { LightningWalletSVG } from '../../svgs/lightning-wallet';
import { WithdrawSVG } from '../../svgs/withdraw';
import { DepositSVG } from '../../svgs/deposit';

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
          <Card className='bg-primary bg-gradient'>
            <Card.Body>
              <Row>
                <Col xs={12} className='d-flex align-items-center justify-content-start'>
                  <LightningWalletSVG className='me-4' />
                  <div>
                    <div className='fs-6'>Lightning Wallet</div>
                    <CurrencyBox value='32943' rootClasses='d-inline-flex flex-column' currencyClasses='fs-4 fw-bold' unitClasses='fs-7 fw-bold'></CurrencyBox>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <ButtonGroup className='sticky-bottom btn-group-dark'>
              <Button>
                <WithdrawSVG className='me-2' />Withdraw
              </Button>
              <Button>
                <DepositSVG className='me-2' />Deposit
              </Button>
            </ButtonGroup>
          </Card>
          <Card.Body className='px-0 transaction-list'>
            <PerfectScrollbar
              onScrollY={container => logger.info(`scrolled to: ${container.scrollTop}.`)}>
              <Transactions transactions={clnTransactions} />
            </PerfectScrollbar>
          </Card.Body>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default CLNWallet;
