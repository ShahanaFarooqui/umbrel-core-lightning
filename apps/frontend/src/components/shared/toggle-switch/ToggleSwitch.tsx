import { useState } from 'react';
import './ToggleSwitch.scss';

const ToggleSwitch = () => {
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
    <div className='toggle toggle-md' onClick={changeUnitHandler}>
      <div className='toggle-bg-text justify-content-between d-flex align-items-center px-3'>
        <span className='text-center'>SATS</span>
        <span className='text-center'>BTC</span>
      </div>
      <div className={toggleClasses}>
        <span className=''>{selectedUnit}</span>
      </div>
    </div>
  );
}

export default ToggleSwitch;
