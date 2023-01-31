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

import logger from '../../../services/logger.service';
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';
import { AppContext } from '../../../store/AppContext';
import { ActionSVG } from '../../../svgs/Action';
import { AmountSVG } from '../../../svgs/Amount';
import { AddressSVG } from '../../../svgs/Address';
import { CallStatus } from '../../../utilities/constants';
import { InformationSVG } from '../../../svgs/Information';

const isNotEmpty = (value) => value.trim() !== '';
const isPubkey = (value) => value.includes('@') && value.includes(':');

const BTCWithdraw = (props) => {
  const { openChannel } = useHttp();
  const [responseStatus, setResponseStatus] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const appCtx = useContext(AppContext);
  const {
    value: pubkeyValue,
    isValid: pubkeyIsValid,
    hasError: pubkeyHasError,
    valueChangeHandler: pubkeyChangeHandler,
    inputBlurHandler: pubkeyBlurHandler,
    reset: resetPubkey,
  } = useInput(isPubkey);
  const {
    value: amountValue,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: resetAmount,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (pubkeyIsValid && amountIsValid) {
    formIsValid = true;
  }
  
  const BTCWithdrawHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) { return; }
    setResponseStatus(CallStatus.PENDING);
    openChannel(pubkeyValue, +amountValue, 'opening', true)
    .then((response: any) => {
      logger.info(response);
      setResponseStatus(CallStatus.SUCCESS);
      setResponseMessage(response.data);
      resetPubkey();
      resetAmount();
    })
    .catch(err => {
      logger.error(err.response.data);
      setResponseStatus(CallStatus.ERROR);
      setResponseMessage(err.response.data);
    });
  };

  return (
    <form onSubmit={BTCWithdrawHandler} className='h-100 mx-1'>
      <Row className='h-100 mx-1'>
        <Card className='d-flex align-items-stretch'>
          <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
              <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
                <div className='fs-4 p-0 fw-bold text-dark'>
                  Bitcoin Wallet Withdraw
                </div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
              </Card.Header>
              <Card.Body className='py-0 px-1 d-flex flex-column align-items-start justify-content-between'>
                <Row className='d-flex align-items-start justify-content-center'>
                  <Col xs={12}>
                    <Form.Label className='mb-1 pt-3 text-dark'>Node ID</Form.Label>
                    <InputGroup className={(pubkeyHasError ? 'invalid mb-2' : 'mb-2')}>
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
                    <p className='message invalid'>
                      {amountHasError ? <InformationSVG svgClassName='me-1' className='fill-danger' /> : ''}
                      {amountHasError ? 'Invalid Amount' : ''}
                    </p>
                  </Col>
                </Row>
                <Row className='d-flex align-items-start justify-content-center mb-2'>
                  <Col xs={12} className={responseStatus === CallStatus.ERROR ? 'message invalid' : responseStatus === CallStatus.PENDING ? 'message pending' : 'message success'}>
                    {responseStatus === CallStatus.SUCCESS ? <InformationSVG svgClassName='me-1' className='fill-success' /> : ''}
                    { responseStatus === CallStatus.PENDING ? 'Opening Channel...' : responseMessage }
                    {responseStatus === CallStatus.PENDING ? <Spinner animation='grow' variant='primary' /> : ''}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <Button type='submit' variant='primary' className='btn-rounded fw-bold' disabled={responseStatus === CallStatus.PENDING}>
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

export default BTCWithdraw;
