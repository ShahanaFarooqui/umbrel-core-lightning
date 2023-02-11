import './ToastMessage.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import Toast from 'react-bootstrap/Toast';

import { BOUNCY_SPRING_VARIANTS_3 } from '../../../utilities/constants';
import { AppContext } from '../../../store/AppContext';
import { CloseSVG } from '../../../svgs/Close';

const ToastMessage = () => {
  const appCtx = useContext(AppContext);
  const [y, setY] = useState('0');

  useEffect(() => {
    setY((appCtx.showToast.show ? '3rem' : '0'));
  }, [appCtx.showToast.show]);
  
  const closeHandler = () => {
    appCtx.setShowToast({...appCtx.showToast, show: false});
  }

  return (
    <motion.div animate={{y}} transition={BOUNCY_SPRING_VARIANTS_3} className='toast-container top-0 w-100 d-flex justify-content-center'>
      <Toast show={appCtx.showToast.show} onClose={closeHandler} delay={appCtx.showToast.delay || 3000} data-bg={appCtx.showToast.bg} autohide className={appCtx.showToast.className || 'd-flex align-items-start justify-content-between'}>
        <Toast.Body className='p-0 d-flex align-items-stretch justify-content-start'>
          <div className='message-type-box'>
            <FontAwesomeIcon className='svg-white' size='xl' icon={appCtx.showToast.bg === 'success' ? faCheck : appCtx.showToast.bg === 'danger' ? faTriangleExclamation : faExclamationCircle} />
          </div>
          <span className='message-text'>{appCtx.showToast.message || 'Default Message!'}</span>
        </Toast.Body>
        <span className='btn-toast-close' onClick={closeHandler}><CloseSVG /></span>
      </Toast>
    </motion.div>
  );
}

export default ToastMessage;
