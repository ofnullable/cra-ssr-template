import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePreloader } from '../lib/PreloadContext';
import User from '../components/User';
import { loadUserRequest } from '../store/users';

const UserContainer = ({ id }) => {
  const { data, loading } = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  usePreloader(() => dispatch(loadUserRequest(id)));

  useEffect(() => {
    if (loading) return;
    if (Object.keys(data).length && data.id === Number(id)) return;
    dispatch(loadUserRequest(id));
  }, [id, data]);

  if (loading) return <p>Loading...</p>;

  return <User user={data}/>;
};

export default UserContainer;