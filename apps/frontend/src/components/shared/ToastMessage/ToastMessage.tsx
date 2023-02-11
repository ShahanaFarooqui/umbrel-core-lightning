import './ToastMessage.scss';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import { AppContext } from '../../../store/AppContext';
import { CloseSVG } from '../../../svgs/Close';

const ToastMessage = () => {
  const appCtx = useContext(AppContext);
  
  const closeHandler = () => {
    appCtx.setShowToast({...appCtx.showToast, show: false});
  }

  return (
    <ToastContainer position={appCtx.showToast.position || 'top-center'}>
      <Toast show={appCtx.showToast.show} onClose={closeHandler} delay={appCtx.showToast.delay || 3000} data-bg={appCtx.showToast.bg} autohide className={appCtx.showToast.className || 'd-flex align-items-start justify-content-between'}>
        <Toast.Body className='p-0 d-flex align-items-stretch justify-content-start'>
          <div className='message-type-box'>
            <FontAwesomeIcon className='svg-white' size='xl' icon={appCtx.showToast.bg === 'success' ? faCheck : appCtx.showToast.bg === 'danger' ? faTriangleExclamation : faExclamationCircle} />
          </div>
          <span className='message-text'>{appCtx.showToast.message || 'Default Message!'}</span>
        </Toast.Body>
        <span className='btn-toast-close' onClick={closeHandler}><CloseSVG /></span>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
