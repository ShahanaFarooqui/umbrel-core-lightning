import './NodeInfo.scss';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {QRCodeCanvas} from 'qrcode.react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { AppContext } from '../../../store/AppContext';
import { CopySVG } from '../../../svgs/Copy';
import ToastMessage from '../../shared/ToastMessage/ToastMessage';

const NodeInfo = (props) => {
  const appCtx = useContext(AppContext);
  const [showToast, setShowToast] = useState(false);

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
            <QRCodeCanvas value={appCtx.nodeInfo.id || ''} size={220} includeMargin={true} />
            <h4 className='text-dark fw-bold d-flex justify-content-center pt-4'>Node ID</h4>
            <p className='py-3 w-75 text-break text-dark d-flex justify-content-center'>
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
                <CopySVG id={appCtx.nodeInfo.id} />              
              </InputGroup.Text>
            </InputGroup>
            </div>
          </Row>
        </Modal.Body>
        <ToastMessage message='Node ID Copied!' position='top-center' bg='primary' show={showToast} onClose={() => setShowToast(false)} />
      </Modal>
    </>
  );
}

export default NodeInfo;
