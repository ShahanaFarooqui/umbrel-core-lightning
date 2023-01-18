import './Transactions.scss';

import ListGroup from 'react-bootstrap/ListGroup';
import { formatCurrency } from '../../utilities/data-formatters';

const Transactions = (props) => {
  return (
    <ListGroup as='ul' variant='flush'>
      {props.transactions.map(transaction => 
        <ListGroup.Item key={transaction.key} as='li' className='d-flex justify-content-between align-items-start'>
          <div className='ms-2 me-auto text-dark'>
            <div className='fw-bold'>{transaction.title}</div>
              {formatCurrency(transaction.amount)}
          </div>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default Transactions;
