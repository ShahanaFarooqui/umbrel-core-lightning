import './ToastMessage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTriangleExclamation, faExclamation } from '@fortawesome/free-solid-svg-icons'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import { CloseSVG } from '../../../svgs/Close';

const ToastMessage = (props) => {
  return (
    <ToastContainer position={props.position || 'bottom-center'}>
      <Toast show={props.show} onClose={props.onClose} delay={props.delay || 3000000} data-bg={props.bg} autohide className={props.className || 'd-flex align-items-start justify-content-between'}>
        <Toast.Body className='p-0 d-flex align-items-stretch justify-content-start'>
          <div className='message-type-box'>
            <FontAwesomeIcon className='svg-white' size='xl' icon={props.bg === 'success' ? faCheck : props.bg === 'danger' ? faTriangleExclamation : faExclamation} />
          </div>
          <span className='message-text'>{props.message}</span>
        </Toast.Body>
        <span className='btn-toast-close' onClick={props.onClose}><CloseSVG /></span>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
