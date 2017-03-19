// Import React and React DOM
import * as React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import accountStore from './stores/Account';
import { default as AccountTransport } from './transports/Account';
// import './scss/general.scss';

// [FIXME] need to fetch account state from backend
const accountTransport = new AccountTransport();
accountStore.setTransport(accountTransport);
accountStore.getState();

// Get the DOM Element that will host our React application.
const rootEl = document.getElementById('root');

render(
  <div>
    <App />
  </div>,
  rootEl
);
