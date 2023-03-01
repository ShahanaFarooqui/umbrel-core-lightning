import './FeerateRange.scss';
import { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import { FeeRate, FEE_RATES, Units } from '../../../utilities/constants';
import { AppContext } from '../../../store/AppContext';
import FiatBox from '../FiatBox/FiatBox';
import { InformationSVGRef } from '../../../svgs/Information';

const FeerateRange = (props) => {
  const appCtx = useContext(AppContext);
  const [recommendedfeeRate, setRecommendedfeeRate] = useState(FeeRate.NORMAL);
  
  useEffect(() => {
    // Urgent: appCtx.feeRate.perkw?.unilateral_close
    // Normal: appCtx.feeRate.perkw?.opening
    // Slow: appCtx.feeRate.perkw?.min_acceptable
    if (((appCtx.feeRate.perkw?.unilateral_close || 0) - (appCtx.feeRate.perkw?.opening || 0)) > 100) {
      setRecommendedfeeRate(FeeRate.URGENT);
    } else if (((appCtx.feeRate.perkw?.opening || 0) - (appCtx.feeRate.perkw?.min_acceptable || 0)) < 50) {
      setRecommendedfeeRate(FeeRate.SLOW);
    } else {
      setRecommendedfeeRate(FeeRate.NORMAL);
    }
  }, [appCtx.feeRate.perkw]);

  return (
    <>
      <Form.Label className='text-dark d-flex align-items-center justify-content-start'>
        Fee Rate
        <OverlayTrigger
          placement='right'
          delay={{ show: 300, hide: 300 }}
          overlay={<Tooltip>Recommended {recommendedfeeRate}</Tooltip>}
          >
          {({ ref, ...triggerHandler }) => (
            <span {...triggerHandler} >
              <InformationSVGRef ref={ref} svgClassName='mb-2 ms-1 information-svg svg-sm' className={'fill-light'} />
            </span>
          )}
        </OverlayTrigger>
      </Form.Label>
      <div className='slider-container'>
        <OverlayTrigger
          placement='top'
          delay={{ show: 300, hide: 300 }}
          overlay={
            <Tooltip className='feerate-tooltip' data-feerate={props.feeRate}>
              {props.feeRateValue} Sats/vB
               ≈ 
              <FiatBox className='ms-1' value={(props.feeRateValue || 0)} fromUnit={Units.SATS} symbol={appCtx.fiatConfig.symbol} rate={appCtx.fiatConfig.rate} />
            </Tooltip>
            }
          >
          <Form.Range tabIndex={props.tabIndex} className='slider-pic' id='feeRange' defaultValue={FEE_RATES.findIndex((fRate) => props.feeRate === fRate)} min='0' max='2' onChange={props.feeRateChangeHandler} />
        </OverlayTrigger>
      </div>
      <Row className='d-flex align-items-start justify-content-between'>
        {FEE_RATES.map((rate, i) => 
          <Col xs={4} className={'fs-7 text-light d-flex ' + (i === 0 ? 'justify-content-start' : i === 1 ? 'justify-content-center' : 'justify-content-end')} key={rate}>{rate}</Col>
        )}
      </Row>
    </>
  );
};

export default FeerateRange;
