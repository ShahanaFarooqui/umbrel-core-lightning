import './ChannelsCard.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from 'react-bootstrap/Card';

import Channels from '../Channels/Channels';
import OpenChannel from '../OpenChannel/OpenChannel';

const ChannelsCard = () => {
  const [showOpenChannel, setShowOpenChannel] = useState(false);

  return (
    <Card className='h-100 overflow-hidden inner-box-shadow'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={showOpenChannel.toString()}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='h-100 overflow-hidden'
        >
          {showOpenChannel ? (
            <OpenChannel onClose={() => setShowOpenChannel(false)} />
          ) : (
            <Channels onOpenChannel={() => setShowOpenChannel(true)} />
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default ChannelsCard;
