import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { loadUserRequest } from '../store/actions/users';
import { usePreloader } from '../lib/PreloadContext';

const UserContainer = ({ id }) => {
  const { data: user, loading } = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const userIsEmpty = !Object.keys(user).length;

  usePreloader(() => dispatch(loadUserRequest(id)));

  useEffect(() => {
    if (loading || (!userIsEmpty && user.id === Number(id))) return;
    dispatch(loadUserRequest(id));
  }, [id, user, loading]);

  if (loading) return <p>Loading...</p>;

  if (userIsEmpty) return null;
  return <User user={user} />;
};

export default UserContainer;