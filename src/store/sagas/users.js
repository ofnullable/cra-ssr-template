import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

import { loadUsersApi, loadUserApi } from '../../api/users';
import { LOAD_USERS_REQUEST, LOAD_USER_REQUEST } from '../actions/actionTypes';
import { loadUserFailure, loadUsersFailure, loadUsersSuccess, loadUserSuccess } from '../actions/users';

function* loadUsers() {
  try {
    const { data } = yield call(loadUsersApi);
    yield put(loadUsersSuccess(data));
  } catch (e) {
    yield put(loadUsersFailure(e));
  }
}

function* watchLoadUsers() {
  yield takeLatest(LOAD_USERS_REQUEST, loadUsers);
}

function* loadUser({ id }) {
  try {
    const { data } = yield call(loadUserApi, id);
    yield put(loadUserSuccess(data));
  } catch (e) {
    yield put(loadUserFailure(e));
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* () {
  yield all([fork(watchLoadUsers), fork(watchLoadUser)]);
}