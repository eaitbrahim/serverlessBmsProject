import React from 'react';
import { Card, CardBody } from 'reactstrap';

const LastTime = props => {
  return (
    <Card className='text-white bg-primary'>
      <CardBody>
        <div className='small text-value'>
          Last primary data received at {props.lastDateTime}
        </div>
      </CardBody>
    </Card>
  );
};

export default LastTime;
