import React from 'react';
import { Card, CardBody } from 'reactstrap';

const LastTime = props => {
  return (
    <Card className='text-white bg-primary'>
      {props.loading ? (
        props.onLoading()
      ) : (
        <CardBody>
          <div className='small text-value'>
            {typeof props.lastDateTime !== 'undefined' &&
            props.lastDateTime !== ''
              ? `Last sample received at ${props.lastDateTime}`
              : `No primary data received so far!`}
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default LastTime;
