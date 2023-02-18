import './BTCTransactionsList.scss';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { AppContext } from '../../../store/AppContext';
import { formatCurrency } from '../../../utilities/data-formatters';
import { IncomingArrowSVG } from '../../../svgs/IncomingArrow';
import { OutgoingArrowSVG } from '../../../svgs/OutgoingArrow';
import DateBox from '../../shared/DateBox/DateBox';
import FiatBox from '../../shared/FiatBox/FiatBox';
import Transaction from '../CLNTransaction/CLNTransaction';
import { ApplicationModes, Units } from '../../../utilities/constants';

const TODAY = Math.floor(Date.now() / 1000);

const WithdrawHeader = ({withdraw, appConfig, fiatConfig}) => {
  return (
    <Row className='d-flex justify-content-between align-items-center'>
      <Col xs={2}>
        <OutgoingArrowSVG className='me-1' txStatus={withdraw.status} />
      </Col>
      <Col xs={10}>
        <Row className='d-flex justify-content-between align-items-center'>
          <Col xs={7} className='ps-2 d-flex align-items-center'>
            <span className='text-dark fw-bold overflow-x-ellipsis'>{withdraw.description || withdraw.outpoint}</span>
          </Col>
          <Col xs={5} className='ps-0 d-flex align-items-center justify-content-end fw-bold text-darker-blue'>
            { withdraw.status === 'complete' ?
              '-' + (formatCurrency((withdraw.debit_msat || 0), Units.MSATS, appConfig.unit, false, 0, 'string'))
            :
              0
            }
          </Col>
        </Row>
        <Row className='d-flex justify-content-between align-items-center'>
          <Col xs={7} className='ps-2 pe-0 fs-7 text-light d-flex flex-row'>
            <DateBox dataValue={withdraw.timestamp} dataType={'Timestamp'} showTooltip={false} />
          </Col>
          <Col xs={5} className='ps-0 fs-7 text-light d-flex align-items-center justify-content-end'>
            <FiatBox value={(withdraw.debit_msat || 0)} symbol={fiatConfig.symbol} rate={fiatConfig.rate} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const DepositHeader = ({deposit, appConfig, fiatConfig}) => {
  return (
    <Row className='d-flex justify-content-between align-items-center'>
      <Col xs={2}>
        <IncomingArrowSVG className='me-1' txStatus={deposit.status} />
      </Col>
      <Col xs={10}>
        <Row className='d-flex justify-content-between align-items-center'>
          <Col xs={7} className='ps-2 d-flex align-items-center'>
            <span className='text-dark fw-bold overflow-x-ellipsis'>{deposit.description || deposit.withdraw_hash}</span>
          </Col>
          <Col xs={5} className='ps-0 d-flex align-items-center justify-content-end fw-bold text-darker-blue'>
            {deposit.paid_at ?
              <span>{'+' + (formatCurrency((deposit.msatoshi_received || 0), Units.MSATS, appConfig.unit, false, 8, 'string'))}</span>
            :
              (formatCurrency((deposit.msatoshi || 0), Units.MSATS, appConfig.unit, false, 8, 'string'))
            }
          </Col>
        </Row>
        <Row className='d-flex justify-content-between align-items-center'>
          <Col xs={7} className='ps-2 pe-0 fs-7 text-light d-flex flex-row align-items-center'>
            {deposit.paid_at ? <span className='me-1'>Paid at</span> : 
              deposit.expires_at > TODAY ?
                <span className='me-1 text-valid'>Valid till</span>
              :
                <span className='me-1 text-invalid'>Expired at</span>
            }
            <DateBox dataValue={deposit.paid_at ? deposit.paid_at : deposit.expires_at} dataType={''} showTooltip={false} />
          </Col>
          <Col xs={5} className='ps-0 fs-7 text-light d-flex align-items-center justify-content-end'>
            <FiatBox value={(deposit.paid_at ? deposit.msatoshi_received : deposit.msatoshi)} symbol={fiatConfig.symbol} rate={fiatConfig.rate} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const BTCTransactionsAccordion = ({ i, expanded, setExpanded, initExpansions, transaction, appConfig, fiatConfig }) => {
  return (
    <>
      <motion.header
        className='btc-transaction-header'
        initial={false}
        animate={{ backgroundColor: ((appConfig.appMode === ApplicationModes.DARK) ? (expanded[i] ? '#0C0C0F' : 'transparent') : (expanded[i] ? '#EBEFF9' : 'transparent')) }}
        transition={{ duration: 1 }}
        onClick={() => { initExpansions[i]=!expanded[i]; return setExpanded(initExpansions); }}>
        {transaction.type === 'PAYMENT' ? <WithdrawHeader withdraw={transaction} appConfig={appConfig} fiatConfig={fiatConfig} /> : <DepositHeader deposit={transaction} appConfig={appConfig} fiatConfig={fiatConfig} /> }
      </motion.header>
      <AnimatePresence initial={false}>
        {expanded[i] && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Transaction transaction={transaction} />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export const BTCTransactionsList = () => {
  const appCtx = useContext(AppContext);
  const initExpansions = (appCtx.listBitcoinTransactions.btcTransactions?.reduce((acc: boolean[], curr) => [...acc, false], []) || []);
  const [expanded, setExpanded] = useState<boolean[]>(initExpansions);

  return (
    appCtx.listBitcoinTransactions.isLoading ?
      <span className='h-100 d-flex justify-content-center align-items-center'>
        <Spinner animation='grow' variant='primary' />
      </span> 
    : 
    appCtx.listBitcoinTransactions.error ? 
      <Alert className='py-0 px-1 fs-8' variant='danger'>{appCtx.listBitcoinTransactions.error}</Alert> : 
      appCtx.listBitcoinTransactions?.btcTransactions && appCtx.listBitcoinTransactions?.btcTransactions.length && appCtx.listBitcoinTransactions?.btcTransactions.length > 0 ?
        <div className='btc-transactions-list'>
          { 
            appCtx.listBitcoinTransactions?.btcTransactions?.map((transaction, i) => (
              <BTCTransactionsAccordion key={i} i={i} expanded={expanded} setExpanded={setExpanded} initExpansions={initExpansions} transaction={transaction} appConfig={appCtx.appConfig} fiatConfig={appCtx.fiatConfig} />
            ))
          }
        </div>
      :
        <div className='fs-7 mt-2'>{!(appCtx.listChannels?.activeChannels && appCtx.listChannels.activeChannels.length && appCtx.listChannels.activeChannels.length > 0) ? 'No transaction found. Click send/receive to start!' : 'No transaction found. Open channel to start!'}</div>
  );
};

export default BTCTransactionsList;
