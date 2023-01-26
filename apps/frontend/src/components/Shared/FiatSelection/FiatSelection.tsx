import './FiatSelection.scss';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';
import useHttp from '../../../hooks/use-http';
import Dropdown from 'react-bootstrap/Dropdown';
import { FIAT_CURRENCIES } from '../../../utilities/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FiatSelection = (props) => {
  const appCtx = useContext(AppContext);
  const { updateConfig } = useHttp();

  const fiatChangeHandler = (eventKey: any, event: any) => {
    updateConfig({...appCtx.appConfig, fiatUnit: eventKey});
  };

  return (
    <>
    <Dropdown className={props.className} onSelect={fiatChangeHandler}>
      <Dropdown.Toggle variant='outline border-gray-300'>
        <div className='dropdown-toggle-text'>
          <FontAwesomeIcon className='svg-curr-symbol' icon={appCtx.fiatConfig.symbol} />
          {appCtx.appConfig.fiatUnit || 'Currency'}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <PerfectScrollbar className='ps-show-always'>
          <div className='fiat-dropdown-scroller fs-7'>
          {FIAT_CURRENCIES.map((fiat, i) => 
            <Dropdown.Item as='div' eventKey={fiat.currency} key={i}>
              <FontAwesomeIcon icon={fiat.symbol} />
              {fiat.currency}
            </Dropdown.Item>
          )}
          </div>
        </PerfectScrollbar>
      </Dropdown.Menu>
    </Dropdown>
  </>
  );
}

export default FiatSelection;
