import './CLNCard.scss';
import { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Card from 'react-bootstrap/Card';

import CLNWallet from '../CLNWallet/CLNWallet';
import CLNReceive from '../CLNReceive/CLNReceive';
import CLNSend from '../CLNSend/CLNSend';

const CLNCard = () => {
  const [selCLNCard, setSelCLNCard] = useState('wallet');

  return (
    <Card className='h-100'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={selCLNCard}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames='fade-component'
          // classNames={selCLNCard === 'wallet' ? 'slide-right-to-left' : 'slide-left-to-right'}
        >
          {selCLNCard === 'wallet' ? (
            <CLNWallet onActionClick={(action) => setSelCLNCard(action)} />
          ) : selCLNCard === 'receive' ? (
            <CLNReceive onClose={() => setSelCLNCard('wallet')} />
          ) : (
            <CLNSend onClose={() => setSelCLNCard('wallet')} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </Card>
  );
};

export default CLNCard;
