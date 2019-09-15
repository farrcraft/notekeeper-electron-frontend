import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import classNames from 'classnames';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HttpsIcon from '@material-ui/icons/Https';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import FolderIcon from '@material-ui/icons/Folder';
import MenuIcon from '@material-ui/icons/Menu';
/*
import NoteView from '../../views/NoteView';
import NotebookList from '../../views/NotebookList';
import NoteList from '../../views/NoteList';
import NotebookTitleModal from '../../modals/NotebookTitle';
*/
let drawerWidth = 240;
const drawerAlign = 'left';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
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
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  dragger: {
    width: '5px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    borderTop: '1px solid #ddd',
    position: 'absolute',
    top: 0,
    left: `calc(100% - 5px)`,
    bottom: 0,
    zIndex: '100',
    backgroundColor: '#f4f7f9'
  }
});

@inject('account', 'notebook', 'note')
@observer
class BasicWorkspace extends Component {

  constructor(props) {
    super(props);
    // this.handleMouseMove.bind(this);
    const { shelf: shelfStore, account: accountStore } = props;
    console.log(accountStore.account.accountId);
    console.log(accountStore.user.userId);
  }

  state = {
    open: false,
    isResizing: false,
    // lastDownX: 0,
    newWidth: {}
  };

  componentDidMount(): void {
    document.addEventListener('mousemove', e => this.handleMouseMove(e));
    document.addEventListener('mouseup', e => this.handleMouseUp(e));
  }

  handleDrawerOpen = (): void => {
    this.setState({ open: true });
  };

  handleDrawerClose = (): void => {
    this.setState({ open: false });
  };

  handleLockAccount = (): void => {
    const { account } = this.props;
    account.lock();
  };

  handleNewNote = (): void => {
    const { note } = this.props;
    note.create();
  };

  handleMouseMove = (e): void => {
    const { isResizing } = this.state;

    if (!isResizing) {
      return;
    }

    const minWidth = 50;
    const maxWidth = 600;
    // if our drawer is anchored on the right side
    if (drawerAlign === 'right') {
      const offsetRight = document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        this.setState({ newWidth: { width: offsetRight } });
      }
    } else {
      // if our drawer is anchored on the left side
      this.setState({ newWidth: { width: e.clientX } });
    }
    drawerWidth = e.clientX;
  };

  handleMouseUp = (/* e */): void => {
    this.setState({
      isResizing: false
    });
  };

  handleDrawerDraggerMouseDown = (/* e */): void => {
    this.setState({
      isResizing: true
      // lastDownX: e.clientX,
    });
  };

  render(): JSX.Element {
    const { classes } = this.props;
    const { open, newWidth } = this.state;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          style={
            open
              ? {
                width: `calc(100% - ${drawerWidth}px)`
              }
              : {}
          }
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
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
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          PaperProps={{ style: newWidth }}
          style={{ width: drawerWidth, flexShrink: 0 }}
        >
          <div
            id="dragger"
            onMouseDown={this.handleDrawerDraggerMouseDown}
            className={classes.dragger}
            role="presentation"
          />
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Account Shelf', 'Starred Account Shelf'].map((
              text /* , index */
            ) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['User Shelf', 'Another User Shelf'].map((text /* , index */) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography
            className={classes.title}
            variant="h1"
            color="inherit"
            noWrap
          >
            Workspace
          </Typography>
          <Typography paragraph>Active Note Content</Typography>
        </main>
      </div>
    );
  }
}

BasicWorkspace.wrappedComponent.propTypes = {
  account: PropTypes.observableObject.isRequired,
  note: PropTypes.objectOrObservableObject.isRequired,
  classes: PropTypes.objectOrObservableObject.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicWorkspace);
