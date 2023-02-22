import './FiatBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatFiatValue } from '../../../utilities/data-formatters';
import { Units } from '../../../utilities/constants';

const FiatBox = props => {
  return (
    <span className={'fiat-box-span ' + props.className}>
      { props.symbol ? <FontAwesomeIcon icon={props.symbol} size={props.iconSize || 'sm'} /> : <></> }
      {formatFiatValue((+props.value || 0), +props.rate, (props.fromUnit || Units.SATS))}
    </span>
  );
};

export default FiatBox;
