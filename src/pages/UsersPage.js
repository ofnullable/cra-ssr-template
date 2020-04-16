import React from 'react';
import { Route } from 'react-router-dom';
import UsersContainer from '../containers/UsersContainer';
import UserContainer from '../containers/UserContainer';
import { loadUsersRequest } from '../store/actions/users';

const UsersPage = () => {
  return (
    <>
      <UsersContainer />
      <Route path='/users/:id' render={({ match }) => <UserContainer id={match.params.id} />} />
    </>
  );
};

UsersPage.loadData = ctx => ctx.store.dispatch(loadUsersRequest());

export default UsersPage;