import './NodeInfo.scss';

import {QRCodeCanvas} from 'qrcode.react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import { useContext, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { CopySVG } from '../../../svgs/Copy';
import ToastMessage from '../ToastMessage/ToastMessage';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const NodeInfo = (props) => {
  const [showToast, setShowToast] = useState(false);
  const appCtx = useContext(AppContext);

  const copyHandler = () => {
    navigator.clipboard.writeText(appCtx.nodeInfo.id || '');
    setShowToast(true);
  }
  
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered className='modal-lg'>
        <Modal.Header className='d-flex align-items-start justify-content-end pb-0'>
          <FontAwesomeIcon icon={faCircleXmark} onClick={props.onHide} size='lg' />
        </Modal.Header>
        <Modal.Body className='py-0'>
          <Row className='d-flex align-items-start justify-content-center pt-2'>
            <QRCodeCanvas value={appCtx.nodeInfo.id || ''} size={190} includeMargin={true} />
            <h4 className='text-dark fw-bold d-flex justify-content-center pt-4'>Node ID</h4>
            <p className='w-75 text-break text-dark d-flex justify-content-center'>
              Other Lightning nodes can open payment channels to your node following this Node ID.            
            </p>
            <div className='mb-4 text-break text-dark d-flex justify-content-center'>
            <InputGroup className="mb-3">
              <Form.Control 
                onClick={copyHandler}
                placeholder={appCtx.nodeInfo.id}
                aria-label={appCtx.nodeInfo.id}
                aria-describedby='copy-addon'
                readOnly
              />
              <InputGroup.Text className='form-control-addon' onClick={copyHandler}>
                <CopySVG />              
              </InputGroup.Text>
            </InputGroup>
            </div>
          </Row>
        </Modal.Body>
        <ToastMessage message='Copied' position='top-center' bg='primary' show={showToast} onClose={() => setShowToast(false)} />
      </Modal>
    </>
  );
}

export default NodeInfo;
