import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PreLoader } from '../lib/PreloadContext';
import User from '../components/User';
import { loadUserRequest } from '../store/users';

const UserContainer = ({ id }) => {
  const user = useSelector(state => state.users.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length && user.id === Number(id)) return;
    dispatch(loadUserRequest(id));
  }, [id]);

  if (!Object.keys(user).length) {
    return <PreLoader resolve={() => dispatch(loadUserRequest(id))}/>;
  }
  return <User user={user}/>;
};

export default UserContainer;