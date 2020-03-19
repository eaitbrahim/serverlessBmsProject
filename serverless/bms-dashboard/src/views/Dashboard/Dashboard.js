import React, { Component, lazy, Suspense } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table
} from 'reactstrap';

import IsOnline from './IsOnline';
import LastTime from './LastTime';
import Clock from './Clock';

const URL = 'wss://5xcuq4dlm1.execute-api.eu-central-1.amazonaws.com/dev';
const loading = () => (
  <div className='animated fadeIn pt-1 text-center'>Loading...</div>
);

const lastTime = primaryData => {
  console.log('primaryData:', primaryData);
  if (
    Object.keys(primaryData).length === 0 &&
    primaryData.constructor === Object
  ) {
    return '';
  }
  return primaryData.CreatedAt.substring(0, primaryData.CreatedAt.indexOf('.'))
    .replace('T', ', ')
    .replace(':', '/')
    .replace(':', '/');
};
//class Dashboard extends Component {
const Dashboard = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isSystemOnline: this.props.isSystemOnline,
  //     systemId: this.props.systemId,
  //     primaryData: { ...this.props.primaryData }
  //   };

  //   this.ws = new WebSocket(URL);
  // }

  // connectToWebSocket = () => {
  //   this.ws.onopen = () => {
  //     // on connecting, do nothing but log it to the console
  //     console.log('connected');
  //   };

  //   this.ws.onmessage = evt => {
  //     // on receiving a message, add it to the list of messages
  //     const message = JSON.parse(evt.data);
  //     this.addMessage(message);
  //   };

  //   this.ws.onclose = () => {
  //     console.log('disconnected');
  //     // automatically try to reconnect on connection loss
  //     this.setState({
  //       ws: new WebSocket(URL),
  //       isSystemOnline: false
  //     });
  //   };
  // };

  // addMessage = message => {
  //   if (message.BMSHWRSN === this.state.systemId) {
  //     this.setState(prevState => ({ primaryData: { ...message.primaryData } }));
  //   }
  // };

  // componentDidMount() {
  //   this.connectToWebSocket();
  //   console.log('state:', this.state);
  // }

  //render() {
  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12' sm='6' lg='3'>
          <Suspense fallback={loading()}>
            <IsOnline
              isSystemOnline={props.isSystemOnline}
              systemId={props.systemId}
            />
          </Suspense>
        </Col>

        <Col xs='12' sm='6' lg='5'>
          <Suspense fallback={loading()}>
            <LastTime lastDateTime={lastTime(props.primaryData)} />
          </Suspense>
        </Col>

        <Col xs='12' sm='6' lg='4'>
          <Clock />
        </Col>
      </Row>
    </div>
  );
  //}
};

export default Dashboard;
