import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form';

const Header = () => {
  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={10} className='text-start' data-testid='header-info'>
        <Image src='cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          <span>Running</span>
          <h3>Core Lightning Node</h3>
          <span>CLN 23.2.0-beta</span>
        </Row>
      </Col>
      <Col xs={2} className='header-context d-flex align-items-center justify-content-end' data-testid='header-context'>
        <Col>
          <Form.Check type='switch' label='Dark' />
        </Col>
        <Col className='h3'>
          <FontAwesomeIcon icon={faBars} className='fa-lg' />
        </Col>
      </Col>
    </Row>
  );
}

export default Header;
