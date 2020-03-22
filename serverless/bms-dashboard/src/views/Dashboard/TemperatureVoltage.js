import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

const TemperatureVoltage = props => {
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
              <th></th>
              <th className='text-center'>Battery Temperature</th>
              <th className='text-center'>Sensor Index</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Max</strong>
              </td>
              <td className='text-center'>{props.TModMax}</td>
              <td>
                <div className='text-center'>{props.TModMaxID}</div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Min</strong>
              </td>
              <td className='text-center'>{props.TModMin}</td>
              <td>
                <div className='text-center'>{props.TModMinID}</div>
              </td>
            </tr>
          </tbody>
        </Table>
        <br />

        <Table
          hover
          responsive
          className='table-outline mb-0 d-none d-sm-table'
        >
          <thead className='thead-light'>
            <tr>
              <th></th>
              <th className='text-center'>Cell Voltage</th>
              <th className='text-center'>Cell Index</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Max</strong>
              </td>
              <td className='text-center'>{props.VCellMax}</td>
              <td>
                <div className='text-center'>{props.VCellMaxID}</div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Min</strong>
              </td>
              <td className='text-center'>{props.VCellMin}</td>
              <td>
                <div className='text-center'>{props.VCellMinID}</div>
              </td>
            </tr>
          </tbody>
        </Table>
        <br />
      </CardBody>
    </Card>
  );
};

export default TemperatureVoltage;
