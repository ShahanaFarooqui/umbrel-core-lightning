import './UTXOs.scss';

import ListGroup from 'react-bootstrap/ListGroup';
import { formatCurrency } from '../../utilities/data-formatters';
import { AppContext } from '../../store/AppContext';
import { useContext } from 'react';

const UTXOs = () => {
  const appCtx = useContext(AppContext);

  return (
    <ListGroup as='ul' variant='flush'>
      {appCtx.listFunds.outputs?.map(utxo => 
        <ListGroup.Item key={utxo.txid} as='li' className='d-flex justify-content-between align-items-start'>
          <div className='ms-2 me-auto text-dark'>
            <div className='fw-bold'>{utxo.txid}</div>
            <div >{utxo.output}</div>
              {formatCurrency(utxo.value || 0)}
              <div>{utxo.blockheight}</div>
              <div>{utxo.reserved}</div>
              <div>{utxo.status}</div>
          </div>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default UTXOs;
