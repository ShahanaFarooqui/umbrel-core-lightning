import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext } from '../../../store/AppContext';
import { API_BASE_URL, API_VERSION } from '../../../utilities/constants';
import './ToggleSwitch.scss';
import logger from '../../../services/logger.service';

const ToggleSwitch = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.values[0]);
  const [toggleClasses, setToggleClasses] = useState('toggle-switch justify-content-center d-flex align-items-center toggle-left');
  const appCtx = useContext(AppContext);
  
  const changeValueHandler = (event) => {
    let newAppConfig: any = null;
    if (selectedValue === props.values[0]) {
      newAppConfig = { ...appCtx[props.storeSelector], [props.storeKey]: props.values[1]};
      setToggleClasses('toggle-switch justify-content-center d-flex align-items-center toggle-right');
      setSelectedValue(props.values[1]);
    } else {
      newAppConfig = { ...appCtx[props.storeSelector], [props.storeKey]: props.values[0]};
      setToggleClasses('toggle-switch justify-content-center d-flex align-items-center toggle-left');
      setSelectedValue(props.values[0]);
    }
    axios.post(API_BASE_URL + API_VERSION + '/shared/config', newAppConfig)
    .then((response: any) => {
      appCtx.setConfig(newAppConfig);
    }).catch(err => {
      logger.error(err);
    });
  };

  return (
    <div className='toggle toggle-md' onClick={changeValueHandler}>
      <div className='toggle-bg-text justify-content-between d-flex align-items-center px-3'>
        <span className='text-center'>{props.values[0]}</span>
        <span className='text-center'>{props.values[1]}</span>
      </div>
      <div className={toggleClasses}>
        <span className=''>{selectedValue}</span>
      </div>
    </div>
  );
}

export default ToggleSwitch;
