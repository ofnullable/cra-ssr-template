import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
document.getElementById('preload-state').remove();

const { store } = configureStore(preloadedState, {});

loadableReady(() =>
  hydrate(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  ),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

