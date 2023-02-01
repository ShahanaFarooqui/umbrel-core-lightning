import './OpenChannel.scss';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import logger from '../../../services/logger.service';
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';
import { formatFiatValue } from '../../../utilities/data-formatters';
import { CallStatus, FeeRate, FEE_RATES } from '../../../utilities/constants';
import { AppContext } from '../../../store/AppContext';
import { ActionSVG } from '../../../svgs/Action';
import { AmountSVG } from '../../../svgs/Amount';
import { AddressSVG } from '../../../svgs/Address';
import { InformationSVG } from '../../../svgs/Information';


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
    setResponseMessage('');
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
    <form onSubmit={openChannelHandler} className='h-100 mx-1'>
      <Row className='h-100 mx-1'>
        <Card className='d-flex align-items-stretch'>
          <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
              <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
                <div className='fs-4 p-0 fw-bold text-dark'>
                  Open Channel
                </div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
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
                        autoFocus
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
                    <p className='message invalid'>
                      {pubkeyHasError ? <InformationSVG svgClassName='me-1' className='fill-danger' /> : ''}
                      {pubkeyHasError ? 'Invalid Node ID' : ''}
                    </p>
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
                            ~ {appCtx.fiatConfig ? <FontAwesomeIcon icon={appCtx.fiatConfig.symbol} /> : <></>}
                            {formatFiatValue((+amountValue || 0), appCtx.fiatConfig.rate)}
                          </p>
                        :
                          <p className='message'></p>
                      :
                        <p className='message invalid'>
                          {amountHasError ? <InformationSVG svgClassName='me-1' className='fill-danger' /> : ''}
                          {
                            amountHasError ?
                              (+amountValue <= 0) ? 
                                'Amount should be greater than 0'
                              : (+amountValue > (appCtx.walletBalances.btcConfBalance || 0)) ? 
                                'Amount should be lesser then ' + (appCtx.walletBalances.btcConfBalance || 0)
                              :
                                'Invalid Amount'
                            :
                              'Invalid Amount'
                          }
                        </p>
                    }
                  </Col>
                  <Col xs={12}>
                    <Form.Label className='mb-3 me-4 text-dark'>Announce</Form.Label>
                    <Form.Check 
                      inline
                      tabIndex={3}
                      type='switch'
                      id='announce-switch'
                      onChange={() => setAnnounce(!announce)}
                      checked={announce}
                    />
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
                <Alert className='w-100' variant={responseStatus === CallStatus.ERROR ? 'danger' : responseStatus === CallStatus.PENDING ? 'warning' : responseStatus === CallStatus.SUCCESS ? 'success' : ''}>
                  {responseStatus === CallStatus.SUCCESS ? <InformationSVG svgClassName='me-1' className='fill-success' /> : responseStatus === CallStatus.ERROR ? <InformationSVG svgClassName='me-1' className='fill-danger' /> : responseStatus === CallStatus.PENDING ? <Spinner className='me-2' variant='primary' size='sm' /> : ''}
                  {responseStatus === CallStatus.PENDING ? 'Opening Channel...' : responseMessage}
                </Alert>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <Button tabIndex={5} type='submit' variant='primary' className='btn-rounded fw-bold' disabled={responseStatus === CallStatus.PENDING}>
                  Open Channel
                  <ActionSVG className='ms-2' />
                </Button>
              </Card.Footer>
          </Card.Body>
        </Card>
      </Row>
    </form>
  );
};

export default OpenChannel;
