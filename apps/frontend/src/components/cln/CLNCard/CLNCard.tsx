import './CLNCard.scss';
import { useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import CLNWallet from '../CLNWallet/CLNWallet';
import CLNReceive from '../CLNReceive/CLNReceive';
import CLNSend from '../CLNSend/CLNSend';

const CLNCard = (props) => {

  return (
    <Col className='slider-child'>
      {props.selCLNCard === 'wallet' ? (
        <CLNWallet onActionClick={(action) => props.onCardChange(action)} />
      ) : props.selCLNCard === 'receive' ? (
        <CLNReceive onClose={() => props.onCardChange('wallet')} />
      ) : (
        <CLNSend onClose={() => props.onCardChange('wallet')} />
      )}
    </Col>
  );
};

export default CLNCard;
