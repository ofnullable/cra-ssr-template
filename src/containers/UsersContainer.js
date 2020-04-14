import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Users from '../components/Users';
import { usePreloader } from '../lib/PreloadContext';
import { loadUsersRequest } from '../store/users';

const UsersContainer = () => {
  const { data, loading } = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  usePreloader(() => dispatch(loadUsersRequest()));

  useEffect(() => {
    if (loading || data.length) return;
    dispatch(loadUsersRequest());
  }, [data, data.length]);

  if (loading) return <p>Loading...</p>;

  return <Users users={data}/>;
};

export default UsersContainer;