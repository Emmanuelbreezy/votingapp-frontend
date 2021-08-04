import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Election from './Voters/pages/Voting/Election';
import Voting from './Voters/pages/Voting/Voting';
import Login from './Voters/pages/Login/Login';
import Register from './Voters/pages/Register/Register';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';

const Root = () => {
  return <div></div>;
};
