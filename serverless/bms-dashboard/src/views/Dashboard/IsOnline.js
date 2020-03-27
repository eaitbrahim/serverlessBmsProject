import React from 'react';
import { Card, CardBody } from 'reactstrap';

const IsOnline = props => {
  return (
    <Card
      className={
        props.isSystemOnline ? 'text-white bg-success' : 'text-white bg-danger'
      }
    >
      {props.loading ? (
        props.onLoading()
      ) : (
        <CardBody>
          <div className='text-value'>
            <small>
              {props.systemId} is
              {props.isSystemOnline ? ' On Line' : ' Off Line'}
            </small>
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default IsOnline;
