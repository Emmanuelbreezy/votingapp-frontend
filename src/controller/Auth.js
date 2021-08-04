import React from 'react';
import Login from '../Voters/pages/Login/Login';
import Register from '../Voters/pages/Register/Register';
import { Switch, Route, withRouter } from 'react-router-dom';

const Auth = ({ isLoggedin, history }) => {
  const route_ = isLoggedin ? (
    history.push('/')
  ) : (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route path='/Register' component={Register} />
    </Switch>
  );
  return route_;
};

export default withRouter(Auth);
