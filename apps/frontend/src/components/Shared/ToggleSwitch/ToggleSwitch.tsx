import { useState } from 'react';
import './ToggleSwitch.scss';

const ToggleSwitch = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.values[0]);
  const [toggleClasses, setToggleClasses] = useState('toggle-switch justify-content-center d-flex align-items-center toggle-left');
  
  const changeValueHandler = (event) => {
    if (selectedValue === props.values[0]) {
      setToggleClasses('toggle-switch justify-content-center d-flex align-items-center toggle-right');
      setSelectedValue(prevValue => {
        console.warn(props.values[1]);
        return props.values[1];
      });
    } else {
      setToggleClasses('toggle-switch justify-content-center d-flex align-items-center toggle-left');
      setSelectedValue(prevValue => {
        console.warn(props.values[0]);
        return props.values[0];
      });
    }
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
