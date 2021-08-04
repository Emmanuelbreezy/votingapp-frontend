import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Logout from './Logout';

const NavigationBar = ({ profileUser, user }) => {
  return (
    <Menu fixed='top' style={{ marginBottom: '3.5em', background: '#4c72bf' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          color: 'white',
        }}
      >
        <Query query={IS_LOGGED_IN_QUERY}>
          {({ data }) => {
            var islogg = data.isLoggedIn ? (
              <Logout user={user} />
            ) : (
              <Menu.Item
                as={Link}
                to='/login'
                name='Login'
                style={{ float: 'right', color: 'white' }}
              />
            );
            var userD = profileUser ? (
              <Menu.Item
                name={profileUser.firstname}
                style={{ color: 'white' }}
              />
            ) : null;
            return (
              <>
                <Menu.Item
                  name='Voting System'
                  style={{ fontWeight: 'bold', color: 'white' }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  {userD}
                  {islogg}
                </div>
              </>
            );
          }}
        </Query>
      </div>
    </Menu>
  );
};

const IS_LOGGED_IN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;
export default NavigationBar;
