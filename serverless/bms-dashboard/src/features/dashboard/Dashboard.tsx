import React from 'react';
import { Grid, GridColumn, List } from 'semantic-ui-react';
import { MetaData } from './MetaData';

export const Dashboard = () => {
  return (
    <Grid>
      <GridColumn width={5}>
        <MetaData></MetaData>
      </GridColumn>
      <GridColumn width={11}>
        <MetaData></MetaData>
      </GridColumn>
    </Grid>
  );
};
