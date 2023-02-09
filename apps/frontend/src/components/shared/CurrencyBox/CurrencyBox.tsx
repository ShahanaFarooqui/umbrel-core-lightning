import './CurrencyBox.scss';
import { useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

import { AppContext } from '../../../store/AppContext';
import { formatCurrencyNumeric, formatCurrency } from '../../../utilities/data-formatters';
import { Units } from '../../../utilities/constants';

const CurrencyBox = props => {
  const appCtx = useContext(AppContext);
  const [animationFinished, setAnimationFinished] = useState(0);
  const count: any = useMotionValue(0);
  const rounded: any = useTransform(count, (value: number) => appCtx.appConfig.unit === Units.BTC ? Number.parseFloat((value).toString()).toFixed(5) : Math.floor(value));
  
  useEffect(() => {
    setAnimationFinished(0);
    count.current = 0;
    count.prev = 0;
    const animation = animate(count, +formatCurrencyNumeric(props.value, appCtx.appConfig.unit, props.shorten), { duration: 5 });
    setTimeout(() => {
      setAnimationFinished(1);
    }, 5000);
    return animation.stop;
  }, [appCtx.appConfig.unit]);

  return (
    <div className={props.rootClasses}>
      {
        animationFinished ? 
          <div className={props.currencyClasses}>
            {formatCurrency(props.value, appCtx.appConfig.unit, props.shorten)}
          </div>
        : 
          <div className={'d-flex ' + props.currencyClasses}>
            <motion.div>
              {rounded}
            </motion.div>
            {(props.shorten && appCtx.appConfig.unit === Units.SATS) ? 'K' : ''}
          </div>
      }
      <div className={props.unitClasses}>
        {appCtx.appConfig.unit}
      </div>
    </div>
  );
};

export default CurrencyBox;
