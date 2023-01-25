import './FiatSelection.scss';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';
import useHttp from '../../../hooks/use-http';
import Dropdown from 'react-bootstrap/Dropdown';

const FIAT_OPTIONS = [
  'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 
  'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 
  'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD'
];

const FiatSelection = (props) => {
  const appCtx = useContext(AppContext);
  const { updateConfig } = useHttp();

  const fiatChangeHandler = (eventKey: any, event: any) => {
    updateConfig({...appCtx.appConfig, fiatUnit: eventKey});
  };

  return (
    <>
    <Dropdown className={props.className} onSelect={fiatChangeHandler}>
      <Dropdown.Toggle variant='outline border-gray-300'><div className='dropdown-toggle-text'>{appCtx.appConfig.fiatUnit || 'Currency'}</div></Dropdown.Toggle>
      <Dropdown.Menu>
        <PerfectScrollbar>
          <div className='fiat-dropdown-scroller fs-7'>
          {FIAT_OPTIONS.map((fiat, i) => 
            <Dropdown.Item as='div' eventKey={fiat} key={i}>{fiat}</Dropdown.Item>
          )}
          </div>
        </PerfectScrollbar>
      </Dropdown.Menu>
    </Dropdown>
  </>
  );
}

export default FiatSelection;
