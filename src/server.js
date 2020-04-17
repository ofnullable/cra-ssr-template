import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { resolve } from 'path';
import { Provider } from 'react-redux';
import { END } from 'redux-saga';
import configureStore from './store';

import App from './App';
import PreloadContext from './lib/PreloadContext';

const app = express();
const statsFile = resolve('./build/loadable-stats.json');

const createHtml = (root, tags) => `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="utf-8"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="theme-color" content="#000000"/>
      <meta name="description" content="Web site created using create-react-app"/>
      <link rel="apple-touch-icon" href="/logo192.png"/>
      ${tags.styles}
      ${tags.links}
      <title>React SSR Template</title>
  </head>
  <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${root}</div>
      ${tags.scripts}
  </body>
  </html>
`;

app.use(express.static(resolve('./build'), {
  index: false,
}));

app.use(async (req, res, next) => {
  const context = {};
  const { store, sagaPromises } = configureStore({}, { isServer: true });

  const extractor = new ChunkExtractor({ statsFile });

  const preloadContext = {
    done: false,
    promises: [],
  };

  const jsx = (
    <React.StrictMode>
      <ChunkExtractorManager extractor={extractor}>
        <PreloadContext.Provider value={preloadContext}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </Provider>
        </PreloadContext.Provider>
      </ChunkExtractorManager>
    </React.StrictMode>
  );

  renderToStaticMarkup(jsx);
  store.dispatch(END);

  try {
    await sagaPromises;
    await Promise.all(preloadContext.promises);
  } catch (e) {
    return res.status(500);
  }

  preloadContext.done = true;
  res.set('content-type', 'text/html');
  const root = renderToString(jsx);

  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const preloadState = `<script id="preload-state">__PRELOADED_STATE__ = ${stateString}</script>`;

  const tags = {
    styles: extractor.getStyleTags(),
    links: extractor.getLinkTags(),
    scripts: preloadState + extractor.getScriptTags(),
  };

  res.send(createHtml(root, tags));
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`React + Express server running on port ${port}`);
});