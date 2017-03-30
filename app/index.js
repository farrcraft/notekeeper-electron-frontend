import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import accountStore from './stores/Account';
import AccountTransport from './transports/ipc/Account';

// import './scss/general.scss';

const accountTransport = new AccountTransport();
accountStore.setTransport(accountTransport);

const stores = {
  account: accountStore
};

console.log('getting state');
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
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp stores={stores} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
