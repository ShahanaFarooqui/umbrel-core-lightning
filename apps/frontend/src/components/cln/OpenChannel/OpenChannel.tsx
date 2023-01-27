import './OpenChannel.scss';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';

import { AppContext } from '../../../store/AppContext';
import { formatCurrency } from '../../../utilities/data-formatters';
import { ActionSVG } from '../../../svgs/Action';
import Form from 'react-bootstrap/esm/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { AmountSVG } from '../../../svgs/Amount';
import { AddressSVG } from '../../../svgs/Address';
import useInput from '../../../hooks/use-input';
import { ErrorSVG } from '../../../svgs/Error';

const isNotEmpty = (value) => value.trim() !== '';
const isPubkey = (value) => value.includes('@') && value.includes(':');

const OpenChannel = (props) => {
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
  
  const submitHandler = (event) => {
    console.warn(event);
    console.warn(pubkeyValue);
    event.preventDefault();
    if (!formIsValid) { return; }
    console.log('Submitted!');
    console.log(pubkeyValue, amountValue);
    resetPubkey();
    resetAmount();
  };

  return (
    <form onSubmit={submitHandler} className='h-100 mx-1'>
      <Row className='h-100 mx-1'>
        <Card className='d-flex align-items-stretch'>
          <Card.Body className='d-flex align-items-stretch flex-column pt-4'>
              <Card.Header className='p-0 d-flex align-items-start justify-content-between'>
                <div className='fs-4 p-0 fw-bold text-dark'>
                  Open Channel
                </div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={props.onClose} size='lg' />
              </Card.Header>
              <Card.Body className='py-0 px-1'>
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
                    <p className='invalid-message'>
                      {pubkeyHasError ? <ErrorSVG className='me-1' /> : ''}
                      {pubkeyHasError ? 'Invalid Node ID' : ''}
                    </p>
                  </Col>
                </Row>
                <Row className='d-flex align-items-start justify-content-center'>
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
                    <p className='invalid-message'>
                      {amountHasError ? <ErrorSVG className='me-1' /> : ''}
                      {amountHasError ? 'Invalid Amount' : ''}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <Button type='submit' variant='primary' className='btn-rounded fw-bold'>
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
