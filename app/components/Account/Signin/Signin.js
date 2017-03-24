import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('account') @observer
class Signin extends Component {

  @observable form = {
    accountName: '',
    email: '',
    password: ''
  }

  handleChange = (key) => ({
    value: this.form[key],
    onChange: e => { 
      this.form[key] = e.target.value;
    }
  })

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleSigninAccount();
  }

  handleSigninAccount() {
    const { account } = this.props;
    account.signin(this.form.accountName, this.form.email, this.form.password);
  }

  render() {
    return (
      <div>
        <h1>Signin</h1>
        <form className="signin-account-form" onSubmit={this.handleSubmit}>
          <label>
            Account Name
            <input type="text" {...this.handleChange('accountName')} required="required"/>
          </label>

          <label>
            Email Address
            <input type="email" {...this.handleChange('email')} required="required"/>
          </label>

          <label>
            Password
            <input type="password" {...this.handleChange('password')} required="required"/>
          </label>

          <button>Signin Account</button>
        </form>
      </div>
    );
  }
}

export default Signin;
