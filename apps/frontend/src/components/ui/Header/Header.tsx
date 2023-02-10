import './Header.scss';
import { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import useHttp from '../../../hooks/use-http';
import useBreakpoint from '../../../hooks/use-breakpoint';
import { AppContext } from '../../../store/AppContext';
import { ApplicationModes, Breakpoints } from '../../../utilities/constants';
import { DayModeSVG } from '../../../svgs/DayMode';
import { NightModeSVG } from '../../../svgs/NightMode';
import Settings from '../Settings/Settings';

const Header = (props) => {
  const appCtx = useContext(AppContext);
  const currentScreenSize = useBreakpoint();
  const { updateConfig } = useHttp();

  const modeChangeHandler = (event: any) => {
    updateConfig({...appCtx.appConfig, appMode: (appCtx.appConfig.appMode === ApplicationModes.DARK ? ApplicationModes.LIGHT : ApplicationModes.DARK)});
  };

  if (currentScreenSize === Breakpoints.XS || currentScreenSize === Breakpoints.SM) {
    return (
      <Row className='header mb-5 mx-1' data-testid='header'>
        <Col xs={12} data-testid='header-info'>
          <Image src={appCtx.appConfig.appMode === ApplicationModes.DARK ? 'images/cln-logo-dark.png' : 'images/cln-logo-light.png'} className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
          <Col className='h-100 d-flex align-items-center justify-content-between'>
            <h4 className='m-0 text-dark'><strong>CLN</strong></h4>
            <div className='d-flex align-items-center'>
              <Settings compact={true} onShowNodeInfo={props.onShowNodeInfo} onShowConnectWallet={props.onShowConnectWallet} />
              {(appCtx.appConfig.appMode === ApplicationModes.DARK) ? <NightModeSVG className='svg-night ms-3 me-2' /> : <DayModeSVG className='svg-day ms-3 me-2' />}
            </div>
          </Col>
          <Row className='header-info-text my-2'>
            <Col xs={12} className='d-flex align-items-center text-light'>
            { appCtx.nodeInfo.isLoading ? 
                <><span className='d-inline-block mx-2 dot bg-warning'></span><span className='fs-7'>Loading...</span></> : 
              appCtx.nodeInfo.error ? 
                <><span className='d-inline-block mx-2 dot bg-danger'></span><span className='fs-7'>{('Error: ' + appCtx.nodeInfo.error)}</span></> : 
                <>
                  <span className='d-inline-block mx-2 dot bg-success'></span>
                  <span className='fs-7'>{appCtx.nodeInfo.alias + ' (' + appCtx.nodeInfo.version + ')'}</span>
                </>
            }
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={12} lg={8} data-testid='header-info'>
        <Image src={appCtx.appConfig.appMode === ApplicationModes.DARK ? 'images/cln-logo-dark.png' : 'images/cln-logo-light.png'} className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          {(currentScreenSize !== Breakpoints.MD) ?
            <h4 className='m-0 text-dark'><strong>Core Lightning Node</strong></h4>
          : 
            <Col xs={12} lg={4} className='d-flex align-items-center justify-content-between' data-testid='header-context'>
              <h4 className='m-0 text-dark'><strong>Core Lightning Node</strong></h4>
              <div className='d-flex align-items-center'>
                <Settings onShowNodeInfo={props.onShowNodeInfo} onShowConnectWallet={props.onShowConnectWallet} />
                {(appCtx.appConfig.appMode === ApplicationModes.DARK) ? <NightModeSVG className='svg-night ms-3 me-2' /> : <DayModeSVG className='svg-day ms-3 me-2' />}
              </div>
            </Col>
          }
          <Col xs={12} className='d-flex align-items-center text-light'>
            { appCtx.nodeInfo.isLoading ? 
                <><span className='d-inline-block me-2 dot bg-warning'></span><span className='fs-7'>Loading...</span></> : 
              appCtx.nodeInfo.error ? 
                <><span className='d-inline-block me-2 dot bg-danger'></span><span className='fs-7'>{('Error: ' + appCtx.nodeInfo.error)}</span></> : 
                <>
                  <span className='d-inline-block me-2 dot bg-success'></span>
                  <span className='fs-7'>{appCtx.nodeInfo.alias + ' (' + appCtx.nodeInfo.version + ')'}</span> 
                </>
            }
          </Col>
        </Row>
      </Col>
      {(currentScreenSize !== Breakpoints.MD) ?
        <Col xs={12} lg={4} className='d-flex align-items-center justify-content-end' data-testid='header-context'>
          <div className='d-flex align-items-center'>
            <Settings onShowNodeInfo={props.onShowNodeInfo} onShowConnectWallet={props.onShowConnectWallet} />
            <div onClick={modeChangeHandler}>
              {(appCtx.appConfig.appMode === ApplicationModes.DARK) ? <NightModeSVG className='svg-night ms-3 me-2' /> : <DayModeSVG className='svg-day ms-3 me-2'/>}
            </div>
          </div>
        </Col>
      :
        <></>
      }
    </Row>
  );
}

export default Header;
