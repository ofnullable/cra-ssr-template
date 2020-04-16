import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Menu from './components/Menu';

const RedPage = loadable(() => import('./pages/RedPage'));
const BluePage = loadable(() => import('./pages/BluePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Route path='/blue' component={BluePage} />
      <Route path='/red' component={RedPage} />
      <Route path='/users' component={UsersPage} />
    </div>
  );
};

export default App;