import React from 'react';
import { Card, CardBody, Table, Badge } from 'reactstrap';

import alarmsData from './alarmsData';

const AlarmRow = ({ alarmRow, alarmStatus }) => {
  const getBadge = (status, bit, name) => {
    return name === 'NA' ? 'secondary' : status === bit ? 'danger' : 'success';
  };

  return (
    <tr key={alarmRow.byteNum}>
      <th scope='row'>{alarmRow.byteNum}</th>
      {alarmRow.byteContent.map((bContent, index) => (
        <td className='text-center' key={bContent.bit + '-td-' + index}>
          <Badge color={getBadge(alarmStatus, bContent.bit, bContent.name)}>
            <span title={bContent.definition}>{bContent.name}</span>
          </Badge>
        </td>
      ))}
    </tr>
  );
};

const Alarms = props => {
  return (
    <Card>
      <CardBody>
        <Table
          hover
          responsive
          className='table-outline mb-0 d-none d-sm-table'
        >
          <thead className='thead-light'>
            <tr>
              <th>Alarm Status</th>
              <th className='text-center'>Bit 0</th>
              <th className='text-center'>Bit 1</th>
              <th className='text-center'>Bit 2</th>
              <th className='text-center'>Bit 3</th>
              <th className='text-center'>Bit 4</th>
              <th className='text-center'>Bit 5</th>
              <th className='text-center'>Bit 6</th>
              <th className='text-center'>Bit 7</th>
            </tr>
          </thead>
          <tbody>
            {alarmsData.map((alarmRow, index) => (
              <AlarmRow
                key={index}
                alarmRow={alarmRow}
                alarmStatus={props.alarmStatus}
              />
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Alarms;
