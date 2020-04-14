import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { resolve } from 'path';
import fs from 'fs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer, { rootSaga } from './store';

import App from './App';
import PreloadContext from './lib/PreloadContext';

const app = express();

const manifest = JSON.parse(
  fs.readFileSync(resolve('./build/asset-manifest.json'), 'utf8'),
);

const chunks = Object.keys(manifest.files)
  .filter(name => /chunk\.js$/.exec(name))
  .map(name => `<script src="${manifest.files[name]}"></script>`)
  .join('');

const createHtml = (root, initialState) => `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="utf-8"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="theme-color" content="#000000"/>
      <meta name="description" content="Web site created using create-react-app"/>
      <link rel="apple-touch-icon" href="/logo192.png"/>
      <link rel="stylesheet" href="${manifest.files['main.css']}"/>
      <title>React App</title>
  </head>
  <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${root}</div>
      ${initialState}
      <script src="${manifest.files['runtime-main.js']}"></script>
      ${chunks}
      <script src="${manifest.files['main.js']}"></script>
  </body>
  </html>
`;

app.use(express.static(resolve('./build'), {
  index: false,
}));

app.use(async (req, res, next) => {
  const context = {};
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();

  const preloadContext = {
    done: false,
    promises: [],
  };

  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );

  renderToStaticMarkup(jsx);
  store.dispatch(END);

  try {
    await sagaPromise;
    await Promise.all(preloadContext.promises);
  } catch (e) {
    return res.status(500);
  }

  preloadContext.done = true;
  res.set('content-type', 'text/html');
  const root = renderToString(jsx);

  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const preloadState = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

  res.send(createHtml(root, preloadState));
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`React + Express server running on port ${port}`);
});