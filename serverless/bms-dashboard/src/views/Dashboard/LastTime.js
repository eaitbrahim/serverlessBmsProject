import React from 'react';
import { Card, CardBody } from 'reactstrap';

const LastTime = () => {
  return (
    <Card className='text-white bg-primary'>
      <CardBody>
        <div className='text-value'>Last primary data received at {}</div>
      </CardBody>
    </Card>
  );
};

export default LastTime;
