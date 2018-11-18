import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup } from '@material-ui/core/Toolbar';
import SplitPane from 'react-split-pane';
import NoteView from '../../views/NoteView';
import NotebookList from '../../views/NotebookList';
import NoteList from '../../views/NoteList';
import NotebookTitleModal from '../../modals/NotebookTitle';

@inject('account', 'notebook', 'note')
@observer
class BasicWorkspace extends Component {
  handleLockAccount() {
    const { account } = this.props;
    account.lock();
  }

  handleNewNote() {
    const { note } = this.props;
    note.create();
  }

  render() {
    return (
      <div className="workspace">
        <Toolbar>
          <ToolbarGroup firstChild>
            <Button label="New Note" onClick={() => this.handleNewNote()} />
            <Button
              label="Lock Account"
              onClick={() => this.handleLockAccount()}
            />
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

BasicWorkspace.propTypes = {
  account: PropTypes.observableObject.isRequired,
  note: PropTypes.observableObject.isRequired
};

export default BasicWorkspace;
