import 'whatwg-fetch';
import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import App from './components/App';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

if ('serviceWorker' in navigator) {
  runtime.register().catch(console.error);
}
