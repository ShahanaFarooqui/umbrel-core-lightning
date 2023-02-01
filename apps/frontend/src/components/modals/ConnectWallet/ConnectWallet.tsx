import './ConnectWallet.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/esm/Form';
import Image from 'react-bootstrap/Image'

import { LOCAL_HOST, TOR_HOST, MACAROON, PORT } from '../../../utilities/constants';
import { CopySVG } from '../../../svgs/Copy';
import ToastMessage from '../../shared/ToastMessage/ToastMessage';

const NETWORK_TYPES = ['Local Network', 'Tor']

const ConnectWallet = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selNetwork, setSelNetwork] = useState(0);
  const [clnConnectUrl, setClnConnectUrl] = useState('c-lightning-rest://' + LOCAL_HOST + ':' + PORT + '?macaroon=' + MACAROON + '&protocol=http');

  const copyHandler = (event) => {
    switch (event.target.id) {
      case 'REST Port':
        navigator.clipboard.writeText(PORT || '');
        break;
      case 'Host':
        navigator.clipboard.writeText((selNetwork === 0 ? LOCAL_HOST : TOR_HOST) || '');
        break;
      case 'Macaroon':
        navigator.clipboard.writeText(MACAROON || '');
        break;
      default:
        navigator.clipboard.writeText(clnConnectUrl || '');
        break;
    }
    setToastMessage(event.target.id + ' Copied!');
    setShowToast(true);
  }

  const networkChangeHandler = (event) => {
    setSelNetwork(+event.target.id);
    const url = (+event.target.id === 0) ?
      'c-lightning-rest://' + LOCAL_HOST + ':' + PORT + '?macaroon=' + MACAROON + '&protocol=http'
    :
      'c-lightning-rest://' + TOR_HOST + ':' + PORT + '?macaroon=' + MACAROON + '&protocol=http'
    setClnConnectUrl(url);
  }

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered className='modal-lg'>
        <Modal.Header className='d-flex align-items-start justify-content-end pb-0'>
          <FontAwesomeIcon icon={faCircleXmark} onClick={props.onHide} size='lg' />
        </Modal.Header>
        <Modal.Body className='py-0 px-5'>
          <Row className='qr-container d-flex align-items-start justify-content-center pt-2'>
            <Image className='qr-cln-logo' rounded={true} src='/images/cln-logo.svg' />
            <QRCodeCanvas value={clnConnectUrl || ''} size={200} includeMargin={true} />
          </Row>
          <Row className='d-flex align-items-start justify-content-center pt-2'>
            <h4 className='w-75 text-dark fw-bold d-flex justify-content-center py-3 text-center'>
              Connect your lightning wallet to your node
            </h4>
          </Row>
          <Row className='d-flex align-items-start justify-content-center'>
            <Col xs={6}>
            <Form.Label className='mb-1 text-light'>Network</Form.Label>
            <Dropdown className='dropdown-white'>
              <Dropdown.Toggle variant='white' id='network' className='w-100 d-flex align-items-center justify-content-between'>
                {NETWORK_TYPES[selNetwork]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                { NETWORK_TYPES.map((type, i) => 
                  <Dropdown.Item as='div' key={i} id={i.toString()} onClick={networkChangeHandler}>{type}</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>              
            </Col>
            <Col xs={6}>
              <Form.Label className='mb-1 text-light'>REST Port</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control 
                  onClick={copyHandler}
                  id='REST Port'
                  value={PORT}
                  aria-label={PORT}
                  aria-describedby='copy-addon-port'
                  className='form-control-left'
                  readOnly
                />
                <InputGroup.Text className='form-control-addon form-control-addon-right' onClick={copyHandler}>
                  <CopySVG id='REST Port' />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row className='d-flex align-items-start justify-content-center'>
            <Col xs={12}>
              <Form.Label className='mb-1 text-light'>Host</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control 
                  onClick={copyHandler}
                  id='Host'
                  value={selNetwork === 0 ? LOCAL_HOST : TOR_HOST}
                  aria-label={selNetwork === 0 ? LOCAL_HOST : TOR_HOST}
                  aria-describedby='copy-addon-host'
                  className='form-control-left'
                  readOnly
                />
                <InputGroup.Text className='form-control-addon form-control-addon-right' onClick={copyHandler}>
                  <CopySVG id='Host' />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row className='d-flex align-items-start justify-content-center'>
            <Col xs={12}>
              <Form.Label className='mb-1 text-light'>Macaroon</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control 
                  onClick={copyHandler}
                  id='Macaroon'
                  value={MACAROON}
                  aria-label={MACAROON}
                  aria-describedby='copy-addon-macaroon'
                  className='form-control-left'
                  readOnly
                />
                <InputGroup.Text className='form-control-addon form-control-addon-right' onClick={copyHandler}>
                  <CopySVG id='Macaroon' />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
          <Row className='mb-4 d-flex align-items-start justify-content-center'>
            <Col xs={12}>
              <Form.Label className='mb-1 text-light'>REST Connect URL</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control 
                  onClick={copyHandler}
                  id='REST Connect URL'
                  value={clnConnectUrl}
                  aria-label={clnConnectUrl}
                  aria-describedby='copy-addon-macaroon'
                  className='form-control-left'
                  readOnly
                />
                <InputGroup.Text className='form-control-addon form-control-addon-right' onClick={copyHandler}>
                  <CopySVG id='REST Connect URL' />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <ToastMessage message={toastMessage} position='top-center' bg='primary' show={showToast} onClose={() => setShowToast(false)} />
      </Modal>
    </>
  );
}

export default ConnectWallet;
