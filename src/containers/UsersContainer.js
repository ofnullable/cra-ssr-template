import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from '../components/Users';
import { loadUsersRequest } from '../store/actions/users';
import { usePreloader } from '../lib/PreloadContext';

const UsersContainer = () => {
  const { data: users, loading } = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  usePreloader(() => dispatch(loadUsersRequest()));

  useEffect(() => {
    if (loading || users.length) return;
    dispatch(loadUsersRequest());
  }, [loading, users, users.length]);

  if (loading) return <p>Loading...</p>;

  return <Users users={users} />;
};

export default UsersContainer;