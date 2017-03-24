import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('account') @observer
class Unlock extends Component {
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
    this.handleUnlockAccount();
  }

  handleUnlockAccount() {
    // this is our account store
    const { account } = this.props;
    account.unlock(this.form.password);
  }

  render() {
    return (
      <div>
        <h1>Unlock</h1>
        <form className="unlock-account-form" onSubmit={this.handleSubmit}>
          <label>
            Password
            <input type="password" {...this.handleChange('password')} required="required"/>
          </label>

          <button>Unlock Account</button>
        </form>
      </div>
    );
  }
}

export default Unlock;
