import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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
class Create extends Component {
  @observable form = {
    accountName: '',
    email: '',
    password: ''
  };

  @observable formError = {
    accountName: '',
    password: '',
    email: ''
  };

  @observable formErrorState = {
    accountName: false,
    password: false,
    email: false
  };

  handleChange = key => ({
    value: this.form[key],
    onChange: (e, v) => {
      this.form[key] = v;
    }
  });

  handleSubmit = e => {
    e.preventDefault();
    if (this.checkFieldErrors(['email', 'password', 'accountName'])) {
      return;
    }
    this.handleCreateAccount();
  };

  /**
   *
   *
   * @param {any} key
   * @returns boolean true if any field has an error.
   *
   * @memberof Signin
   */
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

  handleCreateAccount() {
    // this is our account store
    const { account } = this.props;
    account.create(this.form.accountName, this.form.email, this.form.password);
  }

  render() {
    const { classes } = this.props;
    return (
      <section className={classes.section}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <form className={classes.form}>
            <TextField
              id="accountName"
              label="Account Name"
              helperText={this.formError.accountName}
              error={this.formErrorState.accountName}
              {...this.handleChange('accountName')}
            />
            <TextField
              id="email"
              label="Email"
              helperText={this.formError.email}
              error={this.formErrorState.email}
              {...this.handleChange('email')}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              helperText={this.formError.password}
              error={this.formErrorState.password}
              {...this.handleChange('password')}
            />
            <Button label="Create Account" primary onClick={this.handleSubmit}>
              Create Account
            </Button>
          </form>
        </Paper>
      </section>
    );
  }
}

export default withStyles(styles)(Create);
