import './ChannelsCard.scss';
import { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Card from 'react-bootstrap/Card';

import Channels from '../Channels/Channels';
import OpenChannel from '../OpenChannel/OpenChannel';

const ChannelsCard = () => {
  const [showOpenChannel, setShowOpenChannel] = useState(false);

  return (
    <Card className='h-100'>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          addEndListener={(node, done) => {
            node.addEventListener('transitionend', done, false);
          }}
          classNames='fade-component'
          key={showOpenChannel.toString()}
          mountOnEnter
          unmountOnExit
        >
          {showOpenChannel ? (
            <OpenChannel onClose={() => setShowOpenChannel(false)} />
          ) : (
            <Channels onOpenChannel={() => setShowOpenChannel(true)} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </Card>
  );
};

export default ChannelsCard;
