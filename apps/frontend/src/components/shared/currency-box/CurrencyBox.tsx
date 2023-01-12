import './CurrencyBox.scss';

import { formatCurrency } from '../../../utilities/data-formatters';

const showInBTC = false;

const CurrencyBox = (props) => {
  const mainDivClassList = props.alignment === 'row' ? 'd-inline-flex flex-row align-items-center' : 'd-inline-flex flex-column';
  const unitDivClassList = props.alignment === 'row' ? 'fs-7 fw-bold ms-2' : 'fs-7 fw-bold';

  return (
    <div className={mainDivClassList}>
      <div className='fs-4 fw-bold lh-1'>{ formatCurrency(props.value, showInBTC) }</div>
      <div className={unitDivClassList}>{ (showInBTC) ? 'BTC' : 'SATS' }</div>
    </div>
  );
}

export default CurrencyBox;
