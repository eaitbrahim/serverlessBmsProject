import React, { Suspense } from 'react';
import { Col, Row } from 'reactstrap';

import IsOnline from './IsOnline';
import LastTime from './LastTime';
import Clock from './Clock';
import SocSoh from './SocSoh';

const loading = () => (
  <div className='animated fadeIn pt-1 text-center'>Loading...</div>
);

const Dashboard = props => {
  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12' sm='6' lg='3'>
          <Suspense fallback={loading()}>
            <IsOnline
              isSystemOnline={props.isSystemOnline}
              systemId={props.systemId}
            />
          </Suspense>
        </Col>

        <Col xs='12' sm='6' lg='5'>
          <Suspense fallback={loading()}>
            <LastTime
              lastDateTime={
                props.primaryData ? props.primaryData.Localtime : ''
              }
            />
          </Suspense>
        </Col>

        <Col xs='12' sm='6' lg='4'>
          <Clock />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='6'>
          <Suspense fallback={loading()}>
            <SocSoh
              series={[props.primaryData.SOC, props.primaryData.SOH]}
              socMin={props.primaryData.SOCMin}
              socMax={props.primaryData.SOCMax}
              sohMin={props.primaryData.SOHMin}
              sohMax={props.primaryData.SOHMax}
            />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
