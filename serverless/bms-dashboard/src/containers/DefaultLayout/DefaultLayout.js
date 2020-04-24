import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
} from '@coreui/react';

import routes from '../../routes';
import agent from '../../services/apiService';
import { getWSService } from '../../services/webSocketService';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  eventLog = {
    operatingChanged: false,
    contactorChanged: false,
    warningChanged: false,
    alarmChanged: false,
    Alarm: [],
    Warning: [],
    Operating: [],
    Contactor: [],
  };

  state = {
    loading: false,
    isSystemOnline: false,
    systemId: '',
    systems: [],
    canMapping: [],
    events: {
      Alarm: [],
      Warning: [],
      Operating: [],
      Contactor: [],
    },
    metaData: {
      identification: [],
      canInfo: [],
      systemDescription: [],
      productInfo: [],
    },
    primaryData: {},
    firstPrimaryData: {},
  };

  dashboardMessageHandler = (message) => {
    if (message.BMSHWRSN === this.state.systemId) {
      if ('SOC' in message && 'SOCMax' in message && 'SOCMin' in message) {
        if (this.isPrimaryDataNew({ ...message })) {
          this.setState((prevState) => ({
            primaryData: { ...message },
            isSystemOnline: message.IsOnline,
          }));

          if (this.eventLog.operatingChanged) {
            this.eventLog.operatingChanged = false;
            this.addEvent(
              this.state.primaryData.OpStatus,
              this.state.primaryData.Localtime,
              'Operating'
            );
          }

          if (this.eventLog.contactorChanged) {
            this.eventLog.contactorChanged = false;
            this.addEvent(
              this.state.primaryData.RlyStatus,
              this.state.primaryData.Localtime,
              'Contactor'
            );
          }

          if (this.eventLog.warningChanged) {
            this.eventLog.warningChanged = false;
            this.addEvent(
              this.state.primaryData.Warnings,
              this.state.primaryData.Localtime,
              'Warning'
            );
          }

          if (this.eventLog.alarmChanged) {
            this.eventLog.alarmChanged = false;
            this.addEvent(
              this.state.primaryData.Alarms,
              this.state.primaryData.Localtime,
              'Alarm'
            );
          }
        }
      } else {
        //No primary data received
        this.setState((prevState) => ({
          isSystemOnline: message.IsOnline,
        }));
      }
    }
  };

  isPrimaryDataNew = (newPrimaryData) => {
    let changed = false;
    if (this.state.primaryData.HB1 !== newPrimaryData.HB1) changed = true;
    if (this.state.primaryData.SOC !== newPrimaryData.SOC) changed = true;
    if (this.state.primaryData.SOCMax !== newPrimaryData.SOCMax) changed = true;
    if (this.state.primaryData.SOCMin !== newPrimaryData.SOCMin) changed = true;
    if (this.state.primaryData.IChgLimit !== newPrimaryData.IChgLimit)
      changed = true;
    if (this.state.primaryData.IDsgLimit !== newPrimaryData.IDsgLimit)
      changed = true;
    if (this.state.primaryData.HB2 !== newPrimaryData.HB2) changed = true;
    if (this.state.primaryData.SOH !== newPrimaryData.SOH) changed = true;
    if (this.state.primaryData.SOHMin !== newPrimaryData.SOHMin) changed = true;
    if (this.state.primaryData.SOHMax !== newPrimaryData.SOHMax) changed = true;
    if (this.state.primaryData.VBattery !== newPrimaryData.VBattery)
      changed = true;
    if (this.state.primaryData.IBattery !== newPrimaryData.IBattery)
      changed = true;
    if (this.state.primaryData.VCellMin !== newPrimaryData.VCellMin)
      changed = true;
    if (this.state.primaryData.VCellMinID !== newPrimaryData.VCellMinID)
      changed = true;
    if (this.state.primaryData.VCellMax !== newPrimaryData.VCellMax)
      changed = true;
    if (this.state.primaryData.VCellMaxID !== newPrimaryData.VCellMaxID)
      changed = true;
    if (this.state.primaryData.TModMin !== newPrimaryData.TModMin)
      changed = true;
    if (this.state.primaryData.TModMax !== newPrimaryData.TModMax)
      changed = true;
    if (this.state.primaryData.TModMinID !== newPrimaryData.TModMinID)
      changed = true;
    if (this.state.primaryData.TModMaxID !== newPrimaryData.TModMaxID)
      changed = true;
    if (this.state.primaryData.TModAvg !== newPrimaryData.TModAvg)
      changed = true;
    if (this.state.primaryData.HIBattery !== newPrimaryData.HIBattery)
      changed = true;
    if (this.state.primaryData.reserved !== newPrimaryData.reserved)
      changed = true;
    if (this.state.primaryData.OpStatus !== newPrimaryData.OpStatus) {
      this.eventLog.operatingChanged = true;
      changed = true;
    }
    if (this.state.primaryData.RlyStatus !== newPrimaryData.RlyStatus) {
      this.eventLog.contactorChanged = true;
      changed = true;
    }

    if (this.state.primaryData.Alarms !== newPrimaryData.Alarms) {
      this.eventLog.alarmChanged = true;
      changed = true;
    }
    if (this.state.primaryData.Warnings !== newPrimaryData.Warnings) {
      this.eventLog.warningChanged = true;
      changed = true;
    }

    return changed;
  };

  onLoading = () => (
    <div className='animated fadeIn pt-1 text-center'>Loading...</div>
  );

  signOut = (e) => {
    e.preventDefault();
    this.props.history.push('/login');
  };

  changeSystem = (s) => {
    this.eventLog = {
      Alarm: [],
      Warning: [],
      Operating: [],
      Contactor: [],
    };
    this.setState({
      isSystemOnline: false,
      systemId: '',
      canMapping: [],
      events: {
        reset: false,
        Alarm: [],
        Warning: [],
        Operating: [],
        Contactor: [],
      },
      metaData: {
        identification: [],
        canInfo: [],
        systemDescription: [],
        productInfo: [],
      },
      primaryData: {},
      firstPrimaryData: {},
    });
    this.getDataById(s);
  };

  addEvent = (status, date, type) => {
    let bits = [];
    if (this.eventLog[type].length === 0) {
      bits = this.getBits(status, type);
      bits.forEach((bit) => {
        this.eventLog[type].push({
          direction: 'Occured',
          date,
          status,
          type,
          bit,
          hide: false,
        });
      });
      this.updateEventsState();
    } else {
      bits = this.getBits(status, type);
      this.eventLog[type].forEach((oldEvent) => {
        // Process left events
        if (!bits.includes(oldEvent.bit) && oldEvent.direction === 'Occured') {
          this.eventLog[type].unshift({
            direction: 'Left',
            date,
            status,
            type,
            bit: oldEvent.bit,
            hide: false,
          });
          this.updateEventsState();
        }
      });
      // Process occured event
      bits.forEach((bit) => {
        const bitIndex = this.eventLog[type].findIndex(
          (event) =>
            event.bit === bit && event.direction === 'Occured' && !event.hide
        );
        if (bitIndex === -1) {
          this.eventLog[type].unshift({
            direction: 'Occured',
            date,
            status,
            type,
            bit,
            hide: false,
          });
          this.updateEventsState();
        }
      });
    }
  };

  updateEventsState = () => {
    this.setState({
      events: {
        Alarm: [...this.eventLog.Alarm],
        Warning: [...this.eventLog.Warning],
        Operating: [...this.eventLog.Operating],
        Contactor: [...this.eventLog.Contactor],
      },
    });
  };

  getBits = (status, type) => {
    let bits = [];
    if (type !== 'Alarm' && type !== 'Warning') {
      bits.push(status);
    } else {
      let statusList = this.toBinary(status);
      statusList.forEach((status, index) => {
        if (status === 1) {
          bits.push(index + 1);
        }
      });
    }
    return bits;
  };

  toBinary = (integer) => {
    let result = [];
    if (typeof integer !== 'undefined') {
      let str = integer.toString(2);
      result = str
        .padStart(32, '0')
        .split('')
        .reverse()
        .map((r) => parseInt(r));
    }

    return result;
  };

  processAllEventsLog = () => {
    this.addEvent(
      this.state.primaryData.OpStatus,
      this.state.primaryData.Localtime,
      'Operating'
    );
    this.addEvent(
      this.state.primaryData.RlyStatus,
      this.state.primaryData.Localtime,
      'Contactor'
    );
    this.addEvent(
      this.state.primaryData.Warnings,
      this.state.primaryData.Localtime,
      'Warning'
    );
    this.addEvent(
      this.state.primaryData.Alarms,
      this.state.primaryData.Localtime,
      'Alarm'
    );
  };

  onHideEventLogs = (e) => {
    e.preventDefault();

    this.hideEvents('Alarm');
    this.hideEvents('Warning');
    this.hideEvents('Operating');
    this.hideEvents('Contactor');

    this.updateEventsState();
  };

  hideEvents = (type) => {
    for (let event of this.eventLog[type]) {
      event.hide = true;
    }
  };

  getDataById = (systemId) => {
    const metaDataPromise = agent.fetchData.metaDataById(systemId);
    const lastPrimaryDataPromise = agent.fetchData.lastPrimaryDataById(
      systemId
    );
    const firstPrimaryDataPromise = agent.fetchData.firstPrimaryDataById(
      systemId
    );
    const canMappingPromise = agent.fetchData.listOfCanMapping(systemId);

    this.setState({ loading: true });
    Promise.all([
      metaDataPromise,
      lastPrimaryDataPromise,
      firstPrimaryDataPromise,
      canMappingPromise,
    ]).then((responses) => {
      const { IsOnline, BMSHWRSN } = responses[0].metaData;
      const {
        Identification,
        CANInfo,
        SystemDescription,
        ProductInfo,
      } = responses[0].metaData.Cluster;

      this.setState((prevState) => ({
        loading: false,
        isSystemOnline: IsOnline,
        systemId: BMSHWRSN,
        metaData: {
          identification: Identification,
          canInfo: CANInfo,
          systemDescription: SystemDescription,
          productInfo: ProductInfo,
        },
        primaryData: { ...responses[1].primaryData },
        firstPrimaryData: { ...responses[2].primaryData },
        canMapping: [...responses[3].canMapping],
      }));

      this.processAllEventsLog();

      getWSService().addMessageListener(
        this.state.systemId,
        this.dashboardMessageHandler
      );
    });
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
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
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
                            onLoading={(e) => this.onLoading()}
                            isSystemOnline={this.state.isSystemOnline}
                            systemId={this.state.systemId}
                            firstPrimaryData={this.state.firstPrimaryData}
                            primaryData={this.state.primaryData}
                            canMapping={this.state.canMapping}
                            eventLog={this.state.events}
                            onHideEventLogs={(e) => this.onHideEventLogs(e)}
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
              selectedSystem={this.state.systemId}
              metaData={this.state.metaData}
              onChangeSystem={(e) => this.changeSystem(e)}
              onLoading={(e) => this.onLoading()}
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
