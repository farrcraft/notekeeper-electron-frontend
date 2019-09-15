import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class NoteList extends Component {
  render(): JSX.Element {
    return (
      <div>
        <Typography variant="h1" color="inherit" noWrap>
          NoteList
        </Typography>
      </div>
    );
  }
}

export default NoteList;
