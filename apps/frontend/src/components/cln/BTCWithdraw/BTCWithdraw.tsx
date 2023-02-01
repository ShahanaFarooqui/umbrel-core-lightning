import './BTCWithdraw.scss';
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
import { BitcoinWalletSVG } from '../../../svgs/BitcoinWallet';

const BTCWithdraw = (props) => {
  const appCtx = useContext(AppContext);
  const { btcWithdraw } = useHttp();
  const [feeRate, setFeeRate] = useState(FeeRate.NORMAL);
  const [responseStatus, setResponseStatus] = useState(CallStatus.NONE);
  const [responseMessage, setResponseMessage] = useState('');

  const isValidAmount = (value) => value === 'All' || (value > 0 && value <= (appCtx.walletBalances.btcConfBalance || 0));
  const isValidAddress = (value) => value.trim() !== '';

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isValidAddress);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isValidAmount);

  let formIsValid = false;

  if (addressIsValid && amountIsValid) {
    formIsValid = true;
  };
  
  const feeRateChangeHandler = (event) => {
    setFeeRate(FEE_RATES[+event.target.value]);
  };

  const resetFormValues = () => {
    resetAddress();
    resetAmount();
    setFeeRate(FeeRate.NORMAL);
  };

  const withdrawHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) { return; }
    setResponseStatus(CallStatus.PENDING);
    setResponseMessage('');
    btcWithdraw(addressValue, amountValue.toLowerCase(), feeRate.toLowerCase())
    .then((response: any) => {
      logger.info(response);
      setResponseStatus(CallStatus.SUCCESS);
      setResponseMessage('Transaction sent' + (response.data.txid ? (' with transaction id ' + response.data.txid) : ''));
      resetFormValues();
    })
    .catch(err => {
      logger.error(err.response && err.response.data ? err.response.data : err.message ? err.message : JSON.stringify(err));
      setResponseStatus(CallStatus.ERROR);
      setResponseMessage(err.response && err.response.data ? err.response.data : err.message ? err.message : JSON.stringify(err));
    });
  };

  return (
    <form onSubmit={withdrawHandler} className='h-100 mx-1'>
      <Row className='h-100 mx-1'>
        <Card className='d-flex align-items-stretch'>
          <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
              <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
                <div className='p-0 fw-bold text-primary d-flex align-items-center'>
                  <BitcoinWalletSVG svgClassName='svg-small me-2' className='fill-primary' />
                  <span>Bitcoin Wallet</span>
                </div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
              </Card.Header>
              <h4 className='text-blue fw-bold'>Withdraw</h4>
              <Card.Body className='py-0 px-1 d-flex flex-column align-items-start justify-content-between'>
                <Row className='d-flex align-items-start justify-content-center'>
                <Col xs={12}>
                    <Form.Label className='mb-1 pt-3 text-dark d-flex align-items-center justify-content-between'>
                      <span>Amount</span>
                      <Button variant='link' onClick={() => amountValue === 'All' ?  amountChangeHandler({target: {value: null}}) : amountChangeHandler({target: {value: 'All'}})}>{amountValue === 'All' ? 'Custom Amount' : 'Send All'}</Button>
                    </Form.Label>
                    <InputGroup className={(amountHasError ? 'invalid mb-2' : 'mb-2')}>
                      <InputGroup.Text className={'form-control-addon form-control-addon-left ' + (amountValue === 'All' ? 'form-control-addon-disabled' : '')}>
                        <AmountSVG />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        tabIndex={1}
                        id='amount'
                        type={amountValue === 'All' ? 'text' : 'number'}
                        placeholder={'Amount (Between 1 - ' + parseFloat((appCtx.walletBalances.btcConfBalance || 0).toString()).toLocaleString('en-us')  + ' Sats)'}
                        aria-label='amount'
                        aria-describedby='addon-amount'
                        className='form-control-right'
                        min='1'
                        max={appCtx.walletBalances.btcConfBalance}
                        value={amountValue}
                        onChange={amountChangeHandler}
                        onBlur={amountBlurHandler}
                        disabled={amountValue === 'All'}
                      />
                    </InputGroup>
                    {
                      !amountHasError ?
                        amountValue && amountValue !== 'All' ?
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
                    <Form.Label className='mb-1 text-dark'>Address</Form.Label>
                    <InputGroup className={(addressHasError ? 'invalid mb-2' : 'mb-2')}>
                      <InputGroup.Text className='form-control-addon form-control-addon-left'>
                        <AddressSVG />
                      </InputGroup.Text>
                      <Form.Control
                        tabIndex={2}
                        id='address'
                        type='text'
                        placeholder='Address'
                        aria-label='address'
                        aria-describedby='addon-address'
                        className='form-control-right'
                        value={addressValue}
                        onChange={addressChangeHandler}
                        onBlur={addressBlurHandler}
                      />
                    </InputGroup>
                    <p className='message invalid'>
                      {addressHasError ? <InformationSVG svgClassName='me-1' className='fill-danger' /> : ''}
                      {addressHasError ? 'Invalid Address' : ''}
                    </p>
                  </Col>
                  <Col xs={12}>
                    <Form.Label className='mb-1 text-dark d-flex align-items-center justify-content-between'>
                      Fee Rate
                    </Form.Label>
                    <Form.Range tabIndex={3} defaultValue={feeRate} min='0' max='2' onChange={feeRateChangeHandler} />
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
                <Button tabIndex={4} type='submit' variant='primary' className='btn-rounded fw-bold' disabled={responseStatus === CallStatus.PENDING}>
                  Withdraw
                  <ActionSVG className='ms-2' />
                </Button>
              </Card.Footer>
          </Card.Body>
        </Card>
      </Row>
    </form>
  );
};

export default BTCWithdraw;
