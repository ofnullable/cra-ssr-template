import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import users, { usersSaga } from './users';

export function* rootSaga() {
  yield all([fork(usersSaga)]);
}

export default combineReducers({ users });