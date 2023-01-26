import './ToastMessage.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = (props) => {
  return (
    <ToastContainer position={props.position || 'bottom-center'}>
      <Toast show={props.show} onClose={props.onClose} delay={props.delay || 2000} bg={props.bg || 'light'} autohide className={props.className || 'd-flex align-items-center justify-content-center'}>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
