import React from 'react';
import Election from '../Voters/pages/Voting/Election';
import Voting from '../Voters/pages/Voting/Voting-List';
import { Switch, Route, withRouter } from 'react-router-dom';

const App = ({ isLoggedin, history }) => {
  const route_ = !isLoggedin ? (
    history.push('/login')
  ) : (
    <Switch>
      <Route exact path='/' component={Election} />
      <Route path='/voting/:voteurl' component={Voting} />
    </Switch>
  );
  return route_;
};

export default withRouter(App);
