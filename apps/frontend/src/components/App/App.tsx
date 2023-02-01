import './App.scss';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';

import useHttp from '../../hooks/use-http';
import { AppContext } from '../../store/AppContext';
import { ApplicationModes } from '../../utilities/constants';
import ToastMessage from '../shared/ToastMessage/ToastMessage';
import Header from '../ui/Header/Header';
import NodeInfo from '../modals/NodeInfo/NodeInfo';
import BTCWallet from '../cln/BTCWallet/BTCWallet';
import CLNWallet from '../cln/CLNWallet/CLNWallet';
import Channels from '../cln/Channels/Channels';
import Overview from '../cln/Overview/Overview';
import ConnectWallet from '../modals/ConnectWallet/ConnectWallet';
import OpenChannel from '../cln/OpenChannel/OpenChannel';
import BTCDeposit from '../cln/BTCDeposit/BTCDeposit';
import BTCWithdraw from '../cln/BTCWithdraw/BTCWithdraw';
import CLNReceive from '../cln/CLNReceive/CLNReceive';
import CLNSend from '../cln/CLNSend/CLNSend';

const App = () => {
  const appCtx = useContext(AppContext);
  const [showBTCWallet, setShowBTCWallet] = useState('wallet');
  const [showCLNWallet, setShowCLNWallet] = useState('wallet');
  const [showOpenChannel, setShowOpenChannel] = useState(false);
  const [showNodeInfoModal, setShowNodeInfoModal] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage] = useState('');
  
  const { fetchData } = useHttp();

  const bodyHTML = document.getElementsByTagName('body')[0];
  const htmlAttributes = bodyHTML.attributes;
  const theme = document.createAttribute('data-bs-theme');
  theme.value = (appCtx.appConfig.appMode)?.toLowerCase() || 'dark';
  bodyHTML.style.backgroundColor = (appCtx.appConfig.appMode === ApplicationModes.LIGHT) ? '#F4F7FE' : '#131314';
  htmlAttributes.setNamedItem(theme);

  useEffect(() => {
    fetchData();
    window.setInterval(() => {fetchData()}, (60 * 60 * 1000)); // one hour
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (appCtx.nodeInfo.isLoading) {
    return (
      <Container className='py-4' data-testid='container'>
        <Header />
        <Row className='mt-10'>
          <Col xs={12} className='d-flex align-items-center justify-content-center'>
            <Spinner animation='grow' variant='primary' />
          </Col>            
          <Col xs={12} className='d-flex align-items-center justify-content-center'>
            <div>Loading...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  if (appCtx.nodeInfo.error) {
    return (
      <Container className='py-4' data-testid='container'>
        <Header />
        <Row className='mt-10'>
          <Col xs={12} className='d-flex align-items-center justify-content-center'>
            {appCtx.nodeInfo.error}
          </Col>            
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container className='py-4' data-testid='container'>
        <Header onShowNodeInfo={() => setShowNodeInfoModal(true)} onShowConnectWallet={() => setShowConnectWalletModal(true)}/>
        <Row>
          <Col className='mx-1'><Overview /></Col>
        </Row>
        <Row className='node-info px-3'>
          <Col xs={12} lg={4} className='mb-4'>
            {
              showBTCWallet === 'wallet' ?
                <BTCWallet onDepositClick={() => setShowBTCWallet('deposit')} onWithdrawClick={() => setShowBTCWallet('withdraw')} />
              :
                showBTCWallet === 'deposit' ?
                  <BTCDeposit address={'Shahana'} onClose={() => setShowBTCWallet('wallet')} />
                :
                  <BTCWithdraw onClose={() => setShowBTCWallet('wallet')} />
            }
          </Col>
          <Col xs={12} lg={4} className='mb-4'>
            {
              showCLNWallet === 'wallet' ?
                <CLNWallet onReceiveClick={() => setShowCLNWallet('receive')} onSendClick={() => setShowCLNWallet('send')} />
              :
                showCLNWallet === 'receive' ?
                  <CLNReceive onClose={() => setShowCLNWallet('wallet')} />
                :
                  <CLNSend onClose={() => setShowCLNWallet('wallet')} />
            }
          </Col>
          <Col xs={12} lg={4} className='mb-4'>
            {(showOpenChannel) ?
              <OpenChannel onClose={() => setShowOpenChannel(false)} />
            :
              <Channels onOpenChannel={() => setShowOpenChannel(true)} />
            }
          </Col>
        </Row>
      </Container>
      <ToastMessage message={toastMessage} position='top-center' bg='primary' show={showToast} onClose={() => setShowToast(false)} />
      <NodeInfo show={showNodeInfoModal} onHide={() => setShowNodeInfoModal(false)} />
      <ConnectWallet show={showConnectWalletModal} onHide={() => setShowConnectWalletModal(false)} />
    </>
  );
}

export default App;
