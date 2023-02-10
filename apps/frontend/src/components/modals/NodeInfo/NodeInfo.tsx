import './NodeInfo.scss';
import { useContext, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'

import { AppContext } from '../../../store/AppContext';
import { CopySVG } from '../../../svgs/Copy';
import ToastMessage from '../../shared/ToastMessage/ToastMessage';
import { ApplicationModes } from '../../../utilities/constants';
import { CloseSVG } from '../../../svgs/Close';

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
          <span className='span-close-svg' onClick={props.onHide}><CloseSVG /></span>
        </Modal.Header>
        <Modal.Body className='py-0'>
          <Row className='qr-container d-flex align-items-start justify-content-center pt-2'>
            <Image className='qr-cln-logo' src={appCtx.appConfig.appMode === ApplicationModes.DARK ? 'images/cln-logo-dark.png' : 'images/cln-logo-light.png'} />
            <QRCodeCanvas value={appCtx.nodeInfo.id || ''} size={220} includeMargin={true} />
          </Row>
          <Row className='qr-container d-flex align-items-start justify-content-center pt-2'>
            <h4 className='text-blue fw-bold d-flex justify-content-center pt-4'>Node ID</h4>
            <p className='py-3 w-75 text-break text-dark d-flex justify-content-center'>
              Other Lightning nodes can open payment channels to your node following this Node ID.            
            </p>
            <div className='mb-4 text-break text-dark d-flex justify-content-center'>
            <InputGroup className='mb-3'>
              <Form.Control 
                onClick={copyHandler}
                placeholder={appCtx.nodeInfo.id}
                aria-label={appCtx.nodeInfo.id}
                aria-describedby='copy-addon'
                className='form-control-left'
                readOnly
              />
              <InputGroup.Text className='form-control-addon form-control-addon-right' onClick={copyHandler}>
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
