import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SplitPane from 'react-split-pane';
import Toolbar from '../Toolbar';
import ToolbarEntry from '../ToolbarEntry';
import NoteView from '../NoteView';
import NotebookList from '../NotebookList';
import NoteList from '../NoteList';

@inject('account') @observer
class Workspace extends Component {
  handleLockAccount() {
    const { account } = this.props;
    account.lock();
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarEntry onClick={() => this.handleLockAccount()}>
            Lock Account
          </ToolbarEntry>
        </Toolbar>
        <h1>Workspace</h1>
        <SplitPane split="vertical">
          <NotebookList />
          <SplitPane split="horizontal">
            <NoteList />
            <NoteView />
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}

export default Workspace;
