import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';

import 'semantic-ui-css/semantic.min.css';
import reportWebVitals from './reportWebVitals';
import ElectionList from './Voters/pages/Voting/Election-List';
import Voting from './Voters/pages/Voting/Voting-List';
import Login from './Voters/pages/Login/Login';
import Register from './Voters/pages/Register/Register';
import AuthLogin from './Admin/pages/AuthLogin/AuthLogin';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';

import AllElection from './Admin/pages/AllElections/AllElections';
import AllStaff from './Admin/pages/AllStaff/AllStaff';
import NotFound from './components/NotFound';

const client = new ApolloClient({
  uri: 'https://emmanuelbreezy.pythonanywhere.com/graphql/',
  credentials: 'same-origin',
  fetchOptions: {
    credentials: 'include',
  },

  request: (operation) => {
    const atoken = localStorage.getItem('authToken') || '';
    operation.setContext({
      headers: {
        Authorization: `JWT ${atoken}`,
      },
    });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem('authToken'),
    },
  },
});

const Root = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route exact path='/admin/'>
        {!isLoggedIn ? <Redirect to='/admin/login' /> : <AllElection />}
      </Route>
      <Route exact path='/'>
        {!isLoggedIn ? <Redirect to='/login' /> : <ElectionList />}
      </Route>
      <Route path='/login'>
        {!isLoggedIn ? <Login /> : <Redirect to='/' />}
      </Route>
      <Route path='/register' component={Register} />
      <Route path='/voting/:voteurl'>
        {!isLoggedIn ? <Redirect to='/login' /> : <Voting />}
      </Route>

      <Route exact path='/admin/staff'>
        {!isLoggedIn ? <Redirect to='/admin/login' /> : <AllStaff />}
      </Route>
      <Route path='/admin/login'>
        {!isLoggedIn ? <AuthLogin /> : <Redirect to='/admin' />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

const RootwithAuth = withRouter(Root);

const IS_LOGGED_IN_QUERY = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN_QUERY}>
          {({ data }) => {
            var islog = data.isLoggedIn;
            return <RootwithAuth isLoggedIn={islog} />;
          }}
        </Query>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
