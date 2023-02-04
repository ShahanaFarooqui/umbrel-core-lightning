import './BTCCard.scss';
import { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import BTCWallet from '../BTCWallet/BTCWallet';
import BTCDeposit from '../BTCDeposit/BTCDeposit';
import BTCWithdraw from '../BTCWithdraw/BTCWithdraw';

const BTCCard = () => {
  const [showBTCWallet, setShowBTCWallet] = useState('wallet');
  const btcRef = useRef<any>(null);

  return (
    <Card className='h-100'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          nodeRef={btcRef}
          addEndListener={(done: () => void) => {
            btcRef.current?.addEventListener('transitionend', done, false);
          }}
          classNames='slide-component'
          key={showBTCWallet.toString()}
          mountOnEnter
          unmountOnExit
        >
          <Col ref={btcRef}>
            {showBTCWallet === 'wallet' ? (
              <BTCWallet
                onDepositClick={() => setShowBTCWallet('deposit')}
                onWithdrawClick={() => setShowBTCWallet('withdraw')}
              />
            ) : showBTCWallet === 'deposit' ? (
              <BTCDeposit address={'Shahana'} onClose={() => setShowBTCWallet('wallet')} />
            ) : (
              <BTCWithdraw onClose={() => setShowBTCWallet('wallet')} />
            )}
          </Col>
        </CSSTransition>
      </SwitchTransition>
    </Card>
  );
};

export default BTCCard;
