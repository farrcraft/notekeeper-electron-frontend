import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class NoteView extends Component {
  render(): JSX.Element {
    return (
      <div>
        <Typography variant="h1" color="inherit" noWrap>
          NoteView
        </Typography>
      </div>
    );
  }
}

export default NoteView;
