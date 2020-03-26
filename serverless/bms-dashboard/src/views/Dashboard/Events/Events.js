import React from 'react';
import { Card, CardBody, Table, Badge, Row, Col, Button } from 'reactstrap';

import alarmsData from '../Alarms/alarmsData';
import warningsData from '../Warnings/warningsData';
import eventsData from './eventsData';

const EventRow = ({ dataRow }) => {
  const getBadge = type => {
    let color;
    let typeText = type;
    if (type === 'Alarm') {
      color = 'danger';
    } else if (type === 'Warning') {
      color = 'warning';
    } else if (type !== 'Alarm') {
      typeText = 'Info';
      color = 'secondary';
    }

    return <Badge color={color}>{typeText}</Badge>;
  };
  return (
    <tr>
      <th scope='row'>{dataRow.date}</th>
      <td className='text-center'>{getBadge(dataRow.type)}</td>
      <td className='text-center'>{dataRow.message}</td>
    </tr>
  );
};

const Events = props => {
  const getData = (bit, type) => {
    let data;
    if (type === 'Alarm') {
      for (let a of alarmsData) {
        data = a.byteContent.find(b => b.bit === bit);
        if (typeof data !== 'undefined') break;
      }
    } else if (type === 'Warning') {
      for (let a of warningsData) {
        data = a.byteContent.find(b => b.bit === bit);
        if (typeof data !== 'undefined') {
          break;
        }
      }
    } else {
      for (let a of eventsData) {
        if (a.type === type) {
          data = a.state.find(a => a.bit === bit);
          if (typeof data !== 'undefined') {
            break;
          }
        }
      }
    }

    return data;
  };

  const getBinary = events => {
    let eventsWithBinary = [];
    for (let event of events) {
      if (event.type !== 'Alarm' && event.type !== 'Warning') {
        eventsWithBinary.push({ ...event, bit: event.status });
      } else {
        let statusList = props.toBinary(event.status);
        statusList.forEach((status, index) => {
          if (status === 1) {
            eventsWithBinary.push({ ...event, bit: index + 1 });
          }
        });
      }
    }
    return eventsWithBinary;
  };

  const getMessage = events => {
    let eventsWithMessage = [];
    for (let event of events) {
      let data = getData(event.bit, event.type);

      if (typeof data !== 'undefined') {
        if (event.type !== 'Alarm' && event.type !== 'Warning') {
          event.message = event.type + ' State ' + data.definition;
        } else {
          event.message = `${data.definition} (${data.name}) - ${event.direction}`;
        }
        eventsWithMessage.push(event);
      }
    }
    return eventsWithMessage;
  };

  const buildEventRows = () => {
    let alarmsWithMessage = [];
    let warningsWithMessage = [];
    let operatingsWithMessage = [];
    let contactorsWithMessage = [];

    if (!props.eventLog.alarms.reset) {
      const alarmsWithBinary = getBinary(props.eventLog.alarms.events);
      alarmsWithMessage = getMessage(alarmsWithBinary);
    }

    if (!props.eventLog.warnings.reset) {
      const warningsWithBinary = getBinary(props.eventLog.warnings.events);
      warningsWithMessage = getMessage(warningsWithBinary);
    }

    if (!props.eventLog.operatings.reset) {
      const operatingsWithBinary = getBinary(props.eventLog.operatings.events);
      operatingsWithMessage = getMessage(operatingsWithBinary);
    }

    if (!props.eventLog.contactors.reset) {
      const contactorsWithBinary = getBinary(props.eventLog.contactors.events);
      contactorsWithMessage = getMessage(contactorsWithBinary);
    }

    const allEvents = [
      ...alarmsWithMessage,
      ...warningsWithMessage,
      ...operatingsWithMessage,
      ...contactorsWithMessage
    ];
    const filteredEventRow = allEvents.filter(
      dr => dr.message !== 'NA (NA) - Occured'
    );
    return filteredEventRow.map((event, index) => (
      <EventRow key={index} dataRow={event} />
    ));
  };

  const renderResetButton = () => (
    <Row>
      <Col sm='12' className='d-none d-sm-inline-block'>
        <Button
          color='primary'
          className='float-right'
          onClick={e => props.onResetEventLogs(e)}
          disabled={!props.isSystemOnline}
        >
          <i className='icon-refresh'></i> Reset
        </Button>
      </Col>
    </Row>
  );

  const renderEventTable = () => (
    <div className='table-wrapper-scroll-y my-custom-scrollbar mt-3'>
      <Table hover responsive className='table-outline mb-0 d-none d-sm-table'>
        <thead className='thead-light'>
          <tr>
            <th>Date</th>
            <th className='text-center'>Type</th>
            <th className='text-center'>Message</th>
          </tr>
        </thead>
        <tbody>{buildEventRows()}</tbody>
      </Table>
    </div>
  );

  return (
    <Card>
      <CardBody>
        {renderResetButton()}
        {renderEventTable()}
      </CardBody>
    </Card>
  );
};

export default Events;
