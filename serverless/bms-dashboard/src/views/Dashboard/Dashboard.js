import React from 'react';
import { Col, Row } from 'reactstrap';

import IsOnline from './IsOnline';
import LastTime from './LastTime';
import Clock from './Clock';
import SocSoh from './SocSoh';
import Battery from './Battery';
import TemperatureVoltage from './TemperatureVoltage';
import Alarms from './Alarms/Alarms';
import Warnings from './Warnings/Warnings';
import Events from './Events/Events';

const Dashboard = props => {
  const getUnitFromCanMapping = key => {
    const canMappingObj = props.canMapping.find(cm => {
      return cm.Key === key;
    });
    return typeof canMappingObj !== 'undefined' ? canMappingObj.Unit : '';
  };

  const toBinary = integer => {
    let result = [];
    if (typeof integer !== 'undefined') {
      let str = integer.toString(2);
      result = str
        .padStart(32, '0')
        .split('')
        .reverse()
        .map(r => parseInt(r));
    }

    return result;
  };

  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12' sm='6' lg='3'>
          <IsOnline
            isSystemOnline={props.isSystemOnline}
            systemId={props.systemId}
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>

        <Col xs='12' sm='6' lg='5'>
          <LastTime
            lastDateTime={props.primaryData ? props.primaryData.Localtime : ''}
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>

        <Col xs='12' sm='6' lg='4'>
          <Clock />
        </Col>
      </Row>

      <Row>
        <Col xs='12' sm='6' lg='4'>
          <SocSoh
            series={[props.primaryData.SOC, props.primaryData.SOH]}
            socMin={props.primaryData.SOCMin}
            socMax={props.primaryData.SOCMax}
            sohMin={props.primaryData.SOHMin}
            sohMax={props.primaryData.SOHMax}
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>
        <Col xs='12' sm='6' lg='4'>
          <Battery
            VBattery={props.primaryData.VBattery}
            IBattery={props.primaryData.IBattery}
            IChgLimit={props.primaryData.IChgLimit}
            IDsgLimit={props.primaryData.IDsgLimit}
            OpStatus={props.primaryData.OpStatus}
            RlyStatus={props.primaryData.RlyStatus}
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>
        <Col xs='12' sm='6' lg='4'>
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
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='12'>
          <Alarms
            alarmStatus={toBinary(props.primaryData.Alarms)}
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='12'>
          <Warnings
            warningStatus={toBinary(props.primaryData.Warnings)}
            loading={props.loading}
            onLoading={e => props.onLoading()}
          />
        </Col>
      </Row>

      <Row>
        <Col xs='6' sm='6' lg='12'>
          <Events
            isSystemOnline={props.isSystemOnline}
            eventLog={props.eventLog}
            onResetEventLogs={e => props.onResetEventLogs(e)}
            toBinary={i => toBinary(i)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
