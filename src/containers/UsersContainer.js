import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Users from '../components/Users';
import { PreLoader } from '../lib/PreloadContext';
import { loadUsersRequest } from '../store/users';

const UsersContainer = () => {
  const users = useSelector(state => state.users.users.data)
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length) return;
    dispatch(loadUsersRequest())
  }, []);

  if (!users.length) {
    return <PreLoader resolve={() => dispatch(loadUsersRequest())}/>
  }
  return <Users users={users}/>;
};

export default UsersContainer;