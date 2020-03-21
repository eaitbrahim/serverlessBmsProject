import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

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
          <div className='small text-value'>Current time {this.state.time}</div>
        </CardBody>
      </Card>
    );
  }
}

export default Clock;
