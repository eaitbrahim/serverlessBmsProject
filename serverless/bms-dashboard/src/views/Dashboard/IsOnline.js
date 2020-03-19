import React from 'react';
import { Card, CardBody } from 'reactstrap';

const IsOnline = ({ isSystemOnline, systemId }) => {
  return (
    <Card
      className={
        isSystemOnline ? 'text-white bg-success' : 'text-white bg-danger'
      }
    >
      <CardBody>
        <div className='small text-value'>
          <strong>{systemId}</strong> is
          {isSystemOnline ? ' On Line' : ' Off Line'}
        </div>
      </CardBody>
    </Card>
  );
};

export default IsOnline;
