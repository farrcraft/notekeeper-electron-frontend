import React, { Component } from 'react';

class Toolbar extends Component {
  render() {
    return (
      <div>
        <h1>Toolbar</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Toolbar;
