import './ConnectWallet.scss';
import { useContext, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/esm/Form';

import { LOCAL_HOST, TOR_HOST, MACAROON, PORT, ApplicationModes } from '../../../utilities/constants';
import { CopySVG } from '../../../svgs/Copy';
import { AppContext } from '../../../store/AppContext';
import { CloseSVG } from '../../../svgs/Close';

const NETWORK_TYPES = ['Local Network', 'Tor']

const ConnectWallet = () => {
  const appCtx = useContext(AppContext);
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
    appCtx.setShowToast({show: true, message: (event.target.id + ' Copied Successfully!'), bg: 'success'});
  }

  const closeHandler = () => {
    appCtx.setShowModals({...appCtx.showModals, connectWalletModal: false});
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
      <Modal show={appCtx.showModals.connectWalletModal} onHide={closeHandler} centered className='modal-lg'>
        <Modal.Header className='d-flex align-items-start justify-content-end pb-0'>
          <span className='span-close-svg' onClick={closeHandler}><CloseSVG /></span>
        </Modal.Header>
        <Modal.Body className='py-0 px-4'>
          <Row className='qr-container m-auto d-flex'>
            <img alt='cln-logo' src={appCtx.appConfig.appMode === ApplicationModes.DARK ? 'images/cln-logo-dark.png' : 'images/cln-logo-light.png'} className='qr-cln-logo' />
            <QRCodeCanvas value={clnConnectUrl || ''} size={220} includeMargin={true} />
          </Row>
          <Row className='d-flex align-items-start justify-content-center pt-2'>
            <h4 className='w-75 text-blue fw-bold d-flex justify-content-center text-center'>
              Connect your lightning wallet to your node
            </h4>
          </Row>
          <Row className='d-flex align-items-start justify-content-center'>
            <Col xs={6}>
            <Form.Label className='text-light'>Network</Form.Label>
            <Dropdown className='dropdown-network mt-1'>
              <Dropdown.Toggle variant='secondary' id='network' className='w-100 d-flex align-items-center justify-content-between'>
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
              <Form.Label className='text-light'>REST Port</Form.Label>
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
              <Form.Label className='text-light'>Host</Form.Label>
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
              <Form.Label className='text-light'>Macaroon</Form.Label>
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
              <Form.Label className='text-light'>REST Connect URL</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control 
                  onClick={copyHandler}
                  id='REST URL'
                  value={clnConnectUrl}
                  aria-label={clnConnectUrl}
                  aria-describedby='copy-addon-macaroon'
                  className='form-control-left'
                  readOnly
                />
                <InputGroup.Text className='form-control-addon form-control-addon-right' onClick={copyHandler}>
                  <CopySVG id='REST URL' />
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConnectWallet;
