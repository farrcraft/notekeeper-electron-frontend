import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject, PropTypes } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LockIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  section: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

@inject('account')
@observer
class Unlock extends Component {
  @observable form = {
    password: ''
  };

  @observable formError = {
    password: ''
  };

  @observable formErrorState = {
    password: false
  };

  handleChange = key => event => {
    this.form[key] = event.target.value;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.checkFieldErrors(['password'])) {
      return;
    }
    this.handleUnlockAccount();
  };

  checkFieldErrors(keys) {
    let status = false;
    keys.forEach(key => {
      if (this.form[key] === '') {
        this.formError[key] = 'This field is required';
        this.formErrorState[key] = true;
        status = true;
      } else {
        this.formError[key] = '';
        this.formErrorState[key] = false;
      }
    });
    return status;
  }

  handleUnlockAccount() {
    // this is our account store
    const { account } = this.props;
    account.unlock(this.form.password);
  }

  handleSignoutAccount = () => {
    const { account } = this.props;
    account.signout();
  };

  render() {
    const { classes } = this.props;
    return (
      <section className={classes.section}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Unlock
          </Typography>
          <form className={classes.form}>
            <TextField
              id="password"
              type="password"
              label="Password"
              margin="normal"
              required
              fullWidth
              value={this.form.password}
              helperText={this.formError.password}
              error={this.formErrorState.password}
              onChange={this.handleChange('password')}
            />
            <Button
              onClick={this.handleSubmit}
              type="submit"
              label="Unlock Account"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Unlock Account
            </Button>
            <br />
            <Button
              onClick={this.handleSignoutAccount}
              type="submit"
              label="Sign Out of Account"
              size="small"
              color="secondary"
              fullWidth
              className={classes.submit}
            >
              Sign Out
            </Button>
          </form>
        </Paper>
      </section>
    );
  }
}

Unlock.wrappedComponent.propTypes = {
  account: PropTypes.observableObject.isRequired,
  classes: PropTypes.objectOrObservableObject.isRequired
};

export default withStyles(styles)(Unlock);
