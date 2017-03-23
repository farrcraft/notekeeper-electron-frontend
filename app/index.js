import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import accountStore from './stores/Account';
import { default as AccountTransport } from './transports/ipc/Account';
// import './scss/general.scss';

const accountTransport = new AccountTransport();
accountStore.setTransport(accountTransport);
accountStore.getState();
// [FIXME] - pass store to app container

render(
  <AppContainer>
    <App />
  </AppContainer>,
   document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
