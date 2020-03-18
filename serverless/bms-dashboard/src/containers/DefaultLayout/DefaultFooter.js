import React, { Component } from 'react';

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span>
          <a href='https://www.leclanche.com'>Leclanche</a> &copy; 2020.
        </span>
        <span className='ml-auto'>
          Build by <a href='#'>Code Gate</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
