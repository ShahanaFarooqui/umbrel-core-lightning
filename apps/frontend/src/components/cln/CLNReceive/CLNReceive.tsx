import './CLNReceive.scss';
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

import logger from '../../../services/logger.service';
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';
import { formatFiatValue } from '../../../utilities/data-formatters';
import { CallStatus } from '../../../utilities/constants';
import { AppContext } from '../../../store/AppContext';
import { ActionSVG } from '../../../svgs/Action';
import { AmountSVG } from '../../../svgs/Amount';
import { DescriptionSVG } from '../../../svgs/Description';
import { InformationSVG } from '../../../svgs/Information';
import { LightningWalletSVG } from '../../../svgs/LightningWallet';
import QRCodeComponent from '../../shared/QRCode/QRCode';
import ToastMessage from '../../shared/ToastMessage/ToastMessage';

const CLNReceive = (props) => {
  const appCtx = useContext(AppContext);
  const { clnReceiveInvoice } = useHttp();
  const [showInvoice, setShowInvoice] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [responseStatus, setResponseStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const isValidAmount = (value) => value >= 0;
  const isValidDescription = (value) => value.trim() !== '';

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isValidDescription);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isValidAmount);

  let formIsValid = false;

  if (descriptionIsValid && amountIsValid) {
    formIsValid = true;
  };
  
  const resetFormValues = () => {
    resetDescription();
    resetAmount();
  };

  const CLNReceiveHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) { return; }
    setResponseStatus(CallStatus.PENDING);
    clnReceiveInvoice(+amountValue, descriptionValue, ('umbrellbl' + Math.random().toString(36).slice(2) + Date.now()))
    .then((response: any) => {
      logger.info(response);
      if (response.data && response.data.bolt11) {
        setResponseStatus(CallStatus.SUCCESS);
        setResponseMessage(response.data.bolt11);
        setShowInvoice(true);
        resetFormValues();
        } else {
        setResponseStatus(CallStatus.ERROR);
        setResponseMessage('Unknown Error');
      }
    })
    .catch(err => {
      logger.error(err.response.data);
      setResponseStatus(CallStatus.ERROR);
      setResponseMessage(err.response.data);
    });
  };

  if (showInvoice) {
    return (
      <Row className='h-100 mx-1'>
        <Card className='d-flex align-items-stretch'>
          <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
              <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
                <div className='p-0 fw-bold text-primary d-flex align-items-center'>
                  <LightningWalletSVG svgClassName='svg-small me-2' className='fill-primary' />
                  <span>Lightning Wallet</span>
                </div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
              </Card.Header>
              <h4 className='text-blue fw-bold'>Invoice</h4>
              <Card.Body className='py-0 px-1 d-flex flex-column align-items-start justify-content-between'>
                <Row className='w-100 d-flex align-items-start justify-content-center'>
                  <QRCodeComponent message={responseMessage} onCopy={() => setShowToast(true)} className='py-0 px-1 d-flex flex-column align-items-center justify-content-start' />
                </Row>
              </Card.Body>
          </Card.Body>
          <ToastMessage message='Invoice Copied!' position='top-center' bg='primary' show={showToast} onClose={() => setShowToast(false)} />
        </Card>
      </Row>
    );
  }

  return (
    <form onSubmit={CLNReceiveHandler} className='h-100 mx-1'>
      <Row className='h-100 mx-1'>
        <Card className='d-flex align-items-stretch'>
          <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
              <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
                <div className='p-0 fw-bold text-primary d-flex align-items-center'>
                  <LightningWalletSVG svgClassName='svg-small me-2' className='fill-primary' />
                  <span>Lightning Wallet</span>
                </div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
              </Card.Header>
              <h4 className='text-blue fw-bold'>Generate Invoice</h4>
              <Card.Body className='py-0 px-1 d-flex flex-column align-items-start justify-content-between'>
                <Row className='d-flex align-items-start justify-content-center'>
                  <Col xs={12}>
                    <Form.Label className='mb-1 pt-3 text-dark'>Description</Form.Label>
                    <InputGroup className={(descriptionHasError ? 'invalid mb-2' : 'mb-2')}>
                      <InputGroup.Text className='form-control-addon form-control-addon-left'>
                        <DescriptionSVG />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        tabIndex={1}
                        id='description'
                        type='text'
                        placeholder='Description'
                        aria-label='description'
                        aria-describedby='addon-description'
                        className='form-control-right'
                        value={descriptionValue}
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionBlurHandler}
                      />
                    </InputGroup>
                    <p className='message invalid'>
                      {descriptionHasError ? <InformationSVG svgClassName='me-1' className='fill-danger' /> : ''}
                      {descriptionHasError ? 'Invalid Description' : ''}
                    </p>
                  </Col>
                  <Col xs={12}>
                    <Form.Label className='mb-1 text-dark'>Amount</Form.Label>
                    <InputGroup className={(amountHasError ? 'invalid mb-2' : 'mb-2')}>
                      <InputGroup.Text className='form-control-addon form-control-addon-left'>
                        <AmountSVG />
                      </InputGroup.Text>
                      <Form.Control
                        tabIndex={2}
                        id='amount'
                        type='number'
                        placeholder='Amount (Sats)'
                        aria-label='amount'
                        aria-describedby='addon-amount'
                        className='form-control-right'
                        value={amountValue}
                        onChange={amountChangeHandler}
                        onBlur={amountBlurHandler}
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
                              (+amountValue < 0) ? 
                                'Amount should be greater than 0'
                              :
                                'Invalid Amount'
                            :
                              'Invalid Amount'
                          }
                        </p>
                    }
                  </Col>
                </Row>
                <Row className='d-flex align-items-start justify-content-center mb-2'>
                  <Col xs={12} className={responseStatus === CallStatus.ERROR ? 'message invalid' : responseStatus === CallStatus.PENDING ? 'message pending' : 'message success'}>
                    {responseStatus === CallStatus.SUCCESS ? <InformationSVG svgClassName='me-1' className='fill-success' /> : ''}
                    {responseStatus === CallStatus.PENDING ? 'Generating Invoice...' : responseMessage }
                    {responseStatus === CallStatus.PENDING ? <Spinner className='me-2' variant='primary' size='sm' /> : ''}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <Button tabIndex={3} type='submit' variant='primary' className='btn-rounded fw-bold' disabled={responseStatus === CallStatus.PENDING}>
                  Generate Invoice
                  <ActionSVG className='ms-2' />
                </Button>
              </Card.Footer>
          </Card.Body>
        </Card>
      </Row>
    </form>
  );
};

export default CLNReceive;