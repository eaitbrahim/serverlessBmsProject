import React from 'react';
import { Card, CardBody, Table, Badge } from 'reactstrap';

const Battery = (props) => {
  return (
    <Card style={{ minHeight: '315px' }}>
      <CardBody>
        {props.loading ? (
          props.onLoading()
        ) : (
          <Table
            hover
            responsive
            className='table-outline mb-0 d-none d-sm-table'
            style={{ minHeight: '270px' }}
          >
            <tbody>
              <tr>
                <td className='text-center'>
                  <div>{props.SOC} %</div>
                  <div className='battery'>
                    <div
                      className={`battery-level ${props.class}`}
                      style={{
                        height: props.SOC > 100 ? '100%' : `${props.SOC}%`,
                      }}
                    ></div>
                  </div>
                  <div>
                    <Badge color={props.color}>{props.message}</Badge>
                  </div>
                </td>
                <td style={{ padding: '0' }}>
                  <table className='table table-borderless'>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Battery Voltage:</strong>
                        </td>
                        <td>{props.VBattery + ' ' + props.VBatteryUnit}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Battery Current:</strong>
                        </td>
                        <td>{props.IBattery + ' ' + props.IBatteryUnit}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Max Charge Current:</strong>
                        </td>
                        <td>{props.IChgLimit + ' ' + props.IChgLimitUnit}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Max Discharge Current:</strong>
                        </td>
                        <td>{props.IDsgLimit + ' ' + props.IDsgLimitUnit}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Operating State:</strong>
                        </td>
                        <td>{props.OpStatus + ' ' + props.OpStatusUnit}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Contactor State:</strong>
                        </td>
                        <td>{props.RlyStatus + ' ' + props.RlyStatusUnit}</td>
                      </tr>
                    </tbody>
                  </table>
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
