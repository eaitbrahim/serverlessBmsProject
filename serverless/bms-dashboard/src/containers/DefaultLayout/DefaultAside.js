import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppSwitch } from "@coreui/react";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultAside extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <ListGroup className="list-group-accent" tag={"div"}>
          <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
            List of Systems
          </ListGroupItem>
          <ListGroupItem
            action
            tag="a"
            className="list-group-item-accent-warning list-group-item-divider"
          >
            <div>List of batteries to select</div>
          </ListGroupItem>

          <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
            Identification
          </ListGroupItem>
          <ListGroupItem
            action
            tag="a"
            className="list-group-item-accent-danger list-group-item-divider"
          >
            <div>
              ConfigVer: <small className="text-muted mr-3">1.2.0</small>
            </div>
            <div>
              BusinessUnit: <small className="text-muted mr-3">eAGV</small>
            </div>
            <div>
              EdgeHWRSN:
              <small className="text-muted mr-3">Ax_12598324</small>
            </div>
            <div>
              EdgeSWRVer: <small className="text-muted mr-3">Ax_2.5.3</small>
            </div>
            <div>
              BMSHWRSN: <small className="text-muted mr-3">EigerC63B124</small>
            </div>
            <div>
              BMSSWRVer: <small className="text-muted mr-3">EigerC63S456</small>
            </div>
            <div>
              CANMappingVer:{" "}
              <small className="text-muted mr-3">C63CANV100</small>
            </div>
          </ListGroupItem>
          <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
            System Description
          </ListGroupItem>
          <ListGroupItem
            action
            tag="a"
            href="#"
            className="list-group-item-accent-primary list-group-item-divider"
          >
            <div>
              Technology: <small className="text-muted mr-3">LTO</small>
            </div>
            <div>
              ModConfig: <small className="text-muted mr-3">6s4p</small>
            </div>
            <div>
              StrConfig: <small className="text-muted mr-3">6S6s4p</small>
            </div>
            <div>
              BatConfig: <small className="text-muted mr-3">1P6S6s4p</small>
            </div>
            <div>
              NomVoltage: <small className="text-muted mr-3">80V</small>
            </div>
            <div>
              NomCapacity: <small className="text-muted mr-3">120Ah</small>
            </div>
          </ListGroupItem>
          <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
            Product Info
          </ListGroupItem>
          <ListGroupItem
            action
            tag="a"
            href="#"
            className="list-group-item-accent-success list-group-item-divider"
          >
            <div>
              Cusotmer: <small className="text-muted mr-3">Generic_1</small>
            </div>
            <div>
              Location: <small className="text-muted mr-3">somewhere</small>
            </div>
            <div>
              FabricationDate:
              <small className="text-muted mr-3">01.01.2020</small>
            </div>
            <div>
              InstallationDate:
              <small className="text-muted mr-3">01.01.2020</small>
            </div>
            <div>
              ContactMail:
              <small className="text-muted mr-3">support@leclanche.com</small>
            </div>
            <div>
              ContactTel:
              <small className="text-muted mr-3">004121021021021</small>
            </div>
          </ListGroupItem>
          <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
            CAN Info
          </ListGroupItem>
          <ListGroupItem
            action
            tag="a"
            href="#"
            className="list-group-item-accent-info list-group-item-divider"
          >
            <div>
              CANChannel: <small className="text-muted mr-3">1</small>
            </div>
            <div>
              CANSpeed: <small className="text-muted mr-3">500</small>
            </div>
            <div>
              CANTimeout:
              <small className="text-muted mr-3">10</small>
            </div>
          </ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
