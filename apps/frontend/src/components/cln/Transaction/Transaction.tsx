import './Transaction.scss';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { CopySVG } from '../../../svgs/Copy';
import { AppContext } from '../../../store/AppContext';
import DateBox from '../../shared/DateBox/DateBox';
import { formatCurrency } from '../../../utilities/data-formatters';
import { Units } from '../../../utilities/constants';

const Transaction = (props) => {
  const appCtx = useContext(AppContext);
  
  const copyHandler = (event) => {
    switch (event.target.id) {
      case 'Destination':
        navigator.clipboard.writeText(props.transaction.destination || '');
        break;
      case 'Invoice':
        navigator.clipboard.writeText(props.transaction.bolt11 || props.transaction.bolt12 || '');
        break;
      case 'Preimage':
        navigator.clipboard.writeText(props.transaction.payment_preimage || '');
        break;
      default:
        navigator.clipboard.writeText(props.transaction.payment_hash || '');
        break;
    }
    appCtx.setShowToast({show: true, message: (event.target.id + ' Copied Successfully!'), bg: 'success'});
  }

  return (
    <motion.div
        variants={{ collapsed: { scale: 0.8, opacity: 0 }, open: { scale: 1, opacity: 1 } }}
        transition={{ duration: 0.3 }}
        className='transaction-placeholder'
      >
      {props.transaction.msatoshi ?        
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Fee (mSATS)</Col>
          <Col xs={11} className='fs-7 overflow-x-ellipsis'>
            {props.transaction.msatoshi_sent ? 
              formatCurrency((props.transaction.msatoshi_sent - props.transaction.msatoshi), Units.MSATS, Units.MSATS, false, 0, 'string')
            :
              formatCurrency((props.transaction.msatoshi_received - props.transaction.msatoshi), Units.MSATS, Units.MSATS, false, 0, 'string')
            }
          </Col>
        </Row>
        :
        <></>
      }
      {props.transaction.label ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Label</Col>
          <Col xs={11} className='fs-7 overflow-x-ellipsis'>{props.transaction.label}</Col>
        </Row>
        :
        <></>
      }
      {props.transaction.description ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Description</Col>
          <Col xs={11} className='fs-7 overflow-x-ellipsis'>{props.transaction.description}</Col>
        </Row>
      :
        <></>
      }
      {props.transaction.msatoshi ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Invoice Amount (Sats)</Col>
          <Col xs={11} className='fs-7 overflow-x-ellipsis'>
            {formatCurrency((props.transaction.msatoshi), Units.MSATS, appCtx.appConfig.unit, false, 0, 'string')}
          </Col>
        </Row>
      :
        <></>
      }
      {(props.transaction.created_at || props.transaction.paid_at) && props.transaction.expires_at ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Expires At</Col>
          <Col xs={11} className='fs-7 overflow-x-ellipsis'>
            <DateBox dataValue={props.transaction.expires_at} dataType={'Expires At'} showTooltip={false} />
          </Col>
        </Row>
      :
        <></>
      }
      {props.transaction.destination ?
      <Row className='mb-2 w-100 d-flex align-items-center'>
        <Col xs={12} className='fs-7 text-light'>Destination</Col>
        <Col xs={11} className='pe-1 fs-7 overflow-x-ellipsis'>{props.transaction.destination}</Col>
        <Col xs={1} onClick={copyHandler} className='transaction-copy'><CopySVG id='Destination' showTooltip={true} /></Col>
      </Row>
      :
        <></>
      }
      {(props.transaction.bolt11 || props.transaction.bolt12) ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Invoice</Col>
          <Col xs={11} className='pe-1 fs-7 overflow-x-ellipsis'>{props.transaction.bolt11 || props.transaction.bolt12}</Col>
          <Col xs={1} onClick={copyHandler} className='transaction-copy'><CopySVG id='Invoice' showTooltip={true} /></Col>
        </Row>
      :
        <></>
      }
      {props.transaction.payment_hash ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Payment Hash</Col>
          <Col xs={11} className='pe-1 fs-7 overflow-x-ellipsis'>{props.transaction.payment_hash}</Col>
          <Col xs={1} onClick={copyHandler} className='transaction-copy'><CopySVG id='Payment Hash' showTooltip={true} /></Col>
        </Row>
      :
        <></>
      }
      {props.transaction.payment_preimage ?
        <Row className='mb-2 w-100 d-flex align-items-center'>
          <Col xs={12} className='fs-7 text-light'>Preimage</Col>
          <Col xs={11} className='pe-1 fs-7 overflow-x-ellipsis'>{props.transaction.payment_preimage}</Col>
          <Col xs={1} onClick={copyHandler} className='transaction-copy'><CopySVG id='Preimage' showTooltip={true} /></Col>
        </Row>
      :
        <></>
      }
    </motion.div>    
  );
};

export default Transaction;
