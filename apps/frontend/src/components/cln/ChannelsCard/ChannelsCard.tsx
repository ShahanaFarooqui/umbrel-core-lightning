import './ChannelsCard.scss';
import { useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Channels from '../Channels/Channels';
import OpenChannel from '../OpenChannel/OpenChannel';

const ChannelsCard = () => {
  const [showOpenChannel, setShowOpenChannel] = useState(false);
  const channelsRef = useRef<any>(null);

  return (
    <Card className='h-100'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          nodeRef={channelsRef}
          addEndListener={(done: () => void) => {
            channelsRef.current?.addEventListener('transitionend', done, false);
          }}
          classNames='slide-component'
          key={showOpenChannel.toString()}
          mountOnEnter
          unmountOnExit
        >
          <Col ref={channelsRef}>
            {showOpenChannel ? (
              <OpenChannel onClose={() => setShowOpenChannel(false)} />
            ) : (
              <Channels onOpenChannel={() => setShowOpenChannel(true)} />
            )}
          </Col>
        </CSSTransition>
      </SwitchTransition>
    </Card>
  );
};

export default ChannelsCard;
