import React from 'react';
import { Card, CardBody, Table, Badge } from 'reactstrap';

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
    let data = getData(bit, type);

    if (typeof data !== 'undefined') {
      if (type !== 'Alarm' && type !== 'Warning') {
        data.definition = type + ' State ' + data.definition;
      }
      return data.definition;
    }
    return '';
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

    console.log('dataRows:', dataRows);
    const filteredDataRow = dataRows.filter(dr => dr.message !== 'NA');
    console.log('filteredDataRow:', filteredDataRow);
    return filteredDataRow.map((data, index) => (
      <EventRow key={index} dataRow={data} />
    ));
  };

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
            <tbody>{buildEventRows()}</tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default Events;
