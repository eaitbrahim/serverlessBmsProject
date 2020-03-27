import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  componentDidMount() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <Card className='text-white bg-warning'>
        <CardBody>
          <div className='text-value'>
            <small>
              Current date & time{' '}
              {moment(this.state.time).format('YYYY-MM-DD HH:mm:ss')}
            </small>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Clock;
