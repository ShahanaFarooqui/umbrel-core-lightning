import './Overview.scss';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import InfoBox from '../../shared/info-box/InfoBox';
import { NumberTypes } from '../../utilities/constants';

const Overview = () => {
  return (
    <Row className='mx-1'>
      <Card>
        <Card.Body>
          <Card.Title className='fs-4 fw-bold'>Overview</Card.Title>
          <div className='d-flex justify-content-between'>
            <InfoBox title='Total Balance' value='399506' type={NumberTypes.CURRENCY} />
            <InfoBox title='Active Channels' value='24' type={NumberTypes.COMMON} />
            <InfoBox title='Peers' value='18' type={NumberTypes.COMMON} />
            <InfoBox title='Max Send' value='200506' type={NumberTypes.CURRENCY} />
            <InfoBox title='Max Receive' value='345193' type={NumberTypes.CURRENCY} />
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
}

export default Overview;
