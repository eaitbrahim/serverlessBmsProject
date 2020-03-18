import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import CurrentTime from './CurrentTime';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  loading = () => (
    <div className='animated fadeIn pt-1 text-center'>Loading...</div>
  );

  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' sm='6' lg='4'>
            <IsOnline
              isSystemOnline={this.props.isSystemOnline}
              systemId={this.props.systemId}
            />
          </Col>

          <Col xs='12' sm='6' lg='4'>
            <LastTime />
          </Col>

          <Col xs='12' sm='6' lg='4'>
            <CurrentTime />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
