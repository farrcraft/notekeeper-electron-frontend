// Import React and React DOM
import * as React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import rootRoute from './routes';
// import './scss/general.scss';

// Get the DOM Element that will host our React application.
const rootEl = document.getElementById('root');
const history = hashHistory; // syncHistoryWithStore(hashHistory, store);

render(
  <div>
    <Router history={history} routes={rootRoute} />
  </div>,
  rootEl
);
