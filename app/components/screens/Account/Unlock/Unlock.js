import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

@inject('account') @observer
class Unlock extends Component {
  @observable form = {
    password: ''
  }

  @observable formError = {
    password: ''
  }

  handleChange = (key) => ({
    value: this.form[key],
    onChange: (e, v) => {
      this.form[key] = v;
    }
  })

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.checkFieldErrors(['password'])) {
      return;
    }
    this.handleUnlockAccount();
  }

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

  handleUnlockAccount() {
    // this is our account store
    const { account } = this.props;
    account.unlock(this.form.password);
  }

  handleSignoutAccount = (e) => {
    const { account } = this.props;
    account.signout();
  }

  render() {
    return (
      <div>
        <h1>Unlock</h1>
        <TextField
          id="password"
          type="password"
          hintText="Password"
          errorText={this.formError.password}
          {...this.handleChange('password')}
        />
        <br />
        <FlatButton onTouchTap={this.handleSignoutAccount} label="Signout" secondary />
        <RaisedButton label="Unlock Account" primary onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}

export default Unlock;
