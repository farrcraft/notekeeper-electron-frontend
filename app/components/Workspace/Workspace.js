import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Toolbar from '../Toolbar';
import NoteView from '../NoteView';
import NotebookList from '../NotebookList';
import NoteList from '../NoteList';

class Workspace extends Component {
  render() {
    return (
      <div>
        <Toolbar />
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
