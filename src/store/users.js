import axios from 'axios';

const LOAD_USERS_REQUEST = 'users/LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'users/LOAD_USERS_SUCCESS';
const LOAD_USERS_FAILURE = 'users/LOAD_USERS_FAILURE';

const loadUsersRequest = () => ({ type: LOAD_USERS_REQUEST });
const loadUsersSuccess = (data) => ({ type: LOAD_USERS_SUCCESS, data });
const loadUsersFailure = (error) => ({ type: LOAD_USERS_FAILURE, error });

export const loadUsers = () => async (dispatch) => {
  dispatch(loadUsersRequest());
  try {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(loadUsersSuccess(users.data));
  } catch (e) {
    dispatch(loadUsersFailure(e));
  }
};

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
    default:
      return state;
  }
}