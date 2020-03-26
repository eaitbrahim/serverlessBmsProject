import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react';

const defaultProps = {};

class DefaultAside extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      dropdownOpen: false
    };
  }

  constructSystems = () => {
    return this.props.systems.map(s => {
      return (
        <DropdownItem key={s} onClick={e => this.props.onChangeSystem(s)}>
          {s}
        </DropdownItem>
      );
    });
  };
  constructMetaData = metaData => {
    return metaData.map(md => {
      return (
        <div key={md.Key}>
          {md.Key}: <small className='text-muted mr-3'>{md.Value}</small>
        </div>
      );
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen });

  render() {
    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              <i className='icon-settings'></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              <i className='icon-list'></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <ListGroup className='list-group-accent' tag={'div'}>
              <ListGroupItem className='list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small'>
                List of Systems
              </ListGroupItem>
              <ListGroupItem
                action
                tag='a'
                className='list-group-item-accent-warning list-group-item-divider'
              >
                {this.props.loading ? (
                  this.props.onLoading()
                ) : (
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggleDropdown}
                  >
                    <DropdownToggle caret>Systems</DropdownToggle>
                    <DropdownMenu>{this.constructSystems()}</DropdownMenu>
                  </Dropdown>
                )}
              </ListGroupItem>

              <ListGroupItem className='list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small'>
                Identification
              </ListGroupItem>
              <ListGroupItem
                action
                tag='a'
                className='list-group-item-accent-danger list-group-item-divider'
              >
                {this.props.loading
                  ? this.props.onLoading()
                  : this.constructMetaData(this.props.metaData.identification)}
              </ListGroupItem>
              <ListGroupItem className='list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small'>
                System Description
              </ListGroupItem>
              <ListGroupItem
                action
                tag='a'
                className='list-group-item-accent-primary list-group-item-divider'
              >
                {this.props.loading
                  ? this.props.onLoading()
                  : this.constructMetaData(
                      this.props.metaData.systemDescription
                    )}
              </ListGroupItem>
            </ListGroup>
          </TabPane>
          <TabPane tabId='2'>
            <ListGroup className='list-group-accent' tag={'div'}>
              <ListGroupItem className='list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small'>
                Product Info
              </ListGroupItem>
              <ListGroupItem
                action
                tag='a'
                className='list-group-item-accent-success list-group-item-divider'
              >
                {this.props.loading
                  ? this.props.onLoading()
                  : this.constructMetaData(this.props.metaData.productInfo)}
              </ListGroupItem>
              <ListGroupItem className='list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small'>
                CAN Info
              </ListGroupItem>
              <ListGroupItem
                action
                tag='a'
                className='list-group-item-accent-info list-group-item-divider'
              >
                {this.props.loading
                  ? this.props.onLoading()
                  : this.constructMetaData(this.props.metaData.canInfo)}
              </ListGroupItem>
            </ListGroup>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
