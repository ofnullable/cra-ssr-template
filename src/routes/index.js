import React from 'react';
import { Switch, Route, Router, matchPath } from 'react-router-dom';

import RedPage from '../pages/RedPage';
import BluePage from '../pages/BluePage';
import UsersPage from '../pages/UsersPage';
import UserContainer from '../containers/UserContainer';

export const routes = [{
  path: '/red',
  component: RedPage,
}, {
  path: '/blue',
  component: BluePage,
}, {
  path: '/users',
  component: UsersPage,
  routes: [{
    path: '/users/:id',
    component: UserContainer,
  }],
}];

export const matchRoutes = (routes, path, branch = []) => {
  routes.some(route => {
    const match = route.path
      ? matchPath(path, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : Router.computeRootMatch(path); // use default "root" match

    if (match) {
      branch.push({ route, match });

      if (route.routes) {
        matchRoutes(route.routes, path, branch);
      }
    }

    return match;
  });
  return branch;
};

export default () => (
  <Switch>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        render={(props) =>
          route.render ? (
            route.render({ ...props, route })
          ) : (
            <route.component {...props} route={route} />
          )
        }
      />
    ))}
  </Switch>
)