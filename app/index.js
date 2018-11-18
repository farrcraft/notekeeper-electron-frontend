import * as React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import accountStore from './stores/Account';
import AccountTransport from './transports/ipc/Account';
import notebookStore from './stores/Notebook';
import NotebookTransport from './transports/ipc/Notebook';
import noteStore from './stores/Note';
import NoteTransport from './transports/ipc/Note';
import Logger from './shared/Logger';

// Security - Override & Disable eval
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function() {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

const { app } = require('electron').remote;

const userDataPath = app.getPath('userData');
Logger.configure(userDataPath);

const accountTransport = new AccountTransport();
accountStore.setTransport(accountTransport);
const notebookTransport = new NotebookTransport();
notebookStore.setTransport(notebookTransport);
const noteTransport = new NoteTransport();
noteStore.setTransport(noteTransport);

const stores = {
  account: accountStore,
  notebook: notebookStore,
  note: noteStore
};

accountStore
  .getState()
  .then(val => {
    render(
      <AppContainer>
        <App stores={stores} />
      </AppContainer>,
      document.getElementById('root')
    );

    Modal.setAppElement('#notekeeper-app');

    return val;
  })
  .catch(err => {
    Logger.debug(err);
  });

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App');
    render(
      <AppContainer>
        <NextApp stores={stores} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
