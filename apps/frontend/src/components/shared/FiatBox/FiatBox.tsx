import './FiatBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatFiatValue } from '../../../utilities/data-formatters';

const FiatBox = props => {
  return (
    <span className={props.className}>
      { props.symbol ? <FontAwesomeIcon icon={props.symbol} /> : <></> }
      {formatFiatValue((+props.value || 0), +props.rate)}
    </span>
  );
};

export default FiatBox;
