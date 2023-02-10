import './FiatBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatFiatValue } from '../../../utilities/data-formatters';

const FiatBox = props => {
  return (
    <span className={'fiat-box-span ' + props.className}>
      { props.symbol ? <FontAwesomeIcon icon={props.symbol} size={props.iconSize || 'sm'} /> : <></> }
      {formatFiatValue((+props.value || 0), +props.rate)}
    </span>
  );
};

export default FiatBox;
