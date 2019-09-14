import * as React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

import Root from './stores/Root';
import bindTransports from './transport_bindings/ipc';
import App from './components/App';
import Logger from './shared/Logger';

// Security - Override & Disable eval
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function() {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

const stores = new Root();
stores.createStores();
bindTransports(stores);

stores.account
  .getState()
  .then(val => {
    render(
      <App stores={stores} />,
      document.getElementById('root')
    );

    Modal.setAppElement('#notekeeper-app');

    return val;
  })
  .catch(err => {
    Logger.debug(err);
  });
