import './Transactions.scss';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import { AppContext } from '../../../store/AppContext';
import { formatCurrency, formatFiatValue } from '../../../utilities/data-formatters';
import { IncomingArrowSVG } from '../../../svgs/IncomingArrow';
import { OutgoingArrowSVG } from '../../../svgs/OutgoingArrow';
import DateBox from '../../shared/DateBox/DateBox';

const Transactions = () => {
  const appCtx = useContext(AppContext);

  // created_at?: number; ||  (paid_at?: number; ||   expires_at?: number;)
  // type: bolt11 || bolt12
	// (payment_hash || label) || (description || label)
	// (msatoshi_sent || msatoshi)	|| (msatoshi_received || msatoshi)
  // status?: string;

  return (
    appCtx.listLightningTransactions.isLoading ? 
      <span className='h-100 d-flex justify-content-center align-items-center'>
        <Spinner animation='grow' variant='primary' />
      </span> 
    : 
    appCtx.listLightningTransactions.error ? 
      <Alert className='py-0 px-1 fs-8' variant='danger'>{appCtx.listLightningTransactions.error}</Alert> : 
      <ListGroup as='ul' variant='flush'>
        { appCtx.listLightningTransactions?.transactions?.map((transaction, i) => 
          <ListGroup.Item key={i} as='li' className='ps-0 text-dark'>
            <Row className='d-flex justify-content-between align-items-center'>
              <Col xs={2}>
                {transaction.type === 'PAYMENT' ? <OutgoingArrowSVG className='me-1' /> : <IncomingArrowSVG className='me-1' />}
              </Col>
              <Col xs={10}>
                <Row className='d-flex justify-content-between align-items-center'>
                  <Col xs={7} className='px-0 d-flex align-items-center'>
                    <div className={'d-inline-block mx-1 dot ' + ((transaction.status === 'complete' || transaction.status === 'paid') ? 'bg-success' : transaction.status === 'failed' ? 'bg-danger' : 'bg-warning')}></div>
                    <span className='fw-bold overflow-x-ellipsis'>{transaction.payment_hash}</span>                    
                  </Col>
                  <Col xs={4} className='ps-0 d-flex align-items-center justify-content-end'>
                    {(transaction.type === 'PAYMENT' ? '-' : '+') + (formatCurrency((transaction.msatoshi_sent || transaction.msatoshi_received || 0), appCtx.appConfig.unit))}
                  </Col>
                </Row>
                <Row className='d-flex justify-content-between align-items-center'>
                  <Col xs={7} className='px-0 fs-7 text-light'>
                    <DateBox dataValue={(transaction.created_at || transaction.paid_at || transaction.expires_at)} />
                  </Col>
                  <Col xs={4} className='ps-0 fs-7 text-light d-flex align-items-center justify-content-end'>
                    { appCtx.fiatConfig ? <FontAwesomeIcon icon={appCtx.fiatConfig.symbol} /> : <></> }
                    {formatFiatValue((transaction.msatoshi_sent || transaction.msatoshi_received || 0), appCtx.fiatConfig.rate)}
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
  );
};

export default Transactions;
