import './CurrencyBox.scss';

import { formatCurrency } from '../../../utilities/data-formatters';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';

const CurrencyBox = props => {
  const mainDivClassList =
    props.alignment === 'row'
      ? 'd-inline-flex flex-row align-items-center'
      : 'd-inline-flex flex-column';
  const unitDivClassList = props.alignment === 'row' ? 'fs-7 fw-bold ms-2' : 'fs-7 fw-bold';
  const appCtx = useContext(AppContext);

  return (
    <div className={mainDivClassList}>
      <div className="fs-4 fw-bold lh-1">
        {formatCurrency(props.value, appCtx.appConfig.unit)}
      </div>
      <div className={unitDivClassList}>
        {appCtx.appConfig.unit}
      </div>
    </div>
  );
};

export default CurrencyBox;
