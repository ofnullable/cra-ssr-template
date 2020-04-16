import * as AT from './actionTypes'

export const loadUsersRequest = () => ({ type: AT.LOAD_USERS_REQUEST });
export const loadUsersSuccess = (data) => ({ type: AT.LOAD_USERS_SUCCESS, data });
export const loadUsersFailure = (error) => ({ type: AT.LOAD_USERS_FAILURE, error });

export const loadUserRequest = (id) => ({ type: AT.LOAD_USER_REQUEST, id });
export const loadUserSuccess = (data) => ({ type: AT.LOAD_USER_SUCCESS, data });
export const loadUserFailure = (error) => ({ type: AT.LOAD_USER_FAILURE, error });
