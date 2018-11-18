import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import SplitPane from 'react-split-pane';
import Toolbar from '../../ui/Toolbar';
import ToolbarEntry from '../../ui/ToolbarEntry';
import NoteView from '../../views/NoteView';
import NotebookList from '../../views/NotebookList';
import NoteList from '../../views/NoteList';
import NotebookTitleModal from '../../modals/NotebookTitle';

@inject('account', 'notebook', 'note')
@observer
class Workspace extends Component {
  handleLockAccount() {
    const { account } = this.props;
    account.lock();
  }

  // WIP - can't use this rule quite yet
  /* eslint-disable class-methods-use-this */
  handleNewNotebook() {
    // show notebook title modal
    // const { notebook } = this.props;
  }

  handleNewNote() {
    // const { note } = this.props;
  }
  /* eslint-enable class-methods-use-this */

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

Workspace.propTypes = {
  account: PropTypes.observableObject.isRequired
};

export default Workspace;
