import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SplitPane from 'react-split-pane';
import Toolbar from '../../ui/Toolbar';
import ToolbarEntry from '../../ui/ToolbarEntry';
import NoteView from '../../views/NoteView';
import NotebookList from '../../views/NotebookList';
import NoteList from '../../views/NoteList';
import NotebookTitleModal from '../../modals/NotebookTitle';

@inject('account', 'notebook', 'note') @observer
class Workspace extends Component {
  handleLockAccount() {
    const { account } = this.props;
    account.lock();
  }

  handleNewNotebook() {
    // show notebook title modal

    // const { notebook } = this.props;
  }

  handleNewNote() {
    // const { note } = this.props;
  }

  render() {
    return (
      <div className="workspace">
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
        <h1>Workspace</h1>
        <SplitPane split="vertical">
          <NotebookList />
          <SplitPane split="horizontal">
            <NoteList />
            <NoteView />
          </SplitPane>
        </SplitPane>
        <NotebookTitleModal />
      </div>
    );
  }
}

export default Workspace;
