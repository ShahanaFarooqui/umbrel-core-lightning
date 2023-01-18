import './CurrencyBox.scss';

import { formatCurrency } from '../../../utilities/data-formatters';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';

const CurrencyBox = props => {
  const appCtx = useContext(AppContext);

  return (
    <div className={props.rootClasses}>
      <div className={props.currencyClasses}>
        {formatCurrency(props.value, appCtx.appConfig.unit, props.shorten)}
      </div>
      <div className={props.unitClasses}>
        {appCtx.appConfig.unit}
      </div>
    </div>
  );
};

export default CurrencyBox;
