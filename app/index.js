import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import accountStore from './stores/Account';
import AccountTransport from './transports/ipc/Account';

import './scss/general.scss';

const accountTransport = new AccountTransport();
accountStore.setTransport(accountTransport);

const stores = {
  account: accountStore
};

accountStore.getState().then((val) => {
  render(
    <AppContainer>
      <App stores={stores} />
    </AppContainer>,
    document.getElementById('root')
  );
  return val;
})
.catch((err) => {
  // [FIXME]
});

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp stores={stores} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
