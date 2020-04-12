import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Users from '../components/Users';
import { PreLoader } from '../lib/PreloadContext';
import { loadUsers } from '../store/users';

const UsersContainer = ({ users, loadUsers }) => {
  useEffect(() => {
    if (users) return;
    loadUsers();
  }, [users, loadUsers]);

  return (
    <>
      <Users users={users}/>
      <PreLoader resolve={loadUsers}/>
    </>
  );
};

export default connect(
  state => ({ users: state.users.users.data }),
  { loadUsers },
)(UsersContainer);