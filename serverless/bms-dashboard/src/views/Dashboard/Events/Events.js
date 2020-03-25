import React from 'react';
import { Card, CardBody, Table, Badge, Row, Col, Button } from 'reactstrap';

import alarmsData from '../Alarms/alarmsData';
import warningsData from '../Warnings/warningsData';
import eventsData from './eventsData';

const EventRow = ({ dataRow }) => {
  return (
    <tr>
      <th scope='row'>{dataRow.date}</th>
      <td className='text-center'>{dataRow.badge}</td>
      <td className='text-center'>{dataRow.message}</td>
    </tr>
  );
};

const Events = props => {
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

  const getMessage = (bit, type) => {
    let result = '';
    let data = getData(bit, type);

    if (typeof data !== 'undefined') {
      if (type !== 'Alarm' && type !== 'Warning') {
        result = type + ' State ' + data.definition;
      } else {
        result = data.definition;
      }
    }
    return result;
  };

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

  const buildEventRows = () => {
    const dataRows = props.eventLogList.map(event => ({
      date: event.date,
      badge: getBadge(event.type),
      message: getMessage(event.bit, event.type)
    }));

    const filteredDataRow = dataRows.filter(dr => dr.message !== 'NA');
    return filteredDataRow.map((data, index) => (
      <EventRow key={index} dataRow={data} />
    ));
  };

  const renderResetButton = () => (
    <Row>
      <Col sm='12' className='d-none d-sm-inline-block'>
        <Button
          color='primary'
          className='float-right'
          onClick={e => props.onResetEventLogs(e)}
        >
          <i className='icon-refresh'></i> Reset
        </Button>
      </Col>
    </Row>
  );

  const renderEventTable = () => (
    <div class='table-wrapper-scroll-y my-custom-scrollbar mt-3'>
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
