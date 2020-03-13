import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

export const NavBar = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Leclanche
        </Menu.Item>
        <Menu.Item>Battery Monitoring System</Menu.Item>
      </Container>
    </Menu>
  );
};
