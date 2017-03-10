// Import React and React DOM
import * as React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
// import './scss/general.scss';

// Get the DOM Element that will host our React application.
const rootEl = document.getElementById('root');

render(
  <div>
    <App />
  </div>,
  rootEl
);
