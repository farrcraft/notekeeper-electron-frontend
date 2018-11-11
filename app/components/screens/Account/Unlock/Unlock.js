import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

@inject('account')
@observer
class Unlock extends Component {
  @observable form = {
    password: ''
  };

  @observable formError = {
    password: ''
  };

  handleChange = key => ({
    value: this.form[key],
    onChange: (e, v) => {
      this.form[key] = v;
    }
  });

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

  handleSignoutAccount = () => {
    const { account } = this.props;
    account.signout();
  };

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
        <Button
          onTouchTap={this.handleSignoutAccount}
          label="Signout"
          secondary
        />
        <Button label="Unlock Account" primary onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}

export default Unlock;
