import './FiatSelection.scss';

import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';
import useHttp from '../../../hooks/use-http';

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
    <Dropdown className={props.className} onSelect={fiatChangeHandler}>
      <Dropdown.Toggle variant='primary' className='btn-rounded'>{appCtx.appConfig.fiatUnit || 'Currency'}</Dropdown.Toggle>
      <Dropdown.Menu>
        {FIAT_OPTIONS.map((fiat, i) => 
          <Dropdown.Item as='div' eventKey={fiat} key={i}>{fiat}</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FiatSelection;
