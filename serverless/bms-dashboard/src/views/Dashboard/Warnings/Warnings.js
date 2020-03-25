import React from 'react';
import { Card, CardBody, Table, Badge } from 'reactstrap';

import warningsData from './warningsData';

const WarningRow = ({ warningRow, warningStatus }) => {
  const getBadge = (status, bit, name) => {
    return name === 'NA'
      ? 'secondary'
      : status[bit - 1] === 1
      ? 'warning'
      : 'success';
  };

  return (
    <tr key={warningRow.byteNum}>
      <th scope='row'>{warningRow.byteNum}</th>
      {warningRow.byteContent.map((bContent, index) => (
        <td className='text-center' key={bContent.bit + '-td-' + index}>
          <Badge color={getBadge(warningStatus, bContent.bit, bContent.name)}>
            <span title={bContent.definition}>{bContent.name}</span>
          </Badge>
        </td>
      ))}
    </tr>
  );
};

const Warnings = props => {
  return (
    <Card>
      <CardBody>
        {props.loading ? (
          props.onLoading()
        ) : (
          <Table
            hover
            responsive
            className='table-outline mb-0 d-none d-sm-table'
          >
            <thead className='thead-light'>
              <tr>
                <th>Warning Status</th>
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
              {warningsData.map((warningRow, index) => (
                <WarningRow
                  key={index}
                  warningRow={warningRow}
                  warningStatus={props.warningStatus}
                />
              ))}
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default Warnings;
