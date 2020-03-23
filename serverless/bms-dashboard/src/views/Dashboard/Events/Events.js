import React from 'react';
import { Card, CardBody, Table, Badge } from 'reactstrap';

import alarmsData from '../Alarms/alarmsData';
import warningsData from '../Warnings/warningsData';
import eventsData from './eventsData';

const EventRow = ({ eventRow }) => {
  const getBadge = type => {
    let color;
    let typeText = type;
    if (type === 'Alarm') {
      color = 'danger';
    } else if (type === 'Warning') {
      color = 'warning';
    } else {
      color = 'secondary';
      typeText = 'Info';
    }

    return <Badge color={color}>{typeText}</Badge>;
  };

  const getMessage = (bit, type) => {
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
            data.definition = type + ' State ' + data.definition;
            break;
          }
        }
      }
    }

    if (typeof data !== 'undefined') {
      return data.definition;
    }
    return '';
  };

  return (
    <tr>
      <th scope='row'>{eventRow.date}</th>
      <td className='text-center'>{getBadge(eventRow.type)}</td>
      <td className='text-center'>{getMessage(eventRow.bit, eventRow.type)}</td>
    </tr>
  );
};

const Events = props => {
  return (
    <Card>
      <CardBody>
        <div class='table-wrapper-scroll-y my-custom-scrollbar'>
          <Table
            hover
            responsive
            className='table-outline mb-0 d-none d-sm-table'
          >
            <thead className='thead-light'>
              <tr>
                <th>Date</th>
                <th className='text-center'>Type</th>
                <th className='text-center'>Message</th>
              </tr>
            </thead>
            <tbody>
              {props.eventLog.map((event, index) => (
                <EventRow key={index} eventRow={event} />
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default Events;
