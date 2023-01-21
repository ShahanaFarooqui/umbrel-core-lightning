import './Transactions.scss';

import ListGroup from 'react-bootstrap/ListGroup';
import { formatCurrency } from '../../utilities/data-formatters';
import { Invoice } from '../../types/lightning-wallet.type';

const Transactions = (props) => {
  const newTransactions: any = [...props.invoices, ...props.payments];
  // Check both arrays for loading complete
  // Check both arrays for error response
  // Merge both arrays on created and paid time
  // console.warn(newTransactions);
  // created_at?: number; ||  (paid_at?: number; ||   expires_at?: number;)
  // type: bolt11 || bolt12
	// (payment_hash || label) || (description || label)
	// (msatoshi_sent || msatoshi)	|| (msatoshi_received || msatoshi)
  // status?: string;

  return (
    <ListGroup as='ul' variant='flush'>
      {props.invoices.map((invoice: Invoice) => 
        <ListGroup.Item key={invoice.expires_at} as='li' className='d-flex justify-content-between align-items-start'>
          <div className='ms-2 me-auto text-dark'>
            <div className='fw-bold'>{invoice.description}</div>
              {formatCurrency(invoice.msatoshi_received || 0)}
          </div>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default Transactions;
