import * as AT from '../actions/actionTypes'

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
    case AT.LOAD_USERS_REQUEST:
      return {
        ...state,
        users: {
          data: [],
          loading: true,
          error: null,
        },
      };
    case AT.LOAD_USERS_SUCCESS:
      console.log(action);
      return {
        ...state,
        users: {
          ...state.users,
          data: action.data,
          loading: false,
        },
      };
    case AT.LOAD_USERS_FAILURE:
      return {
        ...state,
        users: {
          ...state.users,
          error: action.error,
          loading: false,
        },
      };
    case AT.LOAD_USER_REQUEST:
      return {
        ...state,
        user: {
          data: {},
          loading: true,
          error: null,
        },
      };
    case AT.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          data: action.data,
          loading: false,
        },
      };
    case AT.LOAD_USER_FAILURE:
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