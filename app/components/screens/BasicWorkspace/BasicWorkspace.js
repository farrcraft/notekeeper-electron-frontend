import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import HttpsIcon from '@material-ui/icons/Https';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import SplitPane from 'react-split-pane';

import NoteView from '../../views/NoteView';
import NotebookList from '../../views/NotebookList';
import NoteList from '../../views/NoteList';
import NotebookTitleModal from '../../modals/NotebookTitle';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

@inject('account', 'notebook', 'note')
@observer
class BasicWorkspace extends Component {
  handleLockAccount = () => {
    const { account } = this.props;
    account.lock();
  };

  handleNewNote = () => {
    const { note } = this.props;
    note.create();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              label="New Note"
              onClick={this.handleNewNote}
            >
              <NoteAddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              label="Lock Account"
              onClick={this.handleLockAccount}
            >
              <HttpsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Typography
          className={classes.title}
          variant="h1"
          color="inherit"
          noWrap
        >
          Workspace
        </Typography>
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

BasicWorkspace.wrappedComponent.propTypes = {
  account: PropTypes.observableObject.isRequired,
  note: PropTypes.objectOrObservableObject.isRequired,
  classes: PropTypes.objectOrObservableObject.isRequired
};

export default withStyles(styles)(BasicWorkspace);
