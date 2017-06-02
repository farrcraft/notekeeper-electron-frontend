import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SplitPane from 'react-split-pane';
import NoteView from '../../views/NoteView';
import NotebookList from '../../views/NotebookList';
import NoteList from '../../views/NoteList';
import NotebookTitleModal from '../../modals/NotebookTitle';

@inject('account', 'notebook', 'note') @observer
class BasicWorkspace extends Component {
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
          <ToolbarGroup firstChild>
            <RaisedButton label="New Note" onTouchTap={() => this.handleNewNote()} />
            <RaisedButton label="New Notebook" onTouchTap={() => this.handleNewNotebook()} />
            <RaisedButton label="Lock Account" onTouchTap={() => this.handleLockAccount()} />
          </ToolbarGroup>
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

export default BasicWorkspace;
