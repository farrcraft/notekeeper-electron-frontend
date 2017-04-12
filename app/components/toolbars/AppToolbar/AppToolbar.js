import React, { Component } from 'react';
import Toolbar from '../../ui/Toolbar';
import ToolbarEntry from '../../ui/ToolbarEntry';

class AppToolbar extends Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarEntry onClick={() => this.handleLockAccount()}>
            Lock Account
          </ToolbarEntry>
          <ToolbarEntry onClick={() => this.handleNewNotebook()}>
            New Notebook
          </ToolbarEntry>
          <ToolbarEntry onClick={() => this.handleNewNote()}>
            New Note
          </ToolbarEntry>
        </Toolbar>
      </div>
    );
  }
}

export default AppToolbar;
