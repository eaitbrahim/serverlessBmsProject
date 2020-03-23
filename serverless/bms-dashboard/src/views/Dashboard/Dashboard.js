import React, { Suspense } from 'react';
import { Col, Row } from 'reactstrap';

import IsOnline from './IsOnline';
import LastTime from './LastTime';
import Clock from './Clock';
import SocSoh from './SocSoh';
import TemperatureVoltage from './TemperatureVoltage';
import Alarms from './Alarms/Alarms';
import Warnings from './Warnings/Warnings';
import Events from './Events/Events';

const loading = () => (
  <div className='animated fadeIn pt-1 text-center'>Loading...</div>
);

const Dashboard = props => {
  const getUnitFromCanMapping = key => {
    const canMappingObj = props.canMapping.find(cm => {
      return cm.Key === key;
    });
    return typeof canMappingObj !== 'undefined' ? canMappingObj.Unit : '';
  };

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
        <Col xs='6' sm='6' lg='6'>
          <TemperatureVoltage
            TModMax={props.primaryData.TModMax}
            TModMaxUnit={getUnitFromCanMapping('TModMax')}
            TModMaxID={props.primaryData.TModMaxID}
            TModMin={props.primaryData.TModMin}
            TModMinUnit={getUnitFromCanMapping('TModMin')}
            TModMinID={props.primaryData.TModMinID}
            VCellMax={props.primaryData.VCellMax}
            VCellMaxUnit={getUnitFromCanMapping('VCellMax')}
            VCellMaxID={props.primaryData.VCellMaxID}
            VCellMin={props.primaryData.VCellMin}
            VCellMinUnit={getUnitFromCanMapping('VCellMin')}
            VCellMinID={props.primaryData.VCellMinID}
          />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='12'>
          <Alarms alarmStatus={props.primaryData.Alarms} />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='12'>
          <Warnings warningStatus={props.primaryData.Warnings} />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='12'>
          <Events eventLog={props.eventLog} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
