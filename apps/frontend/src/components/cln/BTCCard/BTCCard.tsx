import './BTCCard.scss';
import { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Card from 'react-bootstrap/Card';

import BTCWallet from '../BTCWallet/BTCWallet';
import BTCDeposit from '../BTCDeposit/BTCDeposit';
import BTCWithdraw from '../BTCWithdraw/BTCWithdraw';

const BTCCard = () => {
  const [selBTCCard, setSelBTCCard] = useState('wallet');

  return (
    <Card className='h-100 overflow-hidden inner-box-shadow'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          key={selBTCCard}
          classNames={selBTCCard === 'wallet' ? 'slide-right-to-left' : 'slide-left-to-right'}
          mountOnEnter
          unmountOnExit
        >
          {selBTCCard === 'wallet' ? (
            <BTCWallet onActionClick={(action) => setSelBTCCard(action)} />
          ) : selBTCCard === 'deposit' ? (
            <BTCDeposit onClose={() => setSelBTCCard('wallet')} />
          ) : (
            <BTCWithdraw onClose={() => setSelBTCCard('wallet')} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </Card>
  );
};

export default BTCCard;
