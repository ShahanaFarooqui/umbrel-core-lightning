import { useState } from 'react';
import './Header.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const [selectedUnit, setSelectedUnit] = useState('SATS');
  const [toggleClasses, setToggleClasses] = useState('toggle-switch justify-content-center d-flex align-items-center toggle-left');

  const changeUnitHandler = (event) => {
    if (selectedUnit === 'SATS') {
      setSelectedUnit('BTC');
      setToggleClasses('toggle-switch justify-content-center d-flex align-items-center toggle-right');
    } else {
      setSelectedUnit('SATS');
      setToggleClasses('toggle-switch justify-content-center d-flex align-items-center toggle-left');
    }
  };

  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={9} className='text-start' data-testid='header-info'>
        <Image src='images/cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          <h4 className='m-0'><strong>Core Lightning Node</strong></h4>
          <Row className='text-secondary align-items-center'>
            <div className='ms-3 me-1 bg-success dot'></div>
            Running (v23.2.0-beta)
          </Row>
        </Row>
      </Col>
      <Col xs={3} className='header-context d-flex align-items-center justify-content-end' data-testid='header-context'>
        <Col>
          <div className='toggle toggle-md' onClick={changeUnitHandler}>
            <div className='toggle-bg-text justify-content-between d-flex align-items-center px-3'>
              <span className='text-center'>SATS</span>
              <span className='text-center'>BTC</span>
            </div>
            <div className={toggleClasses}>
              <span className=''>{selectedUnit}</span>
            </div>
          </div>
        </Col>
        <Col className='h3'>
          <Button variant='primary' className='rounded text-white fw-bold'>
            Settings<Image src='images/settings.svg' alt='Settings image' className='ms-2'></Image>
          </Button>
        </Col>
      </Col>
    </Row>
  );
}

export default Header;
