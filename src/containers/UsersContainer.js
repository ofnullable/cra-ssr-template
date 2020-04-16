import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from '../components/Users';
import { loadUsersRequest } from '../store/actions/users';

const UsersContainer = () => {
  const { data, loading } = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading || data.length) return;
    dispatch(loadUsersRequest());
  }, [loading, data, data.length]);

  if (loading) return <p>Loading...</p>;

  return <Users users={data} />;
};

export default UsersContainer;