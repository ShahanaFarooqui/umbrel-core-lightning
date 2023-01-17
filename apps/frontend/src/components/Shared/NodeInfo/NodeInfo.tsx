import './NodeInfo.scss';

import {QRCodeCanvas} from 'qrcode.react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useContext, useState } from 'react';
import { AppContext } from '../../../store/AppContext';

const NodeInfo = (props) => {
  const [btnText, setBtnText] = useState('Copy');
  const appCtx = useContext(AppContext);
  const copyHandler = () => {
    navigator.clipboard.writeText(appCtx.nodeInfo.id || '');
    setBtnText('Copied');
    setTimeout(() => {
      setBtnText('Copy');
    }, 2000);
  }
  
  return (
    <Modal show={props.show} onHide={props.onHide} centered className='modal-lg'>
      <Modal.Header className='d-flex align-items-start justify-content-end pb-0'>
        <FontAwesomeIcon icon={faCircleXmark} onClick={props.onHide} size='lg' />
      </Modal.Header>
      <Modal.Body className='py-0'>
        <Col xs={12} className='d-flex align-items-start justify-content-center'>
          <h4 className='text-dark fw-bold'>Node ID</h4>
        </Col>
        <Row className='d-flex align-items-start justify-content-start pt-2'>
          <Col xs={12} md={4} className='d-flex justify-content-center'>
            <QRCodeCanvas value={appCtx.nodeInfo.id || ''} size={240} includeMargin={false} />
          </Col>
          <Col xs={12} md={8}>
            <p className='text-break'>{appCtx.nodeInfo.id}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={copyHandler}>{btnText}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NodeInfo;
