import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToolbarEntry extends Component {
  handleClick = e => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { children } = this.props;
    return (
      <button onClick={this.handleClick} type="submit">
        {children}
      </button>
    );
  }
}

ToolbarEntry.propTypes = {
  children: PropTypes.isRequired,
  onClick: PropTypes.isRequired
};

export default ToolbarEntry;
