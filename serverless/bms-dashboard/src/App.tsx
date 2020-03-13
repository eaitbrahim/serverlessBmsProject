import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    this.setState({
      values: [
        { id: 1, name: 'Value 101' },
        { id: 2, name: 'Value 102' }
      ]
    });
  }
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Uptime Guarantee</Header.Content>
        </Header>

        <List>
          <List.Item>Apples</List.Item>
          <List.Item>Pears</List.Item>
          <List.Item>Oranges</List.Item>
        </List>
      </div>
    );
  }
}

export default App;
