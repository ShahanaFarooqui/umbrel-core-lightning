import './BTCDeposit.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { QRCodeCanvas } from 'qrcode.react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';

import { CallStatus } from '../../../utilities/constants';
import logger from '../../../services/logger.service';
import useHttp from '../../../hooks/use-http';
import { CopySVG } from '../../../svgs/Copy';
import { BitcoinWalletSVG } from '../../../svgs/BitcoinWallet';
import ToastMessage from '../../shared/ToastMessage/ToastMessage';
import Alert from 'react-bootstrap/esm/Alert';
import Spinner from 'react-bootstrap/esm/Spinner';
import { InformationSVG } from '../../../svgs/Information';

const BTCDeposit = (props) => {
  const { btcDeposit } = useHttp();
  const [responseStatus, setResponseStatus] = useState(CallStatus.NONE);
  const [responseMessage, setResponseMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const copyHandler = () => {
    navigator.clipboard.writeText(responseMessage || '');
    setShowToast(true);
  }

  useEffect(() => {
    setResponseStatus(CallStatus.PENDING);
    setResponseMessage('');
    btcDeposit()
    .then((response: any) => {
      logger.info(response);
      if (response.data && response.data.bech32) {
        setResponseStatus(CallStatus.SUCCESS);
        setResponseMessage((response.data.bech32));
      } else {
        setResponseStatus(CallStatus.ERROR);
        setResponseMessage('Unknown Error');
      }
    })
    .catch(err => {
      logger.error(err.response && err.response.data ? err.response.data : err.message ? err.message : JSON.stringify(err));
      setResponseStatus(CallStatus.ERROR);
      setResponseMessage(err.response && err.response.data ? err.response.data : err.message ? err.message : JSON.stringify(err));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className='h-100 mx-1'>
      <Card className='d-flex align-items-stretch'>
        <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
          <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
            <div className='p-0 fw-bold text-primary d-flex align-items-center'>
              <BitcoinWalletSVG svgClassName='svg-small me-2' className='fill-primary' />
              <span>Bitcoin Wallet</span>
            </div>
            <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
          </Card.Header>
          <h4 className='text-blue fw-bold'>Deposit</h4>
          <Card.Body className='py-0 px-1'>
            {responseStatus === CallStatus.SUCCESS ?
              <div className='py-0 px-1 d-flex flex-column align-items-center justify-content-start'>
                <Row className='qr-container d-flex align-items-start justify-content-center pt-3'>
                  <Image className='qr-cln-logo' rounded={true} src='/images/cln-logo.svg' />
                  <QRCodeCanvas value={responseMessage || ''} size={220} includeMargin={true} />
                </Row>
                <Row className='w-100 mt-5 d-flex align-items-start justify-content-center'>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      onClick={copyHandler}
                      placeholder={responseMessage}
                      aria-label={responseMessage}
                      aria-describedby='copy-addon'
                      className='form-control-left'
                      readOnly
                    />
                    <InputGroup.Text
                      className='form-control-addon form-control-addon-right'
                      onClick={copyHandler}
                    >
                      <CopySVG id={responseMessage} />
                    </InputGroup.Text>
                  </InputGroup>
                </Row>
              </div>
            :
              responseStatus === CallStatus.ERROR ?
                <>
                  <Alert className='w-100' variant='danger'>
                    <InformationSVG svgClassName='me-1' className='fill-danger' />
                    {responseMessage}
                  </Alert>                
                </>
              :
                <Alert className='w-100' variant='warning'>
                  <Spinner className='me-2' variant='primary' size='sm' />
                  Generating New Address...
                </Alert>
            }
          </Card.Body>
        </Card.Body>
        <ToastMessage message='Address Copied!' position='top-center' bg='primary' show={showToast} onClose={() => setShowToast(false)} />
      </Card>
    </Row>
  );
};

export default BTCDeposit;
