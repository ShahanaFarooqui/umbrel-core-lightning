import './UTXOs.scss';

import ListGroup from 'react-bootstrap/ListGroup';
import { formatCurrency, formatFiatValue } from '../../utilities/data-formatters';
import { AppContext } from '../../store/AppContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { ReservedSVG } from '../../svgs/Reserved';
import Col from 'react-bootstrap/Col';
import { UnReservedSVG } from '../../svgs/UnReserved';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UTXOs = () => {
  const appCtx = useContext(AppContext);

  return (
    appCtx.listFunds.isLoading ? 
      <span className='h-100 d-flex justify-content-center align-items-center'>
        <Spinner animation='grow' variant='primary' />
      </span> 
    : 
    appCtx.listFunds.error ? 
      <Alert className='py-0 px-1 fs-8' variant='danger'>{appCtx.listFunds.error}</Alert> : 
      <ListGroup as='ul' variant='flush'>
        { appCtx.listFunds.outputs?.map(utxo => 
          <ListGroup.Item key={utxo.txid} as='li' className='px-0 text-dark'>
            <Row className='flex-fill d-flex justify-content-between align-items-center'>
              <Col xs={8} className='d-flex align-items-center'>
                {utxo.reserved ? <ReservedSVG className='minw-12px' /> : <UnReservedSVG className='minw-12px' />}
                <div className={'d-inline-block mx-1 dot ' + (utxo.status === 'confirmed' ? 'bg-success' : 'bg-warning')}></div>
                <span className='fw-bold overflow-x-ellipsis'>{utxo.txid}</span>
              </Col>
              <Col xs={3}>
                {formatCurrency((utxo.value || 0), appCtx.appConfig.unit)}
              </Col>
              <Col xs={8} className='fs-7 text-light'>
                {utxo.blockheight ? ((utxo.blockheight || 0).toLocaleString('en-us')) : ''}
              </Col>
              <Col xs={3} className='fs-7 text-light'>
                { appCtx.fiatConfig ? <FontAwesomeIcon className='me-1' icon={appCtx.fiatConfig.symbol} /> : <></> }
                {formatFiatValue((utxo.value || 0), appCtx.fiatConfig.rate)}
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
  );
};

export default UTXOs;
