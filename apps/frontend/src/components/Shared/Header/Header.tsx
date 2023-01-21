import './Header.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Breakpoints } from '../../../utilities/constants';
import { useContext } from 'react';
import { AppContext } from '../../../store/AppContext';
import useBreakpoint from '../../../hooks/use-breakpoint';
import Settings from '../Settings/Settings';

const Header = () => {
  const appCtx = useContext(AppContext);
  const currentScreenSize = useBreakpoint();

  if (currentScreenSize === Breakpoints.XS) {
    return (
      <Row className='header mb-5 mx-1' data-testid='header'>
        <Col xs={12} data-testid='header-info'>
          <Image src='images/cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
          <Col className='h-100 d-flex align-items-center justify-content-between'>
            <h4 className='m-0 text-dark'><strong>CLN</strong></h4>
            <Settings />
          </Col>
          <Row className='header-info-text my-2'>
            <Col xs={12} className='d-flex align-items-center text-light'>
              <span className={'d-inline-block mx-2 dot ' + ((appCtx.nodeInfo.id) ? 'bg-success' : (appCtx.nodeInfo.error) ? 'bg-danger' : 'bg-warning')}></span>
              { (appCtx.nodeInfo.id) ? 
                ((appCtx.nodeInfo.alias ? appCtx.nodeInfo.alias : appCtx.nodeInfo.id.substring(0,20)) + ' (' + appCtx.nodeInfo.version + ')')
              : 
                (appCtx.nodeInfo.error) ? 
                  ('Error: ' + appCtx.nodeInfo.error)
                : 
                  'Loading...'
              }
              <span className='d-inline-block square ms-2' style={{ backgroundColor: '#009001' }}></span>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <Row className='header mb-4 mx-1' data-testid='header'>
      <Col xs={12} lg={8} data-testid='header-info'>
        <Image src='images/cln-logo.png' className='header-info-logo me-3 rounded float-start' alt='Core Lightning Logo' />
        <Row className='header-info-text mt-3'>
          {(currentScreenSize !== Breakpoints.SM && currentScreenSize !== Breakpoints.MD) ?
            <h4 className='m-0 text-dark'><strong>Core Lightning Node</strong></h4>
          : 
            <Col xs={12} lg={4} className='d-flex align-items-center justify-content-between' data-testid='header-context'>
              <h4 className='m-0 text-dark'><strong>Core Lightning Node</strong></h4>
              <Settings />
            </Col>
          }
          <Col xs={12} className='d-flex align-items-center text-light'>
            <span className={'d-inline-block me-2 dot ' + ((appCtx.nodeInfo.id) ? 'bg-success' : (appCtx.nodeInfo.error) ? 'bg-danger' : 'bg-warning')}></span>
              { (appCtx.nodeInfo.id) ? 
                ((appCtx.nodeInfo.alias ? appCtx.nodeInfo.alias : appCtx.nodeInfo.id.substring(0,20)) + ' (' + appCtx.nodeInfo.version + ')')
              : 
                (appCtx.nodeInfo.error) ? 
                  ('Error: ' + appCtx.nodeInfo.error)
                : 
                  'Loading...'
              }
            <span className='d-inline-block square ms-2' style={{ backgroundColor: '#009001' }}></span>
          </Col>
        </Row>
      </Col>
      {(currentScreenSize !== Breakpoints.SM && currentScreenSize !== Breakpoints.MD) ?
        <Col xs={12} lg={4} className='d-flex align-items-center justify-content-end' data-testid='header-context'>
          <Settings />
        </Col>
      :
        <></>
      }
    </Row>
  );
}

export default Header;
