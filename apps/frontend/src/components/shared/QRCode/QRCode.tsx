import './QRCode.scss';
import { QRCodeCanvas } from 'qrcode.react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';

import { CopySVG } from '../../../svgs/Copy';

const QRCodeComponent = (props) => {

  const copyHandler = () => {
    navigator.clipboard.writeText(props.message || '');
    props.onCopy();
  }

  return (
    <div className={props.className}>
      <Row className='qr-container d-flex align-items-start justify-content-center pt-3'>
        <Image className='qr-cln-logo' rounded={true} src='/images/cln-logo.svg' />
        <QRCodeCanvas value={props.message || ''} size={220} includeMargin={true} />
      </Row>
      <Row className='w-100 mt-5 d-flex align-items-start justify-content-center'>
        <InputGroup className='mb-3'>
          <Form.Control
            onClick={copyHandler}
            placeholder={props.message}
            aria-label={props.message}
            aria-describedby='copy-addon'
            className='form-control-left'
            readOnly
          />
          <InputGroup.Text
            className='form-control-addon form-control-addon-right'
            onClick={copyHandler}
          >
            <CopySVG id={props.message} />
          </InputGroup.Text>
        </InputGroup>
      </Row>
    </div>
  );
};

export default QRCodeComponent;
