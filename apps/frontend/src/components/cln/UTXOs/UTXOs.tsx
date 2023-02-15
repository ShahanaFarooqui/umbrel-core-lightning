import './UTXOs.scss';
import { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import { AppContext } from '../../../store/AppContext';
import { formatCurrency, titleCase } from '../../../utilities/data-formatters';
import { ReservedSVG } from '../../../svgs/Reserved';
import { UnReservedSVG } from '../../../svgs/UnReserved';
import FiatBox from '../../shared/FiatBox/FiatBox';
import { Units } from '../../../utilities/constants';

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
          <ListGroup.Item key={(utxo.txid || '') + utxo.output} as='li' className='ps-0 text-dark'>
            <Row className='d-flex justify-content-between align-items-center'>
              <Col xs={7} className='d-flex align-items-center'>
                {utxo.reserved ? <ReservedSVG className='minw-12px' /> : <UnReservedSVG className='minw-12px' />}
                <OverlayTrigger
                  placement='auto'
                  delay={{ show: 250, hide: 250 }}
                  overlay={<Tooltip>{titleCase(utxo.status)}</Tooltip>}
                  >
                  <div className={'d-inline-block mx-1 dot ' + (utxo.status === 'confirmed' ? 'bg-success' : 'bg-warning')}></div>
                </OverlayTrigger>
                <span className='fw-bold overflow-x-ellipsis'>{utxo.txid}</span>
              </Col>
              <Col xs={4} className='d-flex align-items-center justify-content-end'>
                {formatCurrency((utxo.value || 0), Units.SATS, appCtx.appConfig.unit, false, 5, 'string')}
              </Col>
              <Col xs={7} className='fs-7 text-light'>
                {utxo.blockheight ? ((utxo.blockheight || 0).toLocaleString('en-us')) : ''}
              </Col>
              <Col xs={4} className='fs-7 text-light d-flex align-items-center justify-content-end'>
                <FiatBox value={utxo.value} symbol={appCtx.fiatConfig.symbol} rate={appCtx.fiatConfig.rate} />
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
  );
};

export default UTXOs;
