import React, { Component } from 'react';

class ToolbarEntry extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <button onClick={this.handleClick}>
          {this.props.children}
      </button>
    );
  }
}

export default ToolbarEntry;
