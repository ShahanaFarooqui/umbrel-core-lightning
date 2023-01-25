import './Settings.scss';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import Dropdown from 'react-bootstrap/Dropdown';
import { CURRENCY_UNITS } from '../../../utilities/constants';
import { useContext, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import ModalComponent from '../NodeInfo/NodeInfo';
import { SettingsSVG } from '../../../svgs/Settings';
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
      <Dropdown.Menu className='fs-7'>
        <Dropdown.Item data-bs-toggle='modal' data-bs-target='#staticBackdrop' onClick={() => setShowNodeInfoModal(true)}>Show node ID</Dropdown.Item>
        <Dropdown.Item>Connect wallet</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as='div' className='d-flex align-items-center justify-content-between'>Fiat Currency <FiatSelection className='ms-4 fiat-dropdown' /></Dropdown.Item>
        <Dropdown.Item as='div' className='d-flex align-items-center justify-content-between'>Currency <ToggleSwitch values={CURRENCY_UNITS} selValue={appCtx.appConfig.unit} storeSelector='appConfig' storeKey='unit' /></Dropdown.Item>
      </Dropdown.Menu>
      <ModalComponent show={showNodeInfoModal} onHide={() => setShowNodeInfoModal(false)}/>
    </Dropdown>
  );
}

export default Settings;
