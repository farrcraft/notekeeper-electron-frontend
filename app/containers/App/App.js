// @flow
import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import CreateAccount from '../../components/Account/Create';
import UnlockAccount from '../../components/Account/Unlock';
import SigninAccount from '../../components/Account/Signin';
import Workspace from '../../components/Workspace';

@observer
export default class App extends Component {

  componentWillMount() {
  }

  render() {
    const { stores } = this.props;
    let View = null;
    if (stores.account.exists === true) {
      if (stores.account.isSignedIn === true) {
        if (stores.account.isLocked === false) { // signed in and not locked
          View = Workspace;
        } else { // signed in but locked
          View = UnlockAccount;
        }
      } else { // not signed in
        View = SigninAccount;
      }
    } else { // no account exists yet
      View = CreateAccount;
    }

    return (
      <Provider {...stores}>
        <div>
          <h1>This is app</h1>
          <View />
        </div>
      </Provider>
    );
  }
}
