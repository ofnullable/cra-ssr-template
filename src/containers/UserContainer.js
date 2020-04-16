import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../components/User';
import { loadUserRequest } from '../store/actions/users';

const UserContainer = ({ id }) => {
  const { data, loading } = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    if (Object.keys(data).length && data.id === Number(id)) return;
    dispatch(loadUserRequest(id));
  }, [id, data, loading]);

  if (loading) return <p>Loading...</p>;

  return <User user={data} />;
};

UserContainer.loadData = ctx => ctx.store.dispatch(loadUserRequest(ctx.params.id));

export default UserContainer;