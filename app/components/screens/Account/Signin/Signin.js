import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

@inject('account') @observer
class Signin extends Component {

  @observable form = {
    accountName: '',
    email: '',
    password: ''
  }

  @observable formError = {
    accountName: '',
    password: '',
    email: ''
  }

  handleChange = (key) => ({
    value: this.form[key],
    onChange: (e, v) => {
      this.form[key] = v;
    }
  })

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.checkFieldErrors(['email', 'password', 'accountName'])) {
      return;
    }
    this.handleSigninAccount();
  }

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
    keys.forEach((key) => {
      if (this.form[key] === '') {
        this.formError[key] = 'This field is required';
        status = true;
      } else {
        this.formError[key] = '';
      }
    });
    return status;
  }

  handleSigninAccount() {
    const { account } = this.props;
    account.signin(this.form.accountName, this.form.email, this.form.password);
  }

  handleCreateAccount = (e) => {
    // switch to the create account screen
    const { account } = this.props;
    account.overrideView('CreateAccount');
  }

  render() {
    return (
      <div>
        <h1>Signin</h1>
        <TextField
          id="accountName"
          hintText="Account Name"
          errorText={this.formError.accountName}
          {...this.handleChange('accountName')}
        />
        <br />
        <TextField
          id="email"
          hintText="Email"
          errorText={this.formError.email}
          {...this.handleChange('email')}
        />
        <br />
        <TextField
          id="password"
          type="password"
          hintText="Password"
          errorText={this.formError.password}
          {...this.handleChange('password')}
        />
        <br />
        <FlatButton onTouchTap={this.handleCreateAccount} label="Create an Account" secondary />
        <RaisedButton label="Signin Account" primary onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}

export default Signin;
