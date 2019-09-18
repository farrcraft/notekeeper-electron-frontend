import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, observer } from 'mobx-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {
  CreateAccount,
  UnlockAccount,
  SigninAccount
} from '../screens/Account';
import Workspace from '../screens/BasicWorkspace';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

@observer
class App extends Component {

  constructor(props) {
    super(props);
    const { stores } = props;
    stores.account.viewOverride = null;
  }

  /*
  componentDidMount(): void {
    // might need to put this in a screen base class instead
    // not sure account store is the right place for screen overrides either
    const { stores } = this.props;
    stores.account.viewOverride = null;
  }
  */

  render(): JSX.Element {
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
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <View />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

App.propTypes = {
  stores: PropTypes.object.isRequired
};

export default App;
