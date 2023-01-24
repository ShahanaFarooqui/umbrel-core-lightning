import './Transactions.scss';

import ListGroup from 'react-bootstrap/ListGroup';
import { formatCurrency } from '../../utilities/data-formatters';
import { AppContext } from '../../store/AppContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const Transactions = () => {
  const appCtx = useContext(AppContext);

  // created_at?: number; ||  (paid_at?: number; ||   expires_at?: number;)
  // type: bolt11 || bolt12
	// (payment_hash || label) || (description || label)
	// (msatoshi_sent || msatoshi)	|| (msatoshi_received || msatoshi)
  // status?: string;

  return (
    <ListGroup as='ul' variant='flush'>
      { appCtx.listLightningTransactions.isLoading ? 
          <Spinner animation='grow' variant='primary' /> : 
        appCtx.listLightningTransactions.error ? 
          <Alert className='py-0 px-1 fs-11' variant='danger'>{appCtx.listLightningTransactions.error}</Alert> : 
          appCtx.listLightningTransactions?.transactions?.map((transaction, i) => 
            <ListGroup.Item key={i} as='li' className='d-flex justify-content-between align-items-start'>
              <div className='ms-2 me-auto text-dark'>
                { (transaction.expires_at) ?
                  <>
                    <h4>Invoice</h4>
                    <div className='fw-bold'>{transaction.expires_at}</div>
                    {transaction.status}
                    {formatCurrency(transaction.msatoshi_received || 0)}
                  </>
                :
                  <>
                    <h4>Payment</h4>
                    <div className='fw-bold'>{transaction.created_at}</div>
                    {transaction.status}
                    {formatCurrency( transaction.msatoshi_sent || 0)}
                  </>
                }
              </div>
            </ListGroup.Item>
          )
      }
    </ListGroup>
  );
};

export default Transactions;
