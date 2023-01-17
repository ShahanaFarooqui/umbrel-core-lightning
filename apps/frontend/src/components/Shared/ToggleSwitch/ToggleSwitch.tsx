import './ToggleSwitch.scss';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';
import { API_BASE_URL, API_VERSION } from '../../../utilities/constants';
import logger from '../../../services/logger.service';

const ToggleSwitch = (props) => {
  let switchClass = props.selValue === props.values[1] ? 'toggle-right' : 'toggle-left';
  const appCtx = useContext(AppContext);
  
  const changeValueHandler = (event) => {
    let newAppConfig: any = null;
    if (props.selValue === props.values[0]) {
      newAppConfig = { ...appCtx[props.storeSelector], [props.storeKey]: props.values[1]};
      switchClass = 'toggle-right';
    } else {
      newAppConfig = { ...appCtx[props.storeSelector], [props.storeKey]: props.values[0]};
      switchClass = 'toggle-left';
    }
    axios.post(API_BASE_URL + API_VERSION + '/shared/config', newAppConfig)
    .then((response: any) => {
      appCtx.setConfig(newAppConfig);
    }).catch(err => {
      logger.error(err);
    });
  };

  return (
    <div className='toggle me-2' onClick={changeValueHandler}>
      <div className='toggle-bg-text px-2 d-flex align-items-center'>
        <span className='text-center me-2'>{props.values[0]}</span>
        <span className='text-center ms-2'>{props.values[1]}</span>
      </div>
      <div className={'toggle-switch justify-content-center d-flex align-items-center ' + switchClass}>
        <span className=''>{props.selValue}</span>
      </div>
    </div>
  );
}

export default ToggleSwitch;
