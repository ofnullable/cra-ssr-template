import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

export default function configureStore(preloadState, { isServer }) {
  const devtool = !isServer && window.__REDUX_DEVTOOLS_EXTENSION__;

  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    devtool ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );

  const store = createStore(reducers, preloadState, enhancer);

  let sagaPromises;
  if (isServer) {
    sagaPromises = sagaMiddleware.run(sagas).toPromise();
  } else {
    sagaMiddleware.run(sagas);
  }

  return { store, sagaPromises };
}