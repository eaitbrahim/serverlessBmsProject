import React from 'react';
import { Row, Col, Card, CardBody, CardFooter, Progress } from 'reactstrap';
import Chart from 'react-apexcharts';

const optionsCircle = {
  chart: {
    id: 'radialBar',
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#e7e7e7',
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2,
        },
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: '22px',
        },
      },
    },
  },
  labels: ['SOC', 'SOH'],
  legend: {
    show: true,
    position: 'left',
    offsetX: -40,
    offsetY: -10,
    formatter: function (val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '%';
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91],
    },
  },
};

const loading = () => (
  <div className='animated fadeIn pt-1 text-center'>Loading...</div>
);

const SocSoh = (props) => {
  return (
    <Card style={{ minHeight: '315px' }}>
      {props.loading ? (
        props.onLoading()
      ) : (
        <CardBody>
          <Chart
            options={optionsCircle}
            series={props.series}
            type='radialBar'
          />
        </CardBody>
      )}
      {props.loading ? (
        props.onLoading()
      ) : (
        <CardFooter>
          <Row className='text-center'>
            <Col sm={12} md className='mb-sm-2 mb-0'>
              <div className='text-muted'>SOC Min</div>
              <strong>{props.socMin}%</strong>
              <Progress
                className='progress-xs mt-2'
                color='danger'
                value={props.socMin}
              />
            </Col>
            <Col sm={12} md className='mb-sm-2 mb-0 d-md-down-none'>
              <div className='text-muted'>SOC Max</div>
              <strong>{props.socMax}%</strong>
              <Progress
                className='progress-xs mt-2'
                color='success'
                value={props.socMax}
              />
            </Col>
            <Col sm={12} md className='mb-sm-2 mb-0'>
              <div className='text-muted'>SOH Min</div>
              <strong>{props.sohMin}%</strong>
              <Progress
                className='progress-xs mt-2'
                color='warning'
                value={props.sohMin}
              />
            </Col>
            <Col sm={12} md className='mb-sm-2 mb-0'>
              <div className='text-muted'>SOH Max</div>
              <strong>{props.sohMax}%</strong>
              <Progress
                className='progress-xs mt-2'
                color='primary'
                value={props.sohMax}
              />
            </Col>
          </Row>
        </CardFooter>
      )}
    </Card>
  );
};

export default SocSoh;
