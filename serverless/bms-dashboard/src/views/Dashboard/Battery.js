import React from 'react';
import { Card, CardBody, Table, Badge } from 'reactstrap';

const Battery = props => {
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
            <tbody>
              <tr>
                <td>
                  <div>{props.SOC} %</div>
                  <div className='battery'>
                    <div
                      className={`battery-level ${props.class}`}
                      style={{
                        height: props.SOC > 100 ? '100%' : `${props.SOC}%`
                      }}
                    ></div>
                  </div>
                  <div>
                    <Badge color={props.color}>{props.message}</Badge>
                  </div>
                </td>
                <td>
                  <p>
                    <small className='text-muted mr-3'>
                      <strong>Battery Voltage:</strong>
                      {props.VBattery + ' ' + props.VBatteryUnit}
                    </small>
                  </p>
                  <p>
                    <small className='text-muted mr-3'>
                      <strong>Battery Current:</strong>
                      {props.IBattery + ' ' + props.IBatteryUnit}
                    </small>
                  </p>
                  <p>
                    <small className='text-muted mr-3'>
                      <strong>Max Charge Current:</strong>
                      {props.IChgLimit + ' ' + props.IChgLimitUnit}
                    </small>
                  </p>
                  <p>
                    <small className='text-muted mr-3'>
                      <strong>Max Discharge Current:</strong>
                      {props.IDsgLimit + ' ' + props.IDsgLimitUnit}
                    </small>
                  </p>
                  <p>
                    <small className='text-muted mr-3'>
                      <strong>Operating State:</strong>
                      {props.OpStatus + ' ' + props.OpStatusUnit}
                    </small>
                  </p>
                  <p>
                    <small className='text-muted mr-3'>
                      <strong>Contactor State:</strong>
                      {props.RlyStatus + ' ' + props.RlyStatusUnit}
                    </small>
                  </p>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default Battery;
