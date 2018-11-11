import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        status = true;
      } else {
        this.formError[key] = '';
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
    return (
      <div>
        <h1>Create Account </h1>
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
        <Button label="Create Account" primary onTouchTap={this.handleSubmit} />
      </div>
    );
  }
}

export default Create;
