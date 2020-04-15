import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'reactstrap';
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from '@coreui/react';
import logo from '../../assets/img/brand/logo.png';
import sign from '../../assets/img/brand/sign.png';

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'Leclanche Logo' }}
          minimized={{
            src: sign,
            width: 30,
            height: 30,
            alt: 'Leclanche Logo',
          }}
        />
        <Nav className='d-md-down-none' navbar>
          <NavItem className='px-3'>
            <NavLink to='/dashboard' className='nav-link'>
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className='px-3'>
            <Link to='/users' className='nav-link'>
              Users
            </Link>
          </NavItem>
          <NavItem className='px-3'>
            <NavLink to='#' className='nav-link'>
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className='ml-auto' navbar>
          <NavItem className='d-md-down-none'>
            <NavLink to='#' className='nav-link'>
              <i className='icon-bell'></i>
              <Badge pill color='danger'>
                5
              </Badge>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction='down'>
            <DropdownToggle nav>
              <img
                src={'../../assets/img/avatars/7.jpg'}
                className='img-avatar'
                alt='admin@leclanche.com'
              />
              Admin Engineer
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag='div' className='text-center'>
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem>
                <i className='fa fa-user'></i> Profile
              </DropdownItem>
              <DropdownItem>
                <i className='fa fa-wrench'></i> Settings
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                <i className='fa fa-lock'></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler defaultOpen />
      </React.Fragment>
    );
  }
}

DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
