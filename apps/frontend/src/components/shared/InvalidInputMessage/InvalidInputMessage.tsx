import './InvalidInputMessage.scss';
import { motion } from 'framer-motion';
import { STAGERRED_SPRING_VARIANTS_2 } from '../../../utilities/constants';
import { InformationSVG } from '../../../svgs/Information';

const InvalidInputMessage = props => {
  return (
    <motion.div className='message invalid' variants={STAGERRED_SPRING_VARIANTS_2} initial='hidden' animate='visible' exit='hidden' custom={0}>
      <InformationSVG svgClassName='me-1' className='fill-danger' />
      {props.message}
    </motion.div>
  );
};

export default InvalidInputMessage;