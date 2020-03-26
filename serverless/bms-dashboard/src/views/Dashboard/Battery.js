import React from 'react';
import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Battery = props => {
  return (
    <Card>
      <CardBody>
        {props.loading ? (
          props.onLoading()
        ) : (
          <>
            <Col xs='12' sm='6' lg='6'></Col>
            <Col xs='12' sm='6' lg='6'>
              <ListGroup className='list-group-accent' tag={'div'}>
                <ListGroupItem action tag='a'>
                  <div>
                    <small className='text-muted mr-3'>
                      <strong>Battery Voltage:</strong>
                      {props.VBattery}
                    </small>
                  </div>
                  <div>
                    <small className='text-muted mr-3'>
                      <strong>Battery Current:</strong>
                      {props.IBattery}
                    </small>
                  </div>
                  <div>
                    <small className='text-muted mr-3'>
                      <strong>Max Charge Current:</strong>
                      {props.IChgLimit}
                    </small>
                  </div>
                  <div>
                    <small className='text-muted mr-3'>
                      <strong>Max Discharge Current:</strong>
                      {props.IDsgLimit}
                    </small>
                  </div>
                  <div>
                    <small className='text-muted mr-3'>
                      <strong>Operating State:</strong>
                      {props.OpStatus}
                    </small>
                  </div>
                  <div>
                    <small className='text-muted mr-3'>
                      <strong>Contactor State:</strong>
                      {props.RlyStatus}
                    </small>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default Battery;
