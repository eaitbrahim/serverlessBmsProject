import React from 'react';
import { Card, CardBody } from 'reactstrap';

const FirstTime = (props) => {
  return (
    <Card className='text-white bg-dark'>
      {props.loading ? (
        props.onLoading()
      ) : (
        <CardBody style={{ minHeight: '105px' }}>
          <div className='text-value'>
            {typeof props.firstDateTime !== 'undefined' &&
            props.firstDateTime !== ''
              ? `First sample received at ${props.firstDateTime}`
              : `No primary data received so far!`}
          </div>
        </CardBody>
      )}
    </Card>
  );
};

export default FirstTime;
