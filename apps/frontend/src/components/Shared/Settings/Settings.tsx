import './Settings.scss';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import Dropdown from 'react-bootstrap/Dropdown';
import { CURRENCY_UNITS, APPLICATION_MODES } from '../../../utilities/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import ModalComponent from '../NodeInfo/NodeInfo';
import { SettingsSVG } from '../../../svgs/settings';
import FiatSelection from '../FiatSelection/FiatSelection';
import useBreakpoint from '../../../hooks/use-breakpoint';
import logger from '../../../services/logger.service';

const Settings = () => {
  const [showNodeInfoModal, setShowNodeInfoModal] = useState(false);
  const appCtx = useContext(AppContext);
  const currentScreenSize = useBreakpoint();
  
  logger.info('Screen Size Changed: ' + currentScreenSize);

  return (
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
        <Dropdown.Item>
          <ToggleSwitch values={APPLICATION_MODES} selValue={appCtx.appConfig.appMode} storeSelector='appConfig' storeKey='appMode' />
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className='d-flex align-items-center justify-content-between no-focus'><FiatSelection /></Dropdown.Item>
        <ModalComponent show={showNodeInfoModal} onHide={() => setShowNodeInfoModal(false)}/>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Settings;
