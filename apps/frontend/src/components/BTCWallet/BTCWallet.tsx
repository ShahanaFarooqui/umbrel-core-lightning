import './BTCWallet.scss';
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
import { BitcoinWalletSVG } from '../../svgs/bitcoin-wallet';
import { WithdrawSVG } from '../../svgs/withdraw';
import { DepositSVG } from '../../svgs/deposit';

const btcTransactions = [
  { key: 1, direction: 'out', title: 'Lightning Wallet', amount: 100494, time: 1672614745 },
  { key: 2, direction: 'in', title: 'Deposit', amount: 500000, time: 1670014745 },
  { key: 3, direction: 'Out', title: 'Withdrawal', amount: 249562, time: 1670010745 },
  { key: 4, direction: 'in', title: 'Lightning Wallet', amount: 250305, time: 1670009600 },
  { key: 5, direction: 'in', title: 'Lightning Wallet', amount: 1000000, time: 1572614745 },
  { key: 6, direction: 'in', title: 'Deposit', amount: 190822, time: 1570014745 },
  { key: 7, direction: 'Out', title: 'Withdrawal', amount: 500000, time: 1570010745 },
  { key: 8, direction: 'in', title: 'Lightning Wallet', amount: 782193, time: 1570009600 },
  { key: 9, direction: 'Out', title: 'Deposit', amount: 190822, time: 1570004745 },
  { key: 10, direction: 'Out', title: 'Withdrawal', amount: 500000, time: 1570000245 },
  { key: 11, direction: 'in', title: 'Lightning Wallet', amount: 782193, time: 1570000000 }
];

const BTCWallet = () => {
  return (
    <Row className='h-100 mb-4 mx-1'>
      <Card className='d-flex align-items-stretch'>
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card className='bg-primary bg-gradient text-white'>
            <Card.Body>
              <Row>
                <Col xs={9} className='d-flex align-items-center justify-content-start'>
                  <BitcoinWalletSVG className='me-4' />
                  <div>
                    <div className='fs-6'>Bitcoin Wallet</div>
                      <CurrencyBox value='1384943' alignment='column'></CurrencyBox>
                    </div>
                </Col>
                <Col xs={3} className='d-flex align-items-start justify-content-end fw-bold'>...</Col>
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
              <Transactions transactions={btcTransactions} />
            </PerfectScrollbar>
          </Card.Body>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default BTCWallet;
