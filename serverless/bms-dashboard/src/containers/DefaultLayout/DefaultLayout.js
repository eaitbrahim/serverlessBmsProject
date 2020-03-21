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
const chatMessageHandler = message => {
  console.log('Received message:', message);
};

class DefaultLayout extends Component {
  state = {
    isSystemOnline: false,
    systemId: '',
    systems: [],
    metaData: {
      identification: [],
      canInfo: [],
      systemDescription: [],
      productInfo: []
    },
    primaryData: {}
  };

  socketConnection = null;

  dashboardMessageHandler = message => {
    this.setState(prevState => ({ primaryData: { ...message } }));
  };

  loading = () => (
    <div className='animated fadeIn pt-1 text-center'>Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push('/login');
  }

  changeSystem(s) {
    this.setState({
      metaData: {
        identification: [],
        canInfo: [],
        systemDescription: [],
        productInfo: []
      },
      primaryData: {}
    });
    this.getDataById(s);
  }

  getDataById = systemId => {
    const metaDataPromise = agent.fetchData.metaDataById(systemId);
    const primaryDataPromise = agent.fetchData.lastPrimaryDataById(systemId);

    Promise.all([metaDataPromise, primaryDataPromise]).then(responses => {
      const { IsOnline, BMSHWRSN } = responses[0].metaData;
      const {
        Identification,
        CANInfo,
        SystemDescription,
        ProductInfo
      } = responses[0].metaData.Cluster;

      this.setState({
        isSystemOnline: IsOnline,
        systemId: BMSHWRSN,
        metaData: {
          identification: Identification,
          canInfo: CANInfo,
          systemDescription: SystemDescription,
          productInfo: ProductInfo
        },
        primaryData: { ...responses[1].primaryData }
      });

      getWSService().addMessageListener(
        this.state.systemId,
        this.dashboardMessageHandler
      );
    });
  };

  getListOfSystems = () => {
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
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className='app-body'>
          <main className='main'>
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
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
                            isSystemOnline={this.state.isSystemOnline}
                            systemId={this.state.systemId}
                            primaryData={this.state.primaryData}
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
            <Suspense fallback={this.loading()}>
              <DefaultAside
                systems={this.state.systems}
                metaData={this.state.metaData}
                onChangeSystem={e => this.changeSystem(e)}
              />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
