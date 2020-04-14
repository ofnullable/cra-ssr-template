import axios from 'axios';
import { all, fork, call, put, takeLatest } from 'redux-saga/effects';

const LOAD_USERS_REQUEST = 'users/LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'users/LOAD_USERS_SUCCESS';
const LOAD_USERS_FAILURE = 'users/LOAD_USERS_FAILURE';

const LOAD_USER_REQUEST = 'users/LOAD_USER_REQUEST';
const LOAD_USER_SUCCESS = 'users/LOAD_USER_SUCCESS';
const LOAD_USER_FAILURE = 'users/LOAD_USER_FAILURE';

export const loadUsersRequest = () => ({ type: LOAD_USERS_REQUEST });
const loadUsersSuccess = (data) => ({ type: LOAD_USERS_SUCCESS, data });
const loadUsersFailure = (error) => ({ type: LOAD_USERS_FAILURE, error });

export const loadUserRequest = (id) => ({ type: LOAD_USER_REQUEST, id });
const loadUserSuccess = (data) => ({ type: LOAD_USER_SUCCESS, data });
const loadUserFailure = (error) => ({ type: LOAD_USER_FAILURE, error });

const loadUsersApi = () => axios.get(`https://jsonplaceholder.typicode.com/users`);

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

const loadUserApi = (id) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

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

export function* usersSaga() {
  yield all([fork(watchLoadUsers), fork(watchLoadUser)]);
}

const initialState = {
  users: {
    data: [],
    loading: false,
    error: null,
  },
  user: {
    data: {},
    loading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_REQUEST:
      return {
        ...state,
        users: {
          data: [],
          loading: true,
          error: null,
        },
      };
    case LOAD_USERS_SUCCESS:
      console.log(action);
      return {
        ...state,
        users: {
          ...state.users,
          data: action.data,
          loading: false,
        },
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        users: {
          ...state.users,
          error: action.error,
          loading: false,
        },
      };
    case LOAD_USER_REQUEST:
      return {
        ...state,
        user: {
          data: {},
          loading: true,
          error: null,
        },
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          data: action.data,
          loading: false,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          error: action.error,
          loading: false,
        },
      };
    default:
      return state;
  }
}