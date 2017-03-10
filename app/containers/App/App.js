// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  componentWillMount() {
    // [FIXME] - 
    // do we set properties here? (need to set this.props.children)
    // need logic to determine whether we're showing the:
    //  account login screen
    //  unlock screen
    //  create account screen
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
