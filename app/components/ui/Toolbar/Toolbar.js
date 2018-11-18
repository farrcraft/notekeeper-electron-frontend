import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Toolbar extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>Toolbar</h1>
        <div>{children}</div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  children: PropTypes.isRequired
};

export default Toolbar;
