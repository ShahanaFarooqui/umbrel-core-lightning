import './ToggleSwitch.scss';
import { useContext } from 'react';

import useHttp from '../../../hooks/use-http';
import { AppContext } from '../../../store/AppContext';

const ToggleSwitch = (props) => {
  let switchClass = props.selValue === props.values[1] ? 'toggle-right' : 'toggle-left';
  const appCtx = useContext(AppContext);
  const { updateConfig } = useHttp();

  const changeValueHandler = (event) => {

    let newAppConfig: any = null;
    if (props.selValue === props.values[0]) {
      newAppConfig = { ...appCtx[props.storeSelector], [props.storeKey]: props.values[1]};
      switchClass = 'toggle-right';
    } else {
      newAppConfig = { ...appCtx[props.storeSelector], [props.storeKey]: props.values[0]};
      switchClass = 'toggle-left';
    }
    updateConfig(newAppConfig);
  };

  return (
    <div className={'fs-7 toggle ' + (props.className ? props.className : '')} onClick={changeValueHandler}>
      <div className='toggle-bg-text px-2 d-flex flex-fill align-items-center justify-content-between'>
        <span className='text-center me-2'>{props.values[0]}</span>
        <span className='text-center ms-2'>{props.values[1]}</span>
      </div>
      <div className={'toggle-switch justify-content-center d-flex align-items-center ' + switchClass}>
        <span>{props.selValue}</span>
      </div>
    </div>
  );
}

export default ToggleSwitch;
