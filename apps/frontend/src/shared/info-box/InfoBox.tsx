import { NumberTypes } from '../../utilities/constants';
import { formatCurrency } from '../../utilities/data-formatters';
import './InfoBox.scss';

const InfoBox = (props) => {
  return (
    <div className='d-inline-flex flex-column'>
      <div className='fs-6 fw-bold'>
        {props.title}
      </div>
      <div>
        { props.type === NumberTypes.CURRENCY ? formatCurrency(props.value) : parseFloat(props.value).toLocaleString('en-us') }
      </div>
    </div>
  );
}

export default InfoBox;
