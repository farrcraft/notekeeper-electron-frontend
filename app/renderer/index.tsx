import * as React from 'react';
import { render } from 'react-dom';

// Security - Override & Disable eval
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function() {
  throw new Error('Sorry, this app does not support window.eval().');
};

render(
  <App />,
  document.getElementById('root')
);
