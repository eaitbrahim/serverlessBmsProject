import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';

import routes from '../../routes';
import agent from '../../api/agent';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

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
        identification,
        CANINFO,
        systtem,
        Cusotmer,
        Location,
        FabricationDate,
        InstallationDate,
        ContactMail,
        ContactTel
      } = responses[0].metaData.Cluster;
      const productInfo = [];
      Cusotmer.forEach(c => productInfo.push(c));
      Location.forEach(l => productInfo.push(l));
      FabricationDate.forEach(fd => productInfo.push(fd));
      InstallationDate.forEach(id => productInfo.push(id));
      ContactMail.forEach(cm => productInfo.push(cm));
      ContactTel.forEach(ct => productInfo.push(ct));

      this.setState({
        isSystemOnline: IsOnline,
        systemId: BMSHWRSN,
        metaData: {
          identification,
          canInfo: CANINFO,
          systemDescription: systtem,
          productInfo
        },
        primaryData: { ...responses[1].primaryData }
      });
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
