import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb
} from '@coreui/react';

import routes from '../../routes';
import agent from '../../services/apiService';
import { getWSService } from '../../services/webSocketService';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  eventLog = {
    Alarm: { reset: false, events: [] },
    Warning: { reset: false, events: [] },
    Operating: { reset: false, events: [] },
    Contactor: { reset: false, events: [] }
  };
  state = {
    loading: false,
    isSystemOnline: false,
    systemId: '',
    systems: [],
    canMapping: [],
    metaData: {
      identification: [],
      canInfo: [],
      systemDescription: [],
      productInfo: []
    },
    primaryData: {}
  };

  dashboardMessageHandler = message => {
    if (message.BMSHWRSN === this.state.systemId) {
      if ('SOC' in message && 'SOCMax' in message && 'SOCMin' in message) {
        this.setState(prevState => ({
          primaryData: { ...message },
          isSystemOnline: message.IsOnline
        }));
        this.processEventLog();
      } else {
        this.setState(prevState => ({
          isSystemOnline: message.IsOnline
        }));
      }
    }
  };

  onLoading = () => (
    <div className='animated fadeIn pt-1 text-center'>Loading...</div>
  );

  signOut = e => {
    e.preventDefault();
    this.props.history.push('/login');
  };

  changeSystem = s => {
    this.eventLog = {
      Alarm: { reset: false, events: [] },
      Warning: { reset: false, events: [] },
      Operating: { reset: false, events: [] },
      Contactor: { reset: false, events: [] }
    };
    this.setState({
      isSystemOnline: false,
      systemId: '',
      canMapping: [],
      metaData: {
        identification: [],
        canInfo: [],
        systemDescription: [],
        productInfo: []
      },
      primaryData: {}
    });
    this.getDataById(s);
  };

  processEvent = (eventObj, status) => {
    if (eventObj.events.length === 0) {
      eventObj.events.push({
        reset: false,
        events: [
          {
            direction: 'Occured',
            date: this.state.primaryData.Localtime,
            status
          }
        ]
      });
    } else if (status !== eventObj.events[0].status) {
      if (eventObj.reset) {
        eventObj.push({
          reset: false,
          events: [
            {
              direction: 'Occured',
              date: this.state.primaryData.Localtime,
              status
            }
          ]
        });
      } else {
        eventObj.events[0].direction = 'Left';
        eventObj.events.unshift({
          direction: 'Occured',
          date: this.state.primaryData.Localtime,
          status
        });
      }
    }
    console.log('state:', this.eventLog.Alaram);
  };
  processEventLog = () => {
    this.processEvent(this.eventLog.Operating, this.state.primaryData.OpStatus);
    this.processEvent(
      this.eventLog.Contactor,
      this.state.primaryData.RlyStatus
    );
    this.processEvent(this.eventLog.Warning, this.state.primaryData.Warnings);
    this.processEvent(this.eventLog.Alarm, this.state.primaryData.Alarms);
  };

  onResetEventLogs = e => {
    e.preventDefault();

    this.eventLog = {
      Alarm: { reset: true },
      Warning: { reset: true },
      Operating: { reset: true },
      Contactor: { reset: true }
    };
  };

  getDataById = systemId => {
    const metaDataPromise = agent.fetchData.metaDataById(systemId);
    const primaryDataPromise = agent.fetchData.lastPrimaryDataById(systemId);
    const canMappingPromise = agent.fetchData.listOfCanMapping(systemId);

    this.setState({ loading: true });
    Promise.all([metaDataPromise, primaryDataPromise, canMappingPromise]).then(
      responses => {
        const { IsOnline, BMSHWRSN } = responses[0].metaData;
        const {
          Identification,
          CANInfo,
          SystemDescription,
          ProductInfo
        } = responses[0].metaData.Cluster;

        this.setState(prevState => ({
          loading: false,
          isSystemOnline: IsOnline,
          systemId: BMSHWRSN,
          metaData: {
            identification: Identification,
            canInfo: CANInfo,
            systemDescription: SystemDescription,
            productInfo: ProductInfo
          },
          primaryData: { ...responses[1].primaryData },
          canMapping: [...responses[2].canMapping]
        }));

        this.processEventLog();

        getWSService().addMessageListener(
          this.state.systemId,
          this.dashboardMessageHandler
        );
      }
    );
  };

  getListOfSystems = () => {
    this.setState({ loading: true });
    agent.fetchData.listOfSystems().then(({ systems }) => {
      this.setState({ systems });
      if (this.state.systems.length > 0) {
        this.getDataById(this.state.systems[0]);
      }
    });
  };

  componentDidMount() {
    this.getListOfSystems();
  }

  render() {
    return (
      <div className='app'>
        <AppHeader fixed>
          <Suspense fallback={this.onLoading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className='app-body'>
          <main className='main'>
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.onLoading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={() => (
                          <route.component
                            loading={this.state.loading}
                            onLoading={e => this.onLoading()}
                            isSystemOnline={this.state.isSystemOnline}
                            systemId={this.state.systemId}
                            primaryData={this.state.primaryData}
                            canMapping={this.state.canMapping}
                            eventLog={this.eventLog}
                            onResetEventLogs={e => this.onResetEventLogs(e)}
                          />
                        )}
                      />
                    ) : null;
                  })}
                  <Redirect from='/' to='/dashboard' />
                </Switch>
              </Suspense>
            </Container>
          </main>

          <AppAside fixed fixed display='lg'>
            <DefaultAside
              loading={this.state.loading}
              systems={this.state.systems}
              metaData={this.state.metaData}
              onChangeSystem={e => this.changeSystem(e)}
              onLoading={e => this.onLoading()}
            />
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.onLoading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
