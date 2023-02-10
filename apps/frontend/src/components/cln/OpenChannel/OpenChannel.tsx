import './OpenChannel.scss';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import logger from '../../../services/logger.service';
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';
import { CallStatus, FeeRate, FEE_RATES, BOUNCY_SPRING_VARIANTS_1 } from '../../../utilities/constants';
import { AppContext } from '../../../store/AppContext';
import { ActionSVG } from '../../../svgs/Action';
import { AmountSVG } from '../../../svgs/Amount';
import { AddressSVG } from '../../../svgs/Address';
import { InformationSVG } from '../../../svgs/Information';
import FiatBox from '../../shared/FiatBox/FiatBox';
import InvalidInputMessage from '../../shared/InvalidInputMessage/InvalidInputMessage';
import { CloseSVG } from '../../../svgs/Close';


const OpenChannel = (props) => {
  const appCtx = useContext(AppContext);
  const { openChannel } = useHttp();
  const [feeRate, setFeeRate] = useState(FeeRate.NORMAL);
  const [announce, setAnnounce] = useState(true);
  const [responseStatus, setResponseStatus] = useState(CallStatus.NONE);
  const [responseMessage, setResponseMessage] = useState('');
  const isValidAmount = (value) => value.trim() !== '' && value > 0 && value <= (appCtx.walletBalances.btcConfBalance || 0);
  const isValidPubkey = (value) => value.includes('@') && value.includes(':');

  const {
    value: pubkeyValue,
    isValid: pubkeyIsValid,
    hasError: pubkeyHasError,
    valueChangeHandler: pubkeyChangeHandler,
    inputBlurHandler: pubkeyBlurHandler,
    reset: resetPubkey,
  } = useInput(isValidPubkey);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isValidAmount);

  let formIsValid = false;

  if (pubkeyIsValid && amountIsValid) {
    formIsValid = true;
  };
  
  const feeRateChangeHandler = (event) => {
    setFeeRate(FEE_RATES[+event.target.value]);
  };

  const touchFormControls = () => {
    pubkeyBlurHandler(null);
    amountBlurHandler(null);
  };

  const resetFormValues = () => {
    resetPubkey();
    resetAmount();
    setAnnounce(true);
    setFeeRate(FeeRate.NORMAL);
  };

  const openChannelHandler = (event) => {
    event.preventDefault();
    touchFormControls();
    if (!formIsValid) { return; }
    setResponseStatus(CallStatus.PENDING);
    setResponseMessage('Opening Channel...');
    openChannel(pubkeyValue, +amountValue, feeRate.toLowerCase(), announce)
    .then((response: any) => {
      logger.info(response);
      if (response.data && (response.data.channel_id || response.data.txid)) {
        setResponseStatus(CallStatus.SUCCESS);
        setResponseMessage('Channel opened with ' + (response.data.channel_id ? ('channel id ' + response.data.channel_id) : ('transaction id ' + response.data.txid)));
        resetFormValues();
      } else {
        setResponseStatus(CallStatus.ERROR);
        setResponseMessage('Unknown Error');
      }
    })
    .catch(err => {
      logger.error(err.response && err.response.data ? err.response.data : err.message ? err.message : JSON.stringify(err));
      setResponseStatus(CallStatus.ERROR);
      setResponseMessage(err.response && err.response.data ? err.response.data : err.message ? err.message : JSON.stringify(err));
    });
  };

  return (
    <form onSubmit={openChannelHandler} className='h-100'>
      <Card className='h-100 d-flex align-items-stretch'>
        <Card.Body className='text-dark d-flex align-items-stretch flex-column pt-4'>
            <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
              <div className='fs-4 p-0 fw-bold text-dark'>
                Open Channel
              </div>
              <span className='span-close-svg' onClick={props.onClose}><CloseSVG /></span>
            </Card.Header>
            <Card.Body className='pb-0 px-1 d-flex flex-column align-items-start justify-content-between'>
              <Row className='d-flex align-items-start justify-content-center'>
                <Col xs={12}>
                  <Form.Label className='text-dark'>Node ID</Form.Label>
                  <InputGroup className={(pubkeyHasError ? 'invalid' : '')}>
                    <InputGroup.Text className='form-control-addon form-control-addon-left'>
                      <AddressSVG />
                    </InputGroup.Text>
                    <Form.Control
                      tabIndex={1}
                      id='pubkey'
                      type='text'
                      placeholder='Pubkey@Ip:Port'
                      aria-label='pubkey'
                      aria-describedby='addon-pubkey'
                      className='form-control-right'
                      value={pubkeyValue}
                      onChange={pubkeyChangeHandler}
                      onBlur={pubkeyBlurHandler}
                    />
                  </InputGroup>
                  {(pubkeyHasError) ?
                    <InvalidInputMessage message={'Invalid Node ID'} /> : <div className='message'></div>
                  }
                </Col>
                <Col xs={12}>
                  <Form.Label className='text-dark'>Amount</Form.Label>
                  <InputGroup className={(amountHasError ? 'invalid ' : '')}>
                    <InputGroup.Text className='form-control-addon form-control-addon-left'>
                      <AmountSVG />
                    </InputGroup.Text>
                    <Form.Control
                      tabIndex={2}
                      id='amount'
                      type='number'
                      placeholder={'Amount (Between 1 - ' + parseFloat((appCtx.walletBalances.btcConfBalance || 0).toString()).toLocaleString('en-us')  + ' Sats)'}
                      aria-label='amount'
                      aria-describedby='addon-amount'
                      className='form-control-right'
                      min='1'
                      max={appCtx.walletBalances.btcConfBalance}
                      value={amountValue}
                      onChange={amountChangeHandler}
                      onBlur={amountBlurHandler}
                    />
                  </InputGroup>
                  {
                    !amountHasError ?
                      amountValue ?
                        <p className='fs-7 text-light d-flex align-items-center justify-content-end'>
                          ~ <FiatBox value={(+amountValue || 0)} symbol={appCtx.fiatConfig.symbol} rate={appCtx.fiatConfig.rate} />
                        </p>
                      :
                        <p className='message'></p>
                    :
                      <InvalidInputMessage message={
                        (+amountValue <= 0) ? 
                          'Amount should be greater than 0'
                        : (+amountValue > (appCtx.walletBalances.btcConfBalance || 0)) ? 
                          'Amount should be lesser then ' + (appCtx.walletBalances.btcConfBalance || 0)
                        :
                          'Invalid Amount'
                      } />
                  }
                </Col>
                <Col xs={12} className='d-flex align-items-center mb-3'>
                  <Form.Label className='text-dark me-4'>Announce</Form.Label>
                  <div tabIndex={3} className='switch' data-isswitchon={announce} onClick={() => setAnnounce(!announce)}>
                    <motion.div className='handle' layout transition={BOUNCY_SPRING_VARIANTS_1} />
                  </div>
                </Col>
                <Col xs={12}>
                  <Form.Label className='text-dark d-flex align-items-center justify-content-between'>
                    Fee Rate
                  </Form.Label>
                  <Form.Range tabIndex={4} defaultValue={feeRate} min='0' max='2' onChange={feeRateChangeHandler} />
                  <Row className='d-flex align-items-start justify-content-between'>
                    {FEE_RATES.map((rate, i) => 
                      <Col xs={4} className={'fs-7 text-light d-flex ' + (i === 0 ? 'justify-content-start' : i === 1 ? 'justify-content-center' : 'justify-content-end')} key={rate}>{rate}</Col>
                    )}
                  </Row>
                </Col>
              </Row>
              { (responseStatus !== CallStatus.NONE) ?
                <Alert className='w-100' variant={responseStatus === CallStatus.ERROR ? 'danger' : responseStatus === CallStatus.PENDING ? 'warning' : responseStatus === CallStatus.SUCCESS ? 'success' : ''}>
                  {responseStatus === CallStatus.PENDING ? <Spinner className='me-2' variant='primary' size='sm' /> : <InformationSVG svgClassName='me-1' className={responseStatus === CallStatus.ERROR ? 'fill-danger' : 'fill-success'} />}
                  {responseMessage}
                </Alert>
              :
                <></>
              }
            </Card.Body>
            <Card.Footer className='d-flex justify-content-center'>
              <button tabIndex={5} type='submit' className='btn-rounded bg-primary' disabled={responseStatus === CallStatus.PENDING}>
                Open Channel
                <ActionSVG className='ms-3' />
              </button>
            </Card.Footer>
        </Card.Body>
      </Card>
    </form>
  );
};

export default OpenChannel;
