import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

const TemperatureVoltage = props => {
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
                <th></th>
                <th className='text-center'>Max</th>
                <th className='text-center'>Min</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <small className='text-muted mr-3'>
                    <strong>Battery Temperature</strong>
                  </small>
                </td>
                <td className='text-center'>
                  {props.TModMax} {props.TModMaxUnit}
                </td>
                <td>
                  <div className='text-center'>
                    {props.TModMin} {props.TModMinUnit}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <small className='text-muted mr-3'>
                    <strong>Sensor Index</strong>
                  </small>
                </td>
                <td className='text-center'>{props.TModMaxID}</td>
                <td>
                  <div className='text-center'>{props.TModMinID}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <small className='text-muted mr-3'>
                    <strong>Cell Voltage</strong>
                  </small>
                </td>
                <td className='text-center'>
                  {props.VCellMax} {props.VCellMaxUnit}
                </td>
                <td>
                  <div className='text-center'>
                    {props.VCellMin} {props.VCellMinUnit}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <small className='text-muted mr-3'>
                    <strong>Cell Index</strong>
                  </small>
                </td>
                <td className='text-center'>{props.VCellMaxID}</td>
                <td>
                  <div className='text-center'>{props.VCellMinID}</div>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default TemperatureVoltage;
