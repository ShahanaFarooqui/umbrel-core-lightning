import './CLNCard.scss';
import { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import CLNWallet from '../CLNWallet/CLNWallet';
import CLNReceive from '../CLNReceive/CLNReceive';
import CLNSend from '../CLNSend/CLNSend';

const CLNCard = () => {
  const [showCLNWallet, setShowCLNWallet] = useState('wallet');
  const clnRef = useRef<any>(null);

  return (
    <Card className='h-100'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          nodeRef={clnRef}
          addEndListener={(done: () => void) => {
            clnRef.current?.addEventListener('transitionend', done, false);
          }}
          classNames='slide-component'
          key={showCLNWallet.toString()}
          mountOnEnter
          unmountOnExit
        >
          <Col ref={clnRef}>
            {showCLNWallet === 'wallet' ? (
              <CLNWallet
                onReceiveClick={() => setShowCLNWallet('receive')}
                onSendClick={() => setShowCLNWallet('send')}
              />
            ) : showCLNWallet === 'receive' ? (
              <CLNReceive onClose={() => setShowCLNWallet('wallet')} />
            ) : (
              <CLNSend onClose={() => setShowCLNWallet('wallet')} />
            )}
          </Col>
        </CSSTransition>
      </SwitchTransition>
    </Card>
  );
};

export default CLNCard;
