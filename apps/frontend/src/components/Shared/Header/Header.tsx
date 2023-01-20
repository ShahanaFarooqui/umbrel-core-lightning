import './Header.scss';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { CURRENCY_UNITS, APPLICATION_MODES, ApplicationModes } from '../../../utilities/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import ModalComponent from '../NodeInfo/NodeInfo';
import { SettingsSVG } from '../../../svgs/settings';
import FiatSelection from '../FiatSelection/FiatSelection';
import Form from 'react-bootstrap/Form';
import useHttp from '../../../hooks/use-http';

const Header = () => {
  const [showNodeInfoModal, setShowNodeInfoModal] = useState(false);
  const appCtx = useContext(AppContext);
  const { updateConfig } = useHttp();

  const modeChangeHandler = (event) => {
    updateConfig({...appCtx.appConfig, appMode: (appCtx.appConfig.appMode === ApplicationModes.LIGHT ? ApplicationModes.DARK : ApplicationModes.LIGHT) });
  }
  
  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={12} md={8} data-testid='header-info'>
        <Image src='images/cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          <h4 className='m-0 text-dark'><strong>Core Lightning Node</strong></h4>
          <Row className='align-items-center text-light'>
            <div className={'ms-3 me-1 dot ' + ((appCtx.nodeInfo.id) ? 'bg-success' : (appCtx.nodeInfo.error) ? 'bg-danger' : 'bg-warning')}></div>
            { (appCtx.nodeInfo.id) ? 'Running (' + appCtx.nodeInfo.version + ')' : (appCtx.nodeInfo.error) ? ('Error: ' + appCtx.nodeInfo.error) : 'Loading...' }
          </Row>
        </Row>
      </Col>
      <Col xs={12} md={4} className='d-flex align-items-center justify-content-end' data-testid='header-context'>
        {/* <FiatSelection className='me-2' /> */}
        {/* <ToggleSwitch className='me-2' values={CURRENCY_UNITS} selValue={appCtx.appConfig.unit} storeSelector='appConfig' storeKey='unit' /> */}
        <Dropdown autoClose={'outside'} className={(!!appCtx.nodeInfo.error || appCtx.nodeInfo.isLoading) ? 'settings-menu dropdown-disabled' : 'settings-menu'} >
          <Dropdown.Toggle variant='primary' disabled={!!appCtx.nodeInfo.error || appCtx.nodeInfo.isLoading} className='btn-rounded'>
            Settings
            <SettingsSVG className={'ms-2' + ((!!appCtx.nodeInfo.error || appCtx.nodeInfo.isLoading) ? ' svg-fill-disabled' : '')} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item data-bs-toggle='modal' data-bs-target='#staticBackdrop' onClick={() => setShowNodeInfoModal(true)}>Show node ID</Dropdown.Item>
            <Dropdown.Item>Connect wallet</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><ToggleSwitch values={CURRENCY_UNITS} selValue={appCtx.appConfig.unit} storeSelector='appConfig' storeKey='unit' /></Dropdown.Item>
            <Dropdown.Divider />
            {/* <Dropdown.Item className='d-flex align-items-center justify-content-between'>
              Dark Mode
              <Form.Check 
                type='switch'
                id='custom-switch'
                checked={appCtx.appConfig.appMode === ApplicationModes.DARK}
                onChange={modeChangeHandler}
              />
            </Dropdown.Item> */}
            <Dropdown.Item>
              <ToggleSwitch values={APPLICATION_MODES} selValue={appCtx.appConfig.appMode} storeSelector='appConfig' storeKey='appMode' />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className='d-flex align-items-center justify-content-between no-focus'><FiatSelection /></Dropdown.Item>
            <ModalComponent show={showNodeInfoModal} onHide={() => setShowNodeInfoModal(false)}/>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default Header;
