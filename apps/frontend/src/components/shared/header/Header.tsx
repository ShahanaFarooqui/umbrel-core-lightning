import './Header.scss';

import ToggleSwitch from '../toggle-switch/ToggleSwitch';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Header = () => {

  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={9} className='text-start' data-testid='header-info'>
        <Image src='images/cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          <h4 className='m-0' style={{color:'#1B2559'}}><strong>Core Lightning Node</strong></h4>
          <Row className='text-secondary align-items-center'>
            <div className='ms-3 me-1 bg-success dot'></div>
            Running (v23.2.0-beta)
          </Row>
        </Row>
      </Col>
      <Col xs={3} className='header-context d-flex align-items-center justify-content-end' data-testid='header-context'>
        <Col>
          <ToggleSwitch />
        </Col>
        <Col>
          <Button variant='primary' className='btn-rounded text-white fw-bold'>
            Settings<Image src='images/settings.svg' alt='Settings image' className='ms-2'></Image>
          </Button>
        </Col>
      </Col>
    </Row>
  );
}

export default Header;
