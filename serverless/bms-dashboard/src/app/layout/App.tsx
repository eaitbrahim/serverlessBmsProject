import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IIdentification } from '../models/identification';
import { ISystemDescription } from '../models/systemDescription';
import { NavBar } from '../../features/nav/NavBar';
import { Dashboard } from '../../features/dashboard/Dashboard';

const App = () => {
  const [identification, setIdentification] = useState<IIdentification[]>([]);
  const [systemDescription, setSystemDescription] = useState<
    ISystemDescription[]
  >([]);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{ marginTop: '7em' }}>
        <Dashboard></Dashboard>
      </Container>
    </Fragment>
  );
};

export default App;
