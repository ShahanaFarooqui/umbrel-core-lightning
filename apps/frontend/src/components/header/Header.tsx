import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

function Header() {
  return (
    <Row className="header" data-testid="header">
      <Col xs={11} className="text-start" data-testid="header-logo">
        <Image src='cln-logo.png' className="header-logo-image rounded float-start" alt='Core Lightning Logo' />
        <h3>CLN Node</h3>
      </Col>
      <Col xs={1} className="text-end h3" data-testid="header-context">
        <FontAwesomeIcon icon={faBars} className="fa-lg" />
      </Col>
    </Row>
  );
}

export default Header;
