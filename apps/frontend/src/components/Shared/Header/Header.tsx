import './Header.scss';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { CURRENCY_UNITS, APPLICATION_MODES } from '../../../utilities/Constants';
import { AppContext } from '../../../store/AppContext';
import { useContext } from 'react';

const Header = () => {
  const appCtx = useContext(AppContext);

  console.warn('HEADER');
  console.warn(appCtx.nodeInfo);

  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={9} className='text-start' data-testid='header-info'>
        <Image src='images/cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          <h4 className='m-0' style={{color:'#1B2559'}}><strong>Core Lightning Node</strong></h4>
          <Row className='text-secondary align-items-center'>
            <div className='ms-3 me-1 bg-success dot'></div>
            Running (none)
          </Row>
        </Row>
      </Col>
      <Col xs={3} className='header-context d-flex align-items-center justify-content-end' data-testid='header-context'>
        <Col>
          <ToggleSwitch values={CURRENCY_UNITS} />
        </Col>
        {/* <Col>
          <ToggleSwitch values={APPLICATION_MODES} />
        </Col> */}
        <Col>
          <Dropdown className='settings-dropdown'>
            <Dropdown.Toggle variant='primary' className='text-white'>
              Settings<Image src='images/settings.svg' alt='Settings image' className='ms-2'></Image>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Show Node ID</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Connect Wallet</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Col>
    </Row>
  );
}

export default Header;
