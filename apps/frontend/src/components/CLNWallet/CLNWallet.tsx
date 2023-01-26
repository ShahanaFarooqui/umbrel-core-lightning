import './CLNWallet.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Transactions from '../Transactions/Transactions';
import CurrencyBox from '../Shared/CurrencyBox/CurrencyBox';

import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { LightningWalletSVG } from '../../svgs/LightningWallet';
import { WithdrawSVG } from '../../svgs/Withdraw';
import { DepositSVG } from '../../svgs/Deposit';
import { AppContext } from '../../store/AppContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const CLNWallet = () => {
  const appCtx = useContext(AppContext);
  
  return (
    <Row className='h-100 mx-1'>
      <Card className='d-flex align-items-stretch px-2'>
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card className='bg-primary bg-gradient'>
            <Card.Body>
              <Col xs={12} className='d-flex align-items-center justify-content-start'>
                <LightningWalletSVG className='me-4' />
                <div>
                  <div>Lightning Wallet</div>
                  { appCtx.walletBalances.isLoading ? 
                      <Spinner animation='grow' variant='secondary' /> : 
                    appCtx.walletBalances.error ? 
                      <Alert className='py-0 px-1 fs-8' variant='danger'>{appCtx.walletBalances.error}</Alert> : 
                      <CurrencyBox value={appCtx.walletBalances.clnLocalBalance} rootClasses='d-inline-flex flex-column' currencyClasses='lh-1 fs-4 fw-bold' unitClasses='fs-7 fw-bold'></CurrencyBox>
                  }
                </div>
              </Col>
            </Card.Body>
            <ButtonGroup className='sticky-bottom btn-group-action'>
              <Button>
                <WithdrawSVG className='me-2' />Withdraw
              </Button>
              <Button>
                <DepositSVG className='me-2' />Deposit
              </Button>
            </ButtonGroup>
          </Card>
          <Card.Body className='px-0 transaction-list'>
            <div className='fs-7 text-light'>Transactions</div>
            <PerfectScrollbar>
              <Transactions />
            </PerfectScrollbar>
          </Card.Body>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default CLNWallet;
