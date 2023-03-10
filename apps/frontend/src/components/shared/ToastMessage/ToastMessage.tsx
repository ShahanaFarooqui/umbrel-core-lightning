import './ToastMessage.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation, faExclamationCircle, faQuestion, faClose } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import Toast from 'react-bootstrap/Toast';
import Col from 'react-bootstrap/Col';

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

  const confirmCloseHandler = (response) => {
    appCtx.setShowToast({...appCtx.showToast, show: false, confirmRes: response});
  }

  return (
    <>
    {
      appCtx.showToast.type === 'CONFIRM' ?
        <motion.div animate={{y}} transition={BOUNCY_SPRING_VARIANTS_3} className='toast-container top-0 w-100 d-flex justify-content-center'>
          <Toast show={appCtx.showToast.show} onClose={closeHandler} delay={appCtx.showToast.delay || 3000} data-bg={appCtx.showToast.bg} className={appCtx.showToast.className || 'd-flex align-items-start justify-content-between'}>
            <Toast.Body className='p-0 w-100 d-flex align-items-start justify-content-start'>
              <Col className='d-flex align-items-stretch justify-content-between'>
                <Col xs={2} className='message-type-box d-flex align-items-center justify-content-center'>
                  <FontAwesomeIcon className='svg-white' size='xl' icon={faQuestion} />
                </Col>
                <Col xs={10} className='p-2'>
                  <Col className='d-flex align-items-center justify-content-between'>
                    {appCtx.showToast.message || 'Default Message!'}
                    <button type="button" className="btn-rounded btn-sm btn btn-outline-primary" onClick={() => confirmCloseHandler(true)}><FontAwesomeIcon className='svg-primary' size='lg' icon={faCheck} /></button>
                    <button type="button" className="btn-rounded btn-sm bg-primary" onClick={() => confirmCloseHandler(false)}><FontAwesomeIcon className='svg-white' size='lg' icon={faClose} /></button>
                  </Col>
                </Col>
              </Col>
            </Toast.Body>
          </Toast>
        </motion.div>
      :
        <motion.div animate={{y}} transition={BOUNCY_SPRING_VARIANTS_3} className='toast-container top-0 w-100 d-flex justify-content-center'>
          <Toast show={appCtx.showToast.show} onClose={closeHandler} delay={appCtx.showToast.delay || 3000} data-bg={appCtx.showToast.bg} autohide className={appCtx.showToast.className || 'd-flex align-items-start justify-content-between'}>
            <Toast.Body className='p-0 w-100 d-flex align-items-stretch justify-content-start'>
              <Col className='d-flex align-items-stretch justify-content-between'>
                <Col xs={2} className='message-type-box d-flex align-items-center justify-content-center'>
                  <FontAwesomeIcon className='svg-white' size='xl' icon={appCtx.showToast.bg === 'success' ? faCheck : appCtx.showToast.bg === 'danger' ? faTriangleExclamation : faExclamationCircle} />
                </Col>
                <Col xs={10} className='p-2'>
                  <Col className='d-flex align-items-center justify-content-between'>
                    {appCtx.showToast.message || 'Default Message!'}
                    <span className='btn-toast-close' onClick={closeHandler}><CloseSVG /></span>
                  </Col>
                </Col>
              </Col>
            </Toast.Body>
          </Toast>
        </motion.div>
    }
    </>
  );
}

export default ToastMessage;
