import './FiatSelection.scss';

import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';
import useHttp from '../../../hooks/use-http';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FIAT_OPTIONS = [
  'USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 
  'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 
  'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD'
];

const FiatSelection = (props) => {
  const appCtx = useContext(AppContext);
  const { updateConfig } = useHttp();

  const fiatChangeHandler = (event: any) => {
    updateConfig({...appCtx.appConfig, fiatUnit: event.target.id});
  };

  return (
    <Col xs={12}>
      Select Fiat:
      <Row>
        {FIAT_OPTIONS.map((fiat, i) =>
          <Col key={i} xs={6}>
            <Form.Check 
              inline
              label={fiat}
              name='fiatSelection'
              type='radio'
              id={fiat} 
              aria-label='Fiat Selection'
              checked={fiat === appCtx.appConfig.fiatUnit}
              onChange={fiatChangeHandler}
            />
          </Col>
        )}
      </Row>
    </Col>
  );
}

export default FiatSelection;
