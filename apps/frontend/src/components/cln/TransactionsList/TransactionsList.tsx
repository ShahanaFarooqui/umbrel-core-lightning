import './TransactionsList.scss';
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
import Transaction from '../Transaction/Transaction';
import { ApplicationModes, SATS_MSAT } from '../../../utilities/constants';

const TransactionsAccordion = ({ i, expanded, setExpanded, transaction, appConfig, fiatConfig }) => {
  return (
    <>
      <motion.header
        className='transaction-header'
        initial={false}
        animate={{ backgroundColor: ((appConfig.appMode === ApplicationModes.DARK) ? (expanded[i] ? '#0C0C0F' : '#2A2A2C') : (expanded[i] ? '#EBEFF9' : '#FFFFFF')) }}
        onClick={() => { let newExpanded = [...expanded]; newExpanded[i]=!expanded[i]; return setExpanded(newExpanded); }}>
        <Row className='d-flex justify-content-between align-items-center'>
          <Col xs={2}>
            {transaction.type === 'PAYMENT' ? <OutgoingArrowSVG className='me-1' txStatus={transaction.status} /> : <IncomingArrowSVG className='me-1' txStatus={transaction.status} />}
          </Col>
          <Col xs={10}>
            <Row className='d-flex justify-content-between align-items-center'>
              <Col xs={7} className='ps-2 d-flex align-items-center'>
                <span className='fw-bold overflow-x-ellipsis'>{transaction.payment_hash}</span>
              </Col>
              <Col xs={4} className='ps-0 d-flex align-items-center justify-content-end'>
                {(transaction.type === 'PAYMENT' ? '-' : '+') + (formatCurrency(((transaction.msatoshi_sent || transaction.msatoshi_received || 0) / SATS_MSAT), appConfig.unit))}
              </Col>
            </Row>
            <Row className='d-flex justify-content-between align-items-center'>
              <Col xs={7} className='ps-2 pe-0 fs-7 text-light'>
                <DateBox dataValue={(transaction.created_at || transaction.paid_at || transaction.expires_at)} dataType={(transaction.created_at ? 'Created At' : transaction.paid_at ? 'Paid At' : 'Expires At')} showTooltip={true} />
              </Col>
              <Col xs={4} className='ps-0 fs-7 text-light d-flex align-items-center justify-content-end'>
                <FiatBox value={(transaction.msatoshi_sent || transaction.msatoshi_received || 0)} symbol={fiatConfig.symbol} rate={fiatConfig.rate} />
              </Col>
            </Row>
          </Col>
        </Row>
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

export const TransactionsList = () => {
  const appCtx = useContext(AppContext);
  const [expanded, setExpanded] = useState<boolean[]>((appCtx.listLightningTransactions.transactions?.reduce((acc: boolean[], curr) => [...acc, false], []) || []));

  return (
    appCtx.listLightningTransactions.isLoading ?
      <span className='h-100 d-flex justify-content-center align-items-center'>
        <Spinner animation='grow' variant='primary' />
      </span> 
    : 
    appCtx.listLightningTransactions.error ? 
      <Alert className='py-0 px-1 fs-8' variant='danger'>{appCtx.listLightningTransactions.error}</Alert> : 
      <div className='transactions-list'>
        { 
          appCtx.listLightningTransactions?.transactions?.map((transaction, i) => (
            <TransactionsAccordion key={i} i={i} expanded={expanded} setExpanded={setExpanded} transaction={transaction} appConfig={appCtx.appConfig} fiatConfig={appCtx.fiatConfig} />
          ))
        }
      </div>
  );
};

export default TransactionsList;
