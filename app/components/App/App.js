// @flow
import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CreateAccount from '../screens/Account/Create';
import UnlockAccount from '../screens/Account/Unlock';
import SigninAccount from '../screens/Account/Signin';
import Workspace from '../screens/BasicWorkspace';

const muiTheme = getMuiTheme({
});

injectTapEventPlugin();

@observer
export default class App extends Component {

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
    if (stores.account.viewOverride !== null) {
      switch (stores.account.viewOverride) {
        case 'CreateAccount':
          View = CreateAccount;
          break;
      }
    }

    return (
      <Provider {...stores}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="notekeeper-app">
            <View />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
