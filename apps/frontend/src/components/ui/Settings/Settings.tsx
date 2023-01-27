import './Settings.scss';
import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import logger from '../../../services/logger.service';
import useBreakpoint from '../../../hooks/use-breakpoint';
import { AppContext } from '../../../store/AppContext';
import { CURRENCY_UNITS } from '../../../utilities/constants';
import { SettingsSVG } from '../../../svgs/Settings';
import FiatSelection from '../../shared/FiatSelection/FiatSelection';
import ToggleSwitch from '../../shared/ToggleSwitch/ToggleSwitch';

const Settings = (props) => {
  const appCtx = useContext(AppContext);
  const currentScreenSize = useBreakpoint();
  
  logger.info('Screen Size Changed: ' + currentScreenSize);

  return (
    <Dropdown autoClose={'outside'} className={(!!appCtx.nodeInfo.error || appCtx.nodeInfo.isLoading) ? 'settings-menu dropdown-disabled' : 'settings-menu'} >
      <Dropdown.Toggle variant={props.compact ? '' : 'primary'} disabled={!!appCtx.nodeInfo.error || appCtx.nodeInfo.isLoading} className={props.compact ? 'd-flex align-items-center btn-rounded btn-compact' : 'd-flex align-items-center btn-rounded'}>
        <span className={props.compact ? '' : 'me-2'}>{props.compact ? '' : 'Settings'}</span>
        <SettingsSVG className={((!!appCtx.nodeInfo.error || appCtx.nodeInfo.isLoading) ? 'mt-1 svg-fill-disabled' : 'mt-1')} />
      </Dropdown.Toggle>
      <Dropdown.Menu className='fs-7'>
        <Dropdown.Item data-bs-toggle='modal' data-bs-target='#staticBackdrop' onClick={props.onShowNodeInfo}>Show node ID</Dropdown.Item>
        <Dropdown.Item data-bs-toggle='modal' data-bs-target='#staticBackdrop' onClick={props.onShowConnectWallet}>Connect wallet</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as='div' className='d-flex align-items-center justify-content-between'>Fiat Currency <FiatSelection className='ms-4 fiat-dropdown' /></Dropdown.Item>
        <Dropdown.Item as='div' className='d-flex align-items-center justify-content-between'>Currency <ToggleSwitch values={CURRENCY_UNITS} selValue={appCtx.appConfig.unit} storeSelector='appConfig' storeKey='unit' /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Settings;
