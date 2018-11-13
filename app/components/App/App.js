// @flow
import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import CssBaseline from '@material-ui/core/CssBaseline';

import CreateAccount from '../screens/Account/Create';
import UnlockAccount from '../screens/Account/Unlock';
import SigninAccount from '../screens/Account/Signin';
import Workspace from '../screens/BasicWorkspace';

export default
@observer
class App extends Component {
  componentWillMount() {
    // might need to put this in a screen base class instead
    // not sure account store is the right place for screen overrides either
    const { stores } = this.props;
    stores.account.viewOverride = null;
  }

  render() {
    const { stores } = this.props;
    let View = null;
    if (stores.account.exists === true) {
      if (stores.account.isSignedIn === true) {
        if (stores.account.isLocked === false) {
          // signed in and not locked
          View = Workspace;
        } else {
          // signed in but locked
          View = UnlockAccount;
        }
      } else {
        // not signed in
        View = SigninAccount;
      }
    } else {
      // no account exists yet
      View = CreateAccount;
    }
    if (stores.account.viewOverride !== null) {
      switch (stores.account.viewOverride) {
        case 'CreateAccount':
          View = CreateAccount;
          break;
        default:
          break;
      }
    }

    return (
      <Provider {...stores}>
        <main className="notekeeper-app">
          <CssBaseline />
          <View />
        </main>
      </Provider>
    );
  }
}
