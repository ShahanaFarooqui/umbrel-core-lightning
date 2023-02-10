import './ToastMessage.scss';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

const ToastMessage = (props) => {
  return (
    <ToastContainer position={props.position || 'bottom-center'}>
      <Toast show={props.show} onClose={props.onClose} delay={props.delay || 3000} bg={props.bg || 'light'} autohide className={props.className || 'd-flex align-items-center justify-content-center'}>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
